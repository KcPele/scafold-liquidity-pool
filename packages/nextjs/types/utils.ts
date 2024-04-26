export type Tuple<T, MaxLength extends number = 10, Current extends T[] = []> = Current["length"] extends MaxLength
  ? Current
  : Current | Tuple<T, MaxLength, [T, ...Current]>;

export interface IToken {
  name: string;
  symbol: string;
  address: string;
  chainId: number;
  totalSupply: string;
  balance: string;
  decimals: string;
}
export interface INativeToken {
  tokenName: string;
  tokenAddress: string;
  tokenSymbol: string;
  tokenHolders: string;
  tokenOwnerOfContract: string;
  tokenStandard: string;
  tokenBalance: string;
  tokenTotalSupply: string;
}
export interface ILiquidity {
  id: string;
  network: string;
  owner: string;
  poolAddress: string;
  tokenA: string;
  tokenB: string;
  tokenA_Address: string;
  tokenB_Address: string;
  timeCreated: string;
  transactionHash: string;
}
export interface ITokensale {
  tokenPrice: string;
  tokenSold: string;
  tokenSaleBalance: string;
}
export interface ICurrentHolder {
  tokenId: bigint | undefined;
  from: string | undefined;
  to: string | undefined;
  totalToken: string;
  tokenHolders: boolean | undefined;
}
export interface IContext {
  balance: string;
  nativeToken: INativeToken | null;
  tokenHolders: string[];
  tokenSale: ITokensale | null;
  currentHolder: ICurrentHolder | null;
  loader: boolean;
  DAPP_NAME: string;
  transferNativeToken: () => Promise<void>;
  buyToken: (nToken: string) => Promise<void>;
  GET_POOL_ADDRESS: (token_1: IToken, token_2: IToken, fee: string) => Promise<string | undefined>;
  CREATE_LIQUIDITY: (pool: IPoolHistory, liquidityAmount: string, approvedAmount: string) => Promise<void>;
  GET_ALL_LIQUIDITY: () => Promise<ILiquidity[] | undefined>;
  LOAD_TOKEN: (tokenAddress: string) => Promise<IToken | undefined>;
  notifyError: (msg: any) => string;
  notifySuccess: (msg: any) => string;
}

export interface IPoolHistory {
  token_A: IToken;
  token_B: IToken;
  network: number;
  poolAddress: string;
  fee: string;
}
