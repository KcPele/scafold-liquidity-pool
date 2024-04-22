"use client";

import { useContext, useState } from "react";
import {
  Access,
  AddLiquidity,
  AddPool,
  Analytic,
  App,
  Footer,
  FooterICON,
  Header,
  HeaderICON,
  Hero,
  ICOSale,
  ICOTokens,
  Input,
  LiquidityHistory,
  Loader,
  NoPool,
  PoolInput,
  SuccessPool,
} from "../components/liquidity";
import { CONTEXT } from "../context";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const {
    balance,
    nativeToken,
    tokenHolders,
    tokenSale,
    currentHolder,
    loader,
    DAPP_NAME,
    trasnferNativeToken,
    buyToken,
    GET_POOL_ADDRESS,
    CREATE_LIQUIDITY,
    GET_ALL_LIQUIDITY,
    LOAD_TOKEN,
    notifyError,
    notifySuccess,
  } = useContext(CONTEXT);

  //mode state
  const [openAddPool, setOpenAddPool] = useState(false);
  const [openAllLiquidity, setOpenAllLiquidity] = useState(false);

  return (
    <div className="crumina-grid">
      <Header setOpenAddPool={setOpenAddPool} />
    </div>
  );
};

export default Home;
