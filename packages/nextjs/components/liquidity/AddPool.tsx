import React, { Dispatch, SetStateAction } from "react";
import { useLiquidityContext } from "~~/hooks/liquidity/useLiquidityContext";

const AddPool = ({ setOpenAddPool }: { setOpenAddPool: Dispatch<SetStateAction<boolean>> }) => {
  const {} = useLiquidityContext()
  return <div>AddPool</div>;
};

export default AddPool;
