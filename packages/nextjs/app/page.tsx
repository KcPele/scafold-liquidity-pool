"use client";

import { useState } from "react";
import {
  Access,
  AddLiquidity,
  AddPool,
  Analytic,
  App,
  Footer,
  Header,
  Hero,
  ICOSale,
  ICOTokens,
  LiquidityHistory,
  Loader,
} from "../components/liquidity";
import type { NextPage } from "next";
import { useLiquidityContext } from "~~/hooks/liquidity/useLiquidityContext";

const Home: NextPage = () => {
  //mode state
  const [openAddPool, setOpenAddPool] = useState(false);
  const [openAllLiquidity, setOpenAllLiquidity] = useState(false);
  const { loader } = useLiquidityContext();
  return (
    <div className="crumina-grid">
      <Header setOpenAddPool={setOpenAddPool} setOpenAllLiquidity={setOpenAllLiquidity} />
      <div className="main-content-wrapper">
        <Hero />
        <ICOTokens />
        <LiquidityHistory />
        <App />
        <Analytic />
        <Access />
        <ICOSale />
      </div>

      {openAddPool && (
        <div className="new_center">
          <AddPool setOpenAddPool={setOpenAddPool} />
        </div>
      )}
      {openAllLiquidity && (
        <div className="new_center">
          <AddLiquidity setOpenAllLiquidity={setOpenAllLiquidity} />
        </div>
      )}
      {loader && (
        <div className="new_center">
          <Loader />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
