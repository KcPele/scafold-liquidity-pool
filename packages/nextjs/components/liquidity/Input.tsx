import React, { ChangeEventHandler } from "react";

const Input = ({
  value,
  placeholder,
  handleClick,
}: {
  value?: string;
  placeholder?: string;
  handleClick?: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <div className="mt-2 md:w-[400px] form-group label-floating is-empty">
      <input
        className="form-control input--squared input--dark"
        placeholder={placeholder}
        value={value}
        onChange={handleClick}
      />
    </div>
  );
};

export default Input;
