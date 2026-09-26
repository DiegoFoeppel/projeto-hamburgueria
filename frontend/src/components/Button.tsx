const btnVariants = {
  default:
    "w-full p-2 border-2 border-[#C92A0E] text-sm font-bold hover:cursor-pointer hover:opacity-80 rounded mb-2 bg-[#C92A0E] text-white",
  outline:
    "w-full p-2 border-2 text-sm font-bold hover:cursor-pointer hover:opacity-80 rounded mb-2 bg-white text-[#C92A0E]",
};

type ButtonType = {
  text: string;
  onClick?: () => void;
  variant: "default" | "outline";
  type: "submit" | "reset" | "button" | undefined;
};

const Button = ({ text, onClick, variant = "default", type }: ButtonType) => {
  return (
    <button className={btnVariants[variant]} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;
