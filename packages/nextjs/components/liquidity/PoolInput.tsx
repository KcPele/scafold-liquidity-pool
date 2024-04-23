import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Input from "./Input";
import { useLiquidityContext } from "~~/hooks/liquidity/useLiquidityContext";
import { IToken } from "~~/types/utils";

const PoolInput = ({ setPoolAddress }: { setPoolAddress: Dispatch<SetStateAction<string>> }) => {
  const { LOAD_TOKEN, notifyError, GET_POOL_ADDRESS } = useLiquidityContext();
  const [token_1, setToken_1] = useState<IToken | null>(null);
  const [token_2, setToken_2] = useState<IToken | null>(null);
  const [fee, setFee] = useState<string>("");
  //display token
  const [token_A, setToken_A] = useState("");
  const [token_B, setToken_B] = useState("");

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await LOAD_TOKEN(token_A);
        if (!token) {
          console.log("Kindly pass the token address");
        } else {
          setToken_1(token);
        }
      } catch (error) {
        console.log(" from pool input", error);
      }
    };
    loadToken();
  }, [token_A]);
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await LOAD_TOKEN(token_B);

        if (!token) {
          console.log("Kindly pass the token address");
        } else {
          setToken_2(token);
        }
      } catch (error) {
        console.log(" from pool input", error);
      }
    };
    loadToken();
  }, [token_B]);

  const CALLING_POOL_ADD = async () => {
    if (!token_1 || !token_2 || !fee) {
      return notifyError("Kindly provide all the required fields");
    } else {
      const pool = await GET_POOL_ADDRESS(token_1, token_2, fee as string);
      setPoolAddress(pool || "");
    }
  };
  return (
    <>
      {token_1 ? (
        <Input value={`${token_1.name} ${token_1.symbol} Bal: ${token_1.balance.slice(0, 8)}`} />
      ) : (
        // <AddressInput value={token_A} placeholder={"Token A"} onChange={setToken_A} />
        <Input value={token_A} placeholder={"Token A"} handleClick={e => setToken_A(e.target.value)} />
      )}
      {token_2 ? (
        <Input value={`${token_2.name} ${token_2.symbol} Bal: ${token_2.balance.slice(0, 8)}`} />
      ) : (
        // <AddressInput value={token_A} placeholder={"Token A"} onChange={setToken_A} />
        <Input value={token_B} placeholder={"Token B"} handleClick={e => setToken_B(e.target.value)} />
      )}
      <Input value={fee as string} placeholder={"Fee"} handleClick={e => setFee(e.target.value)} />
      {/* <IntegerInput  value={fee} placeholder={"Fee"} onChange={setFee} /> */}
      <button
        onClick={() => CALLING_POOL_ADD()}
        className="mt-3 btn btn--large btn--green-light  btn--with-icon btn--icon-right full-width"
      >
        Check pool{" "}
        <svg className="woox-icon icon-arrow-right">
          <use xlinkHref="#icon-arrow-right"></use>
        </svg>
      </button>
    </>
  );
};

export default PoolInput;
