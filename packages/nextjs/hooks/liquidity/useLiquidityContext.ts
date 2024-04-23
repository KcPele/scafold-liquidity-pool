import React, { useContext } from "react";
import { CONTEXT } from "~~/context";
import { IContext } from "~~/types/utils";

export const useLiquidityContext = () => {
  if (CONTEXT == null) {
    throw new Error("app must be wrapped with context");
  }
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
  } = useContext(CONTEXT) as IContext;
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
