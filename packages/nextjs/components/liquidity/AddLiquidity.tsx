import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Input from "./Input";
import { useLiquidityContext } from "~~/hooks/liquidity/useLiquidityContext";
import { IPoolHistory } from "~~/types/utils";

const AddLiquidity = ({ setOpenAllLiquidity }: { setOpenAllLiquidity: Dispatch<SetStateAction<boolean>> }) => {
  const { CREATE_LIQUIDITY } = useLiquidityContext();
  const [poolHistory, setPoolHistory] = useState<IPoolHistory[]>([]);
  const [selectedPool, setSelectedPool] = useState<IPoolHistory | undefined>();
  const [liquidityAmount, setLiquidityAmount] = useState<string>("");
  const [approveAmount, setApproveAmount] = useState("");
  useEffect(() => {
    const pool = JSON.parse(localStorage.getItem("poolHistory") as string);
    console.log(pool);
    setPoolHistory(pool);
  }, []);
  return (
    <section>
      <div className="">
        <div className="row pt80">
          <div className=" mb30">
            <div className="register-form form--dark">
              <header className="flex justify-between items-center gap-5 crumina-module crumina-heading heading--h2 heading--with-decoration">
                <h2 className="heading-title text-2xl">Add Liquidity</h2>
                <span className="cursor-pointer" onClick={() => setOpenAllLiquidity(false)}>
                  X
                </span>
              </header>
              <div className="form-group md:w-[400px] label-floating is-empty">
                <select
                  className="p-3"
                  onChange={e => {
                    const selected = poolHistory.find((x, index) => index + 1 == Number(e.target.value));
                    setSelectedPool(selected);
                  }}
                >
                  <option>Select Items</option>
                  {poolHistory &&
                    poolHistory.map((pool, index) => (
                      <option key={index + 1} value={index + 1}>
                        {pool.token_A.name} & {pool.token_B.symbol} Fee: {pool.fee}
                      </option>
                    ))}
                </select>
                <Input
                  placeholder="Liquidity amount"
                  handleClick={e => setLiquidityAmount(e.target.value)}
                  value={liquidityAmount}
                />

                <Input
                  placeholder="Approve"
                  handleClick={e => setApproveAmount(e.target.value)}
                  value={approveAmount}
                />
                <button
                  onClick={() => CREATE_LIQUIDITY(selectedPool as IPoolHistory, liquidityAmount, approveAmount)}
                  className="mt-3 btn btn--large btn--green-light  btn--with-icon btn--icon-right full-width"
                >
                  Add Liquidity{" "}
                  <svg className="woox-icon icon-arrow-right">
                    <use xlinkHref="#icon-arrow-right"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddLiquidity;
