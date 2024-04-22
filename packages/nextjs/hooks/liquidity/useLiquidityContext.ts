import React, { useContext } from "react";
import { CONTEXT } from "~~/context";

export const useLiquidityContext = () => {
  const {
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
  } = useContext(CONTEXT);
  return {
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
  };
};
