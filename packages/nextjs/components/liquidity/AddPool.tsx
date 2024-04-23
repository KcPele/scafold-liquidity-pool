import React, { Dispatch, SetStateAction, useState } from "react";
import { NoPool, PoolInput, SuccessPool } from "~~/components/liquidity";

const zeroAdd = "0x0000000000000000000000000000000000000000";

const AddPool = ({ setOpenAddPool }: { setOpenAddPool: Dispatch<SetStateAction<boolean>> }) => {
  const [poolAddress, setPoolAddress] = useState("");
  return (
    <section>
      <div className="">
        <div className="row pt80">
          <div className=" mb30">
            <div className="register-form form--dark">
              <header className="flex justify-between items-center gap-5 crumina-module crumina-heading heading--h2 heading--with-decoration">
                <h2 className="heading-title text-2xl">Add Pool</h2>
                <span className="cursor-pointer" onClick={() => setOpenAddPool(false)}>
                  X
                </span>
              </header>
              {poolAddress === zeroAdd ? (
                <NoPool />
              ) : poolAddress ? (
                <SuccessPool poolAddress={poolAddress} />
              ) : (
                <PoolInput setPoolAddress={setPoolAddress} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddPool;
