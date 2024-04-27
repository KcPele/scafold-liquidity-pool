import erc20Abi from "./abi.json";
import factoryAbi from "./factoryAbi.json";
import { ContractInterface, ethers } from "ethers";
import Web3Modal from "web3modal";
import deployedContracts from "~~/contracts/deployedContracts";
import { IToken } from "~~/types/utils";

export const FACTORY_ABI = factoryAbi;
export const FACTORY_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
export const positionManagerAddress = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
export const ERC20ABI = erc20Abi;
export const LIQUIDITY_ABI = deployedContracts["31337"].Liquidity.abi;
export const ICOSCAFFOLD_ABI = deployedContracts["11155111"].ICOScaffold.abi;
export const SCAFFOLD_ADDRESS = "0x6cc9bF8De95641eAffAd8D7cC8450877123D91e7";
export const ICOSCAFFOLD_ADDRESS = "0x8e5a8Ca54536A02AeED9f463B81f888f4Ca96Ab5";
export const LIQUIDITY_ADDRESS = "0x7B827aA42d29f7322F3BA67DcDbb75394636E539";
// CTToken 0xb928e2C252291A2d75091122800D47eE1b5C4EE2
//WETH 0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14
const fetchContract = (signer: ethers.providers.JsonRpcSigner, ABI: ContractInterface, Address: string) =>
  new ethers.Contract(Address, ABI, signer);
export const web3Provider = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    return provider;
  } catch (error) {
    console.log(error);
  }
};
export const web3Signer = async () => {
  try {
    const provider = await web3Provider();
    if (!provider) throw new Error("No provider");
    return provider.getSigner();
  } catch (error) {
    console.log(error);
  }
};
export const CONNECTION_CONTRACT = async (ADDRESS: string): Promise<IToken | undefined> => {
  try {
    const provider = await web3Provider();
    if (!provider) throw new Error("No provider");
    const network = await provider.getNetwork();
    const signer = provider.getSigner();

    const contract = fetchContract(signer, ERC20ABI, ADDRESS);

    //user address
    const userAddress = signer.getAddress();
    const balance = await contract.balanceOf(userAddress);
    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();
    const decimals = await contract.decimals();
    const address = contract.address;
    const token = {
      balance: ethers.utils.formatEther(balance.toString()),
      name,
      symbol,
      totalSupply: ethers.utils.formatEther(totalSupply.toString()),
      decimals,
      address,
      chainId: network.chainId,
    };

    return token;
  } catch (error) {
    console.log(error);
  }
};

export const internalContract = async (ABI: ContractInterface, contractAddress: string) => {
  try {
    const signer = (await web3Signer()) as ethers.providers.JsonRpcSigner;
    return fetchContract(signer, ABI, contractAddress);
  } catch (error) {
    console.log(error);
  }
};

export const getBalance = async () => {
  try {
    const signer = (await web3Signer()) as ethers.providers.JsonRpcSigner;
    return await signer.getBalance();
  } catch (error) {
    console.log(error);
  }
};
