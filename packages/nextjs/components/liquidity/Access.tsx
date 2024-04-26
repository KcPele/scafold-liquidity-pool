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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique eligendi doloribus earum aperiam
                  fugit debitis in. Iste natus delectus laudantium molestias beatae aliquid molestiae fugiat dolor
                  facere dolorum? Natus illo nisi expedita id. Eum eligendi voluptatum, vitae quas dolorem quisquam.
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
