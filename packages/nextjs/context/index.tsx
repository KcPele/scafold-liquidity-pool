import React, { useEffect, useState } from "react";
import ERC20ABI from "./abi.json";
import { FACTORY_ABI, FACTORY_ADDRESS, positionManagerAddress } from "./constants";
import { Token } from "@uniswap/sdk-core";
import UniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { abi as INonfungiblePositionManagerABI } from "@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json";
import { Pool, Position, nearestUsableTick } from "@uniswap/v3-sdk";
import { fetchBalance, fetchToken, getContract } from "@wagmi/core";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useAccount, useNetwork } from "wagmi";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";
import { IContext, ICurrentHolder, INativeToken, IToken, ITokensale } from "~~/types/utils";
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
  const [tokenHolders, setTokenHolders] = useState<String[]>([]);
  const [tokenSale, setTokenSale] = useState<ITokensale | null>(null);

  const [currentHolder, setCurrentHolder] = useState<ICurrentHolder | null>(null);

  //contracts
  const liquidityContract = useScaffoldContract({
    contractName: "Liquidity",
  });
  const scaffoldContract = useScaffoldContract({
    contractName: "Scaffold",
  });
  const icoScaffoldContract = useScaffoldContract({
    contractName: "ICOScaffold",
  });
  //notification
  const notifyError = (msg: string) => toast.error(msg, { duration: 4000 });
  const notifySuccess = (msg: string) => toast.error(msg, { duration: 4000 });

  //load tokens
  const LOAD_TOKEN = async (tokenAddress: string) => {
    const balance = await fetchBalance({
      address: address as string,
      token: tokenAddress,
    });
    const tokenDetails = await fetchToken({
      address: tokenAddress,
    });
    return {
      address: tokenDetails.address,
      name: tokenDetails.name,
      totalSupply: tokenDetails.totalSupply.formatted,
      symbol: tokenDetails.symbol,
      decimals: tokenDetails.totalSupply.formatted,
      balance: balance.formatted,
      chainId: chain!.id,
    };
  };

  //get pool address
  const GET_POOL_ADDRESS = async (token_1: IToken, token_2: IToken, fee: string) => {
    try {
      setLoader(true);
      const contract = getContract({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
      });
      const poolAddress = await contract.read?.getPool([token_1.address, token_2.address, Number(fee)]);
      const poolHistory = {
        token_A: token_1,
        token_B: token_2,
        network: token_1.chainId,
        poolAddress,
      };
      const zeroAdd = "0x0000000000000000000000000000000000000000";

      if (poolAddress === zeroAdd) {
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
      const errorMsg = parseErrorMsg(error);

      setLoader(false);
      notifyError(errorMsg);
    }
  };

  //get pool data
  async function getPoolData(poolContract: any) {
    const [tickSpacing, fee, liquidity, slot0] = await Promise.all([
      poolContract.read.tickSpacing(),
      poolContract.read.fee(),
      poolContract.read.liquidity(),
      poolContract.read.slot0(),
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
  const CREATE_LIQUIDITY = async (
    pool: { token_A: IToken; token_B: IToken; poolAddress: any },
    liquidityAmount: string,
    approvedAmount: string,
  ) => {
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
      const poolAddress = pool.poolAddress[0];
      const nonfundablePositionManagerContract = getContract({
        address: positionManagerAddress,
        abi: INonfungiblePositionManagerABI,
      });

      const poolContract = getContract({
        address: poolAddress,
        abi: IUniswapV3PoolABI,
      });

      const poolData = await getPoolData(poolContract);

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

      const tokenContract0 = getContract({
        address: pool.token_A.address,
        abi: ERC20ABI,
      });
      await tokenContract0.simulate.approve([positionManagerAddress, approvalAmount]);
      const tokenContract1 = getContract({
        address: pool.token_B.address,
        abi: ERC20ABI,
      });
      await tokenContract1.simulate.approve([positionManagerAddress, approvalAmount]);

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
      const transactionHash = (await nonfundablePositionManagerContract.simulate
        .mint([params], {
          gas: gasFee,
        })
        .then(res => res?.result)) as string;

      if (transactionHash) {
        const addLiquidityData = await liquidityContract.data?.simulate.addLiquidity([
          pool.token_A.name,
          pool.token_B.name,
          pool.token_A.address,
          pool.token_B.address,
          poolAddress,
          pool.token_A.chainId.toString(),
          transactionHash,
        ]);
        await addLiquidityData?.result;
        setLoader(false);
        notifySuccess("Liquidity add successfully");
        window.location.reload();
      }
    } catch (error: any) {
      const errorMsg = parseErrorMsg(error);

      setLoader(false);
      notifyError(errorMsg);
    }
  };

  //native token
  const fetchInitailData = async () => {
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
      if (address) {
        tokenBalance = await scaffoldContract.data?.read.balanceOf([address]);
      } else {
        tokenBalance = 0;
      }
      const tokenAddress = scaffoldContract.data?.address;
      const tokenName = await scaffoldContract.data?.read.name();
      const tokenSymbol = await scaffoldContract.data?.read.symbol();
      const tokenTotalSupply = await scaffoldContract.data?.read.totalSupply();
      const tokenStandard = await scaffoldContract.data?.read.standard();
      const tokenHolders = await scaffoldContract.data?.read._userId();
      const tokenOwnerOfContract = await scaffoldContract.data?.read.ownerOfContract();
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
      const getTokenHolders = (await scaffoldContract.data?.read.getTokenHolder()) as string[];
      setTokenHolders(getTokenHolders);

      //getting token holder data
      if (address) {
        const getTokenHolderData = await scaffoldContract.data?.read.getTokenHolderData([address]);
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
      const tokenPrice = await icoScaffoldContract.data?.read.tokenPrice();
      const tokenSold = await icoScaffoldContract.data?.read.tokensSold();
      const tokenSaleBalance = await scaffoldContract.data?.read.balanceOf([
        icoScaffoldContract.data?.address as string,
      ]);
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
  };
  useEffect(() => {
    fetchInitailData();
  }, []);

  const buyToken = async (nToken: bigint) => {
    try {
      setLoader(true);
      const price = 0.0001 * Number(nToken);
      const amount = ethers.utils.parseEther(price.toString());

      const buying = await icoScaffoldContract.data?.simulate.buyTokens([nToken], {
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

  //native token transfer
  const transferNativeToken = async () => {
    try {
      const TOKEN_SALE_ADDRESS = icoScaffoldContract.data?.address as string;
      const TOKEN_AMOUNT = 2000;
      const nTokens = TOKEN_AMOUNT.toString();
      const transferAmount = ethers.utils.parseEther(nTokens);
      const trascation = await scaffoldContract.data?.simulate.transfer(
        [TOKEN_SALE_ADDRESS, transferAmount.toBigInt()],
        {
          gas: gasFee,
        },
      );
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
      const liqquidityHistory = await liquidityContract?.data?.read.getAllLiquidity([address]);

      const AllLiquidity = liqquidityHistory?.map(liquidity => {
        const liquidityArray = {
          id: liquidity.id.toString(),
          network: liquidity.network,
          owner: liquidity.owner,
          ppolAddress: liquidity.poolAddress,
          tokenA: liquidity.tokenA,
          tokenB: liquidity.tokenB,
          tokenA_Address: liquidity.tokenA_Address,
          tokenB_Address: liquidity.tokenB_Address,
          timeCreated: liquidity.timeCreated.toString(),
          transactionHash: liquidity.transactionHash,
        };
        return liquidityArray;
      });
      return AllLiquidity;
    } catch (error: any) {
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
