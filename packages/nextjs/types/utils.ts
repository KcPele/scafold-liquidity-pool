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
  tokenName: String;
  tokenAddress: String;
  tokenSymbol: String;
  tokenHolders: String;
  tokenOwnerOfContract: String;
  tokenStandard: String;
  tokenBalance: String;
  tokenTotalSupply: String;
}
export interface ILiquidity {
  id: string;
  network: string;
  owner: string;
  ppolAddress: string;
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
  balance: String;
  nativeToken: INativeToken | null;
  tokenHolders: String[];
  tokenSale: ITokensale | null;
  currentHolder: ICurrentHolder | null;
  loader: Boolean;
  DAPP_NAME: String;
  transferNativeToken: () => Promise<void>;
  buyToken: (nToken: bigint) => Promise<void>;
  GET_POOL_ADDRESS: (token_1: IToken, token_2: IToken, fee: string) => Promise<unknown>;
  CREATE_LIQUIDITY: (
    pool: {
      token_A: IToken;
      token_B: IToken;
      poolAddress: any;
    },
    liquidityAmount: string,
    approvedAmount: string,
  ) => Promise<void>;
  GET_ALL_LIQUIDITY: () => Promise<ILiquidity[] | undefined>;
  LOAD_TOKEN: (tokenAddress: string) => Promise<IToken>;
  notifyError: (msg: any) => string;
  notifySuccess: (msg: any) => string;
}
