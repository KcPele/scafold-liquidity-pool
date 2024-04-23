import erc20Abi from "./abi.json";
import factoryAbi from "./factoryAbi.json";
import { ContractInterface, ethers } from "ethers";
import Web3Modal from "web3modal";
import { IToken } from "~~/types/utils";

export const FACTORY_ABI = factoryAbi;
export const FACTORY_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
export const positionManagerAddress = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
export const ERC20ABI = erc20Abi;
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
