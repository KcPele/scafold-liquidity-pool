import React, { useCallback, useEffect, useState } from "react";
import ERC20ABI from "./abi.json";
import {
  CONNECTION_CONTRACT,
  FACTORY_ABI,
  FACTORY_ADDRESS,
  ICOSCAFFOLD_ADDRESS,
  LIQUIDITY_ADDRESS,
  SCAFFOLD_ADDRESS,
  internalContract,
  positionManagerAddress,
} from "./constants";
import { Token } from "@uniswap/sdk-core";
// import UniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { abi as INonfungiblePositionManagerABI } from "@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json";
import { Pool, Position, nearestUsableTick } from "@uniswap/v3-sdk";
import { fetchBalance } from "@wagmi/core";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useAccount, useNetwork } from "wagmi";
import deployedContracts from "~~/contracts/deployedContracts";
import { IContext, ICurrentHolder, INativeToken, IPoolHistory, IToken, ITokensale } from "~~/types/utils";
import { parseErrorMsg } from "~~/utils/liquidity";

export const CONTEXT = React.createContext<IContext | null>(null);
export const CONTEXT_Provider = ({ children }: { children: React.ReactNode }) => {
  const gasFee = BigInt("1000000");
  const { chain } = useNetwork();
  const { address } = useAccount();
  const DAPP_NAME = "Liquidity Dapp";
  const [loader, setLoader] = useState(false);

  const [balance, setBalance] = useState("");
  const [nativeToken, setNativeToken] = useState<INativeToken | null>(null);
  const [tokenHolders, setTokenHolders] = useState<string[]>([]);
  const [tokenSale, setTokenSale] = useState<ITokensale | null>(null);

  const [currentHolder, setCurrentHolder] = useState<ICurrentHolder | null>(null);

  //contracts
  const liquidityContract = useCallback(async () => {
    return await internalContract(deployedContracts["31337"].Liquidity.abi, LIQUIDITY_ADDRESS);
  }, []);
  const scaffoldContract = useCallback(async () => {
    return await internalContract(deployedContracts["31337"].Scaffold.abi, SCAFFOLD_ADDRESS);
  }, []);
  const icoScaffoldContract = useCallback(async () => {
    return await internalContract(deployedContracts["31337"].ICOScaffold.abi, ICOSCAFFOLD_ADDRESS);
  }, []);
  //notification
  const notifyError = (msg: string) => toast.error(msg, { duration: 4000 });
  const notifySuccess = (msg: string) => toast.success(msg, { duration: 4000 });

  //load tokens
  const LOAD_TOKEN = async (tokenAddress: string) => {
    const tokenDetails = await CONNECTION_CONTRACT(tokenAddress);
    if (!tokenDetails) {
      return;
    }
    return {
      address: tokenDetails.address,
      name: tokenDetails.name,
      totalSupply: tokenDetails.totalSupply,
      symbol: tokenDetails.symbol,
      decimals: tokenDetails.decimals,
      balance: tokenDetails.balance,
      chainId: tokenDetails.chainId,
    };
  };

  //get pool address
  const GET_POOL_ADDRESS = async (token_1: IToken, token_2: IToken, fee: string) => {
    try {
      setLoader(true);
      const contract = await internalContract(FACTORY_ABI, FACTORY_ADDRESS);
      const fees = ethers.utils.parseUnits(fee, token_1.decimals).toString();
      const poolAddress = (await contract?.getPool(token_1.address, token_2.address, fees)) as string;
      const poolHistory = {
        token_A: token_1,
        token_B: token_2,
        network: token_1.chainId,
        poolAddress,
        fee,
      };
      const zeroAdd = "0x0000000000000000000000000000000000000000";

      if (poolAddress === zeroAdd) {
        setLoader(false);
        notifySuccess("Sorry there is no pool");
      } else {
        let poolArray = [];
        const poolLists = localStorage.getItem("poolHistory");

        if (poolLists) {
          poolArray = JSON.parse(poolLists);
          poolArray.push(poolHistory);
          localStorage.setItem("poolHistory", JSON.stringify(poolArray));
        } else {
          poolArray.push(poolHistory);
          localStorage.setItem("poolHistory", JSON.stringify(poolArray));
        }
        setLoader(false);
        notifySuccess("Successfully Completed");
      }
      return poolAddress;
    } catch (error: any) {
      console.log(error);
      const errorMsg = parseErrorMsg(error);

      setLoader(false);
      notifyError(errorMsg);
    }
  };

  //get pool data
  async function getPoolData(poolContract: ethers.Contract) {
    const [tickSpacing, fee, liquidity, slot0] = await Promise.all([
      poolContract.tickSpacing(),
      poolContract.fee(),
      poolContract.liquidity(),
      poolContract.slot0(),
    ]);
    return {
      tickSpacing,
      fee,
      liquidity,
      sqrtPriceX96: slot0[0],
      tick: slot0[1],
    };
  }

  //create liquidity
  const CREATE_LIQUIDITY = async (pool: IPoolHistory, liquidityAmount: string, approvedAmount: string) => {
    try {
      setLoader(true);
      const TOKEN_1 = new Token(
        Number(pool.token_A.chainId),
        pool.token_A.address,
        Number(pool.token_A.decimals),
        pool.token_A.symbol,
        pool.token_A.name,
      );
      const TOKEN_2 = new Token(
        Number(pool.token_B.chainId),
        pool.token_B.address,
        Number(pool.token_B.decimals),
        pool.token_B.symbol,
        pool.token_B.name,
      );
      const poolAddress = pool.poolAddress;

      const nonfundablePositionManagerContract = await internalContract(
        INonfungiblePositionManagerABI,
        positionManagerAddress,
      );

      const poolContract = await internalContract(IUniswapV3PoolABI, poolAddress);

      const poolData = await getPoolData(poolContract as ethers.Contract);

      const TOKEN_1_TOKEN_2_POOL = new Pool(
        TOKEN_1,
        TOKEN_2,
        poolData.fee,
        poolData.sqrtPriceX96.toString(),
        poolData.liquidity.toString(),
        poolData.tick,
      );

      const position = new Position({
        pool: TOKEN_1_TOKEN_2_POOL,
        liquidity: ethers.utils.parseUnits(liquidityAmount, pool.token_A.decimals).toString(),
        tickLower: nearestUsableTick(poolData.tick, poolData.tickSpacing) - poolData.tickSpacing * 2,
        tickUpper: nearestUsableTick(poolData.tick, poolData.tickSpacing) + poolData.tickSpacing * 2,
      });

      const approvalAmount = ethers.utils.parseUnits(approvedAmount, pool.token_A.decimals).toString();
      const tokenContract0 = await internalContract(ERC20ABI, pool.token_A.address);
      await tokenContract0?.approve(positionManagerAddress, approvalAmount, {
        gasLimit: gasFee,
      });
      const tokenContract1 = await internalContract(ERC20ABI, pool.token_B.address);
      await tokenContract1?.approve(positionManagerAddress, approvalAmount, {
        gasLimit: gasFee,
      });

      const { amount0: amount0Desired, amount1: amount1Desired } = position.mintAmounts;

      const params = {
        token0: pool.token_A.address,
        token1: pool.token_B.address,
        fee: poolData.fee,
        tickLower: position.tickLower,
        tickUpper: position.tickUpper,
        amount0Desired: amount0Desired.toString(),
        amount1Desired: amount1Desired.toString(),
        amount0Min: amount0Desired.toString(),
        amount1Min: amount1Desired.toString(),
        recipient: address,
        deadline: Math.floor(Date.now() / 1000) + 60 * 10,
      };
      console.log(params);
      const transactionHash = await nonfundablePositionManagerContract?.mint(params, {
        gasLimit: gasFee,
      });
      console.log(transactionHash);

      if (transactionHash) {
        const addLiquidityData = (await liquidityContract())?.addLiquidity([
          pool.token_A.name,
          pool.token_B.name,
          pool.token_A.address,
          pool.token_B.address,
          poolAddress,
          pool.token_A.chainId.toString(),
          transactionHash?.hash,
        ]);
        await addLiquidityData?.result;
        setLoader(false);
        notifySuccess("Liquidity add successfully");
        window.location.reload();
      }
    } catch (error: any) {
      console.log(error);
      setLoader(false);
      const errorMsg = parseErrorMsg(error);

      notifyError(errorMsg);
    }
  };

  //native token
  const fetchInitailData = useCallback(async () => {
    if (!address) {
      return;
    }
    try {
      const balance = await fetchBalance({
        address,
        chainId: chain?.id,
      });
      setBalance(balance.formatted);

      //scaffold token contract
      let tokenBalance;
      const scafContract = await scaffoldContract();
      if (address) {
        tokenBalance = scafContract?.balanceOf(address);
      } else {
        tokenBalance = 0;
      }
      const tokenAddress = scafContract?.address;
      const tokenName = scafContract?.name();
      const tokenSymbol = scafContract?.symbol();
      const tokenTotalSupply = scafContract?.totalSupply();
      const tokenStandard = scafContract?.standard();
      const tokenHolders = scafContract?._userId();
      const tokenOwnerOfContract = scafContract?.ownerOfContract();
      const nativeToken = {
        tokenName,
        tokenAddress,
        tokenSymbol,
        tokenHolders: tokenHolders?.toString(),
        tokenOwnerOfContract,
        tokenStandard,
        tokenBalance: ethers.utils.formatEther(tokenBalance?.toString() as string),
        tokenTotalSupply: ethers.utils.formatEther(tokenTotalSupply?.toString() as string),
      } as INativeToken;
      setNativeToken(nativeToken);

      //geting token holders
      const getTokenHolders = scafContract?.getTokenHolder() as string[];
      setTokenHolders(getTokenHolders);

      //getting token holder data
      if (address) {
        const getTokenHolderData = scafContract?.getTokenHolderData(address) as any;
        const currentHolder = {
          tokenId: getTokenHolderData?._tokenId,
          from: getTokenHolderData?._from,
          to: getTokenHolderData?._to,
          totalToken: ethers.utils.formatEther(getTokenHolderData?._totalToken.toString() as string),
          tokenHolders: getTokenHolderData?._tokenHolder,
        };
        setCurrentHolder(currentHolder);
      }

      //token sale contract
      const icoScafContract = await icoScaffoldContract();
      const tokenPrice = icoScafContract?.tokenPrice();
      const tokenSold = icoScafContract?.tokensSold();
      const tokenSaleBalance = scafContract?.balanceOf(icoScafContract?.address as string);
      const tokenSale = {
        tokenPrice: ethers.utils.formatEther((tokenPrice as bigint)?.toString()),
        tokenSold: (tokenSold as bigint)?.toString(),
        tokenSaleBalance: ethers.utils.formatEther((tokenSaleBalance as bigint)?.toString()),
      };
      setTokenSale(tokenSale);
      console.log(tokenSale);
      console.log(nativeToken);
    } catch (error: any) {
      const errorMsg = parseErrorMsg(error);

      setLoader(false);
      notifyError(errorMsg);
    }
  }, [address, chain?.id, scaffoldContract, icoScaffoldContract]);
  useEffect(() => {
    fetchInitailData();
  }, [fetchInitailData]);

  const buyToken = async (nToken: bigint) => {
    try {
      setLoader(true);
      const price = 0.0001 * Number(nToken);
      const amount = ethers.utils.parseEther(price.toString());

      const buying = (await icoScaffoldContract())?.buyTokens(amount, {
        gas: gasFee,
      });

      await buying?.result;
      window.location.reload();
    } catch (error: any) {
      const errorMsg = parseErrorMsg(error);
      setLoader(false);
      notifyError(errorMsg);
    }
  };

  //Native token transfer
  const transferNativeToken = async () => {
    try {
      const TOKEN_SALE_ADDRESS = (await icoScaffoldContract())?.address as string;
      const TOKEN_AMOUNT = 2000;
      const nTokens = TOKEN_AMOUNT.toString();
      const transferAmount = ethers.utils.parseEther(nTokens);
      const trascation = (await scaffoldContract())?.transfer(TOKEN_SALE_ADDRESS, transferAmount.toBigInt(), {
        gas: gasFee,
      });
      await trascation?.result;
      window.location.reload();
    } catch (error: any) {
      const errorMsg = parseErrorMsg(error);
      setLoader(false);
      notifyError(errorMsg);
    }
  };

  //liquidity history

  const GET_ALL_LIQUIDITY = async () => {
    try {
      if (!address) {
        throw new Error("Connect address");
      }

      const liquidityHistory = (await liquidityContract())?.getAllLiquidity(address) as [];
      const AllLiquidity = liquidityHistory?.map((liquidity: any) => {
        const liquidityArray = {
          id: liquidity.id.toString(),
          network: liquidity.network,
          owner: liquidity.owner,
          poolAddress: liquidity.poolAddress,
          tokenA: liquidity.tokenA,
          tokenB: liquidity.tokenB,
          tokenA_Address: liquidity.tokenA_Address,
          tokenB_Address: liquidity.tokenB_Address,
          timeCreated: liquidity.timeCreated.toString(),
          transactionHash: liquidity.transactionHash,
        };
        return liquidityArray;
      });
      console.log(AllLiquidity);
      return AllLiquidity;
    } catch (error: any) {
      console.log(error);
      const errorMsg = parseErrorMsg(error);
      setLoader(false);
      notifyError(errorMsg);
    }
  };

  return (
    <CONTEXT.Provider
      value={{
        balance,
        nativeToken,
        tokenHolders,
        tokenSale,
        currentHolder,
        loader,
        DAPP_NAME,
        transferNativeToken,
        buyToken,
        GET_POOL_ADDRESS,
        CREATE_LIQUIDITY,
        GET_ALL_LIQUIDITY,
        LOAD_TOKEN,
        notifyError,
        notifySuccess,
      }}
    >
      {children}
    </CONTEXT.Provider>
  );
};
