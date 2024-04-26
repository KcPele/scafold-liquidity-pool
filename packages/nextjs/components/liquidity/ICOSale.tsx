import React, { useState } from "react";
import Image from "next/image";
import Input from "./Input";
import { useLiquidityContext } from "~~/hooks/liquidity/useLiquidityContext";

const ICOSale = () => {
  const { tokenSale, nativeToken, buyToken } = useLiquidityContext();
  const [tokenQuantity, setTokenQuantity] = useState("");
  const percentage = (Number(tokenSale?.tokenSold) / Number(tokenSale?.tokenSaleBalance)) * 100;
  return (
    <section id="tokenbuy" className="medium-padding120 responsive-align-center">
      <div className="container" id="buyScafold">
        <div className="row bg-2">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <header className="crumina-module crumina-heading heading--h2 heading--with-decoration">
              <Image src="/img/dots.png" width={50} height={50} alt="ico sale" />
              <h2 className="heading-title weight-normal md:text-4xl">
                Hurry to invest <span className="weight-bold"> in cryptocurrency</span>
              </h2>
              <div className="heading-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique eligendi doloribus earum aperiam
                fugit debitis in. Iste natus as dolorem quisquam.
              </div>
            </header>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum cumque mollitia aut minus voluptates quos
              inventore cupiditate vero quisquam et expedita, consequatur numquam, ad sed error accusantium nulla.
              Earum, at, laboriosam maiores perspiciatis ab blanditiis facilis itaque minima hic cum nesciunt
              consectetur sed. Molestias a nobis non unde, cupiditate ad.
            </p>
            <div className="crumina-module crumina-counter-item counter--icon-left mt60">
              <svg className="woox-icon">
                <use xlinkHref="#icon-group"></use>
              </svg>
              <div className="counter-content">
                <div className="counter-numbers counter">
                  <span>{nativeToken ? nativeToken?.tokenTotalSupply : "00000"}</span>

                  <div className="uints">+</div>
                </div>
                <h4 className="counter-title">{nativeToken?.tokenSymbol}</h4>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 col-lg-offset-0 col-sm-12 col-xs-12">
            <div className="widget w-distribution-ends countdown-bg1">
              <h5 className="title">Scafold token for sale</h5>
              <div className="new_center_img mt30 mb-3">
                <Image src="/img/nopool.png" width={300} height={300} alt="no pool" className="responsive-width-50" />
              </div>
              <Input
                value={tokenQuantity}
                placeholder="token Qauntity"
                handleClick={e => setTokenQuantity(e.target.value)}
              />
              <button onClick={() => buyToken(tokenQuantity)} className="btn  btn--large btn--green-light">
                Buy Scafold Tokens
              </button>
              <div className="crumina-module scumina-skills-item skills-item--bordered">
                <div className="skills-item-info">
                  <span className="skills-item-title flex justify-between">
                    {tokenSale ? tokenSale?.tokenSold : "0"}
                    <span className="skills-item-count c-primary">
                      <span className="count-animate"></span>
                      <span className="uints">Balance: {nativeToken ? nativeToken?.tokenBalance : "0"}</span>
                    </span>
                  </span>
                </div>
                <div className="skills-item-meter">
                  <span
                    className="skills-item-meter-active bg-primary-color"
                    style={{
                      width: `${percentage}%`,
                    }}
                  ></span>
                </div>
                <span className="add-info">
                  <span>
                    <span className="c-link-color">Market Cap:</span>
                    {Number(tokenSale?.tokenPrice) * Number(tokenSale?.tokenSaleBalance)}
                  </span>
                  <span className="c-link-color">Matic</span>
                </span>
              </div>
              <div className="price-wrap">
                <div className="token-price">
                  Token Price:
                  <div
                    className="
                  price-value"
                  >
                    {tokenSale?.tokenPrice}
                  </div>
                </div>
                <div className="token-total">
                  Total {nativeToken?.tokenSymbol}
                  Tokens: <div className="price-value">{tokenSale?.tokenSaleBalance}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ICOSale;
