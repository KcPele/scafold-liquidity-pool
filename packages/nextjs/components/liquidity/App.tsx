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
              <div className="heading-sup-title">top-5 Cryptocurrency</div>
              <h2 className="heading-title weight-normal">
                Statistic of currencies on <span className="weight-bold"> all your device</span>
              </h2>
              <div className="heading-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique eligendi doloribus earum aperiam
                fugit debitis in. Iste natus delectus laudantium molestias beatae aliquid molestiae fugiat dolor facere
                dolorum? Natus illo nisi expedita id. Eum eligendi voluptatum, vitae quas dolorem quisquam.
              </div>
            </header>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel, eaque eligendi illum ducimus voluptate
              asperiores quo quasi perferendis modi maiores, iste quaerat harum repudiandae nulla, laudantium provident
              aspernatur? Adipisci architecto iste suscipit quo repellendus, incidunt reprehenderit magni ratione
              temporibus nam.
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
