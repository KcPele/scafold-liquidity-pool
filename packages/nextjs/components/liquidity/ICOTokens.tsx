import React from "react";
import Image from "next/image";
import Link from "next/link";

const ICOTokens = () => {
  return (
    <section className="medium-padding100">
      <div className="container">
        <div className="row align-center " id="started">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div
              className="crumina-module crumina-module-slider
             pagination-bottom-center"
            >
              <div className="swiper-container" data-show-items="3" data-pre-next="1">
                <div className="new_flex">
                  <div className="swiper-slide">
                    <div className="crumina-module crumina-pricing-table pricing-table--small">
                      <div className="pricing-thumb">
                        <Image
                          src="/img/if_btc.png"
                          className="w-full woox-icon"
                          height="50"
                          width="50"
                          alt="pricing thumb"
                        />
                        <h5 className="pricing-title">
                          Bitcon <span>BTC</span>
                        </h5>
                        <div className="gain-drop-arrow">
                          <svg className="woox-icon icon-arrow-up arrow-up active">
                            <use xlinkHref="#icon-arrow-up"> </use>
                          </svg>
                          <svg className="woox-icon icon-arrow-down arrow-down">
                            <use xlinkHref="#icon-arrow-down"> </use>
                          </svg>
                        </div>
                      </div>
                      <div className="price">
                        <div className="price-sup-title">1 Bitcoin equals:</div>
                        <div className="price-value">
                          $78340.2
                          <div className="growth">+25.48%</div>
                        </div>
                      </div>
                      <Link href="" className="btn btn--large btn--dark-lighter btn--transparent full-width">
                        But Bitcoin Now!
                      </Link>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="crumina-module crumina-pricing-table pricing-table--small">
                      <div className="pricing-thumb">
                        <Image
                          src="/img/if_eth.png"
                          className="w-full woox-icon"
                          height="50"
                          width="50"
                          alt="pricing thumb"
                        />
                        <h5 className="pricing-title">
                          Ethereum <span>ETH</span>
                        </h5>
                        <div className="gain-drop-arrow">
                          <svg className="woox-icon icon-arrow-up arrow-up active">
                            <use xlinkHref="#icon-arrow-up"> </use>
                          </svg>
                          <svg className="woox-icon icon-arrow-down arrow-down">
                            <use xlinkHref="#icon-arrow-down"> </use>
                          </svg>
                        </div>
                      </div>
                      <div className="price">
                        <div className="price-sup-title">1 Ethetherum equals:</div>
                        <div className="price-value">
                          $7840.98
                          <div className="growth">+28.48%</div>
                        </div>
                      </div>
                      <Link href="" className="btn btn--large btn--dark-lighter btn--transparent full-width">
                        Buy Eth Now!
                      </Link>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="crumina-module crumina-pricing-table pricing-table--small">
                      <div className="pricing-thumb">
                        <Image
                          src="/img/if_xrp.png"
                          className="w-full woox-icon"
                          height="50"
                          width="50"
                          alt="pricing thumb"
                        />
                        <h5 className="pricing-title">
                          Ripple <span>XRP</span>
                        </h5>
                        <div className="gain-drop-arrow">
                          <svg className="woox-icon icon-arrow-up arrow-up active">
                            <use xlinkHref="#icon-arrow-up"> </use>
                          </svg>
                          <svg className="woox-icon icon-arrow-down arrow-down">
                            <use xlinkHref="#icon-arrow-down"> </use>
                          </svg>
                        </div>
                      </div>
                      <div className="price">
                        <div className="price-sup-title">1 Ripple equals:</div>
                        <div className="price-value">
                          $1.22
                          <div className="growth">+451.48%</div>
                        </div>
                      </div>
                      <Link href="" className="btn btn--large btn--dark-lighter btn--transparent full-width">
                        Buy Ripple Now!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ICOTokens;
