import React from "react";
import Image from "next/image";

const Analytic = () => {
  return (
    <section className="bg-dotted-map">
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
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium sit nam eveniet atque, officia,
                    voluptatibus non quo cum minima dicta maiores totam qui tempora temporibus? Ea corporis ipsum magnam
                    placeat.
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
                  <h4 className="counter-title">Market price</h4>
                  <p className="counter-text">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium sit nam eveniet atque, officia,
                    voluptatibus non quo cum minima dicta maiores totam qui tempora temporibus? Ea corporis ipsum magnam
                    placeat.
                  </p>
                  <div className="counter-line"></div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                <div className="crumina-module crumina-counter-item">
                  <h4 className="counter-title">Market price</h4>
                  <p className="counter-text">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium sit nam eveniet atque, officia,
                    voluptatibus non quo cum minima dicta maiores totam qui tempora temporibus? Ea corporis ipsum magnam
                    placeat.
                  </p>
                  <div className="counter-line"></div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                <div className="crumina-module crumina-counter-item">
                  <div className="counter-numbers counter">
                    <div className="units">+</div>
                  </div>
                  <h4 className="counter-title">Market price</h4>
                  <p className="counter-text">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium sit nam eveniet atque, officia,
                    voluptatibus non quo cum minima dicta maiores totam qui tempora temporibus? Ea corporis ipsum magnam
                    placeat.
                  </p>
                  <div className="counter-line"></div>
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
