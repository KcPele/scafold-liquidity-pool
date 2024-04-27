import React from "react";
import Image from "next/image";

const Access = () => {
  return (
    <section className="bg-1 main-section crumina-flying-balls particles-js">
      <div className="container">
        <div className="row medium-padding120">
          <div className="crumina-module crumina-featured-block">
            <div className="image-block">
              <Image className="w-full" alt="access" src="/img/pc.png" width={700} height={700} />
            </div>
            <div className="text-block">
              <header className="crumina-module crumina-heading heading--h2 heading--with-decoration">
                <div className="heading-sup-title">Top-5 Cryptocurrency</div>
                <h2 className="md:text-4xl heading-title weight-normal">
                  Access <span className="weight-bold">analytical market $ price data</span>
                </h2>
                <div className="heading-text">
                  Accessing analytical market and price data is pivotal in navigating the dynamic landscape of
                  cryptocurrencies and financial markets. With the exponential growth of digital assets, having
                  real-time insights and comprehensive analytics at your fingertips is essential for making informed
                  investment decisions. Whether you&apos;re a seasoned trader or a novice enthusiast, having access to
                  reliable data empowers you to monitor trends, identify patterns, and seize opportunities with
                  confidence. By leveraging analytical tools and market data, you can stay ahead of the curve, mitigate
                  risks, and optimize your investment strategies in the fast-paced world of digital finance.
                </div>
              </header>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Access;
