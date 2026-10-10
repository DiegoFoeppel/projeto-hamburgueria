import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className='bg-white px-2 py-1 w-[350px] h-[34px] rounded-[5px] mb-2'
    />
  );
};

export default Input;
