import type { ButtonType } from "../types/types";
import { btnVariants } from "../utils/data";

const Button = ({
  text,
  onClick,
  variant = "default",
  type,
  disabled,
}: ButtonType) => {
  return (
    <button
      className={btnVariants[variant]}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
