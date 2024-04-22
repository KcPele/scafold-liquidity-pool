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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eveniet eligendi sunt magnam ducimus
                nemo enim laudantium quidem pariatur, cupiditate ipsam vel vitae qui accusamus nam natus vero nobis
                omnis.
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
