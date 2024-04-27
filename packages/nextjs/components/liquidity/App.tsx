import React from "react";
import Image from "next/image";
import Link from "next/link";

const App = () => {
  return (
    <section className="medium-padding120 resonsive-align-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <header className="crumina-module crumina-heading heading--h2 heading--with-decoration">
              <div className="heading-sup-title">Top-5 Cryptocurrency</div>
              <h2 className="heading-title weight-normal md:text-4xl">
                Statistic of currencies on <span className="weight-bold"> all your device</span>
              </h2>
              <div className="heading-text">
                Stay informed and ahead of the curve with our comprehensive analysis of the top 5 cryptocurrencies. Our
                platform aggregates real-time data from across the market, offering you unparalleled insights into the
                dynamic world of digital assets. Whether you&apos;re a seasoned investor or a newcomer to the crypto
                space, our curated selection provides a snapshot of the most influential players, allowing you to make
                informed decisions with confidence.
              </div>
            </header>
            <p>
              With our seamless integration across all your devices, you can access critical statistics and trends
              wherever you go. From your desktop to your smartphone, stay connected to the pulse of the cryptocurrency
              market at all times. Our user-friendly interface empowers you to track performance, monitor changes, and
              seize opportunities with ease, ensuring that you&apos;re always in control of your crypto portfolio&apos;s
              destiny.
            </p>
            <div className="btn-market-wrap mt60">
              <Link href="#" className="btn btn--market btn--apple btn--with-icon btn--icon-left">
                <svg className="woox-icon icon-apple">
                  <use xlinkHref="#icon-apple"></use>
                </svg>
                <div className="text">
                  <span className="sub-title">download on</span>
                  <span className="title">Apple Store</span>
                </div>
              </Link>
              <Link href="#" className="btn btn--market btn--apple btn--with-icon btn--icon-left">
                <svg className="woox-icon icon-if-59-play-843782">
                  <use xlinkHref="#icon-if-59-play-843782"></use>
                </svg>
                <div className="text">
                  <span className="sub-title">download on</span>
                  <span className="title">Google play</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mt30">
            <Image className="responsive-width-50" src="/img/phone.png" alt="phone" width={500} height={500} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
