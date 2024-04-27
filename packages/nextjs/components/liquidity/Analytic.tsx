import React from "react";
import Image from "next/image";

const Analytic = () => {
  return (
    <section>
      <div className="bg-dotted-map">
        <div className="container">
          <div className="row medium-padding300 align-center">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Image src="/img/dots.png" alt="phone" className="primary-dots mb30" width={50} height={50} />
              <header className="crumina-module crumina-heading heading--h2 heading--with-decoration">
                <h2 className="heading-title text-3xl weight-normal">
                  Live in the <span className="weight-bold">digital world</span>
                </h2>
                <div className="heading-text">Blockchain Technology</div>
              </header>
              <div className="counters">
                <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                  <div className="crumina-module crumina-counter-item">
                    <h4 className="counter-title">Market price</h4>
                    <p className="counter-text">
                      In the heart of our digital age, the revolutionary potential of blockchain technology is reshaping
                      the landscape of virtually every sector. At its core, blockchain is a decentralized ledger system
                      that enables secure and transparent peer-to-peer transactions without the need for intermediaries.
                    </p>
                    <div className="counter-line"></div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                  <div className="crumina-module crumina-counter-item">
                    <div className="counter-numbers counter">
                      <span>16</span>
                      <div className="units">mb</div>
                    </div>
                    <h4 className="counter-title">Market Hint</h4>
                    <p className="counter-text">
                      One of the most compelling aspects of blockchain technology is its ability to foster trust in
                      inherently trustless environments. Through cryptographic algorithms and consensus mechanisms,
                      blockchain networks create a tamper-proof record of transactions, mitigating the risk of fraud and
                      manipulation.
                    </p>
                    <div className="counter-line"></div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                  <div className="crumina-module crumina-counter-item">
                    <h4 className="counter-title">Market Test</h4>
                    <p className="counter-text">
                      Moreover, blockchain technology champions inclusivity by democratizing access to financial
                      services and digital assets. By eliminating traditional barriers to entry, such as geographical
                      boundaries and institutional gatekeepers, blockchain empowers individuals to participate in global
                      economic activities on their own terms. From microtransactions to cross-border remittances,
                      blockchain-based platforms enable individuals to transact directly with one another, bypassing
                      traditional financial institutions and their associated fees.
                    </p>
                    <div className="counter-line"></div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                  <div className="crumina-module crumina-counter-item">
                    <div className="counter-numbers counter">
                      <div className="units">+</div>
                    </div>
                    <h4 className="counter-title">Market Size</h4>
                    <p className="counter-text">
                      As we continue to live in an increasingly digital world, the transformative potential of
                      blockchain technology is poised to reshape society as we know it. From revolutionizing the way we
                      exchange value to reimagining governance and identity management, blockchain&apos;s impact
                      transcends borders and industries.
                    </p>
                    <div className="counter-line"></div>
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

export default Analytic;
