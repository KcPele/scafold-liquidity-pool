import React from "react";
import Image from "next/image";

const NoPool = () => {
  return (
    <div className="md:w-[400px]  new_center_img mt30 w-full flex items-center flex-col">
      <Image src="/img/nopool.png" className=" responsive-width-50" alt="no pool" width="280" height="280" />
      <div className="w-full">
        <button
          onClick={() => window.location.reload()}
          className="w-full mt-3 btn btn--large btn--green-light  btn--with-icon btn--icon-right full-width"
        >
          Sorry, No Pool - Get back
          <svg className="woox-icon icon-arrow-right">
            <use xlinkHref="#icon-arrow-right"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NoPool;
