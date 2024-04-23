import React from "react";
import Input from "./Input";

const SuccessPool = ({ poolAddress }: { poolAddress: string }) => {
  return (
    <>
      <Input value={`${poolAddress}`} />
      <button
        onClick={() => navigator.clipboard.writeText(poolAddress)}
        className="mt-3 btn btn--large btn--green-light btn--with-icon btn-icon full-width"
      >
        Copy Pool Address
        <svg className="woox-icon icon-arrow-right">
          <use xlinkHref="#icon--arrow-right"></use>
        </svg>
      </button>
    </>
  );
};

export default SuccessPool;
