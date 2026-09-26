import React from "react";

const Input = (props) => {
  console.log("props", props);

  return (
    <input
      {...props}
      className='bg-white px-2 py-1 w-[350px] h-[34px] rounded-[5px] mb-2'
    />
  );
};

export default Input;
