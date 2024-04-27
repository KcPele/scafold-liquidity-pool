import React from "react";
import Link from "next/link";
import { useLiquidityContext } from "~~/hooks/liquidity/useLiquidityContext";

const Hero = () => {
  const { transferNativeToken } = useLiquidityContext();
  return (
    <section data-settings="particles-1" className="main-section crumina-flying-balls particles-js bg-1">
      <div className="container">
        <div className="row medium-padding120 align-center">
          <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
            <header className="crumina-module crumina-heading heading--2 heading--with-decoration">
              <div className="heading-sup-title"> Coin market</div>
              <h2 className="heading-title text-4xl heading--half-colored">Created liquidity marketplace</h2>
              <div className="heading-text">
                Welcome to our DApp, where we&apos;ve revolutionized liquidity provision with our cutting-edge
                marketplace. Say goodbye to liquidity issues and hello to seamless transactions. Our innovative
                marketplace empowers users to create, manage, and optimize liquidity like never before. Join us and
                experience a new era of decentralized finance.
              </div>
            </header>
            <Link
              href="#buyScafold"
              className="btn btn--large btn--primary btn--transparent"
              onClick={() => transferNativeToken}
            >
              Get Scaffold Token Now!
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
