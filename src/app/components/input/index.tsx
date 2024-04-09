import { FC } from "react";

import styles from "./input.module.scss";

export interface InputProps {
  type: "text" | "number";
  placeholder: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: FC<InputProps> = ({ type, placeholder, value, handleChange, handleKeyDown, className = "" }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className={`${styles.input} ${className}`}
    />
  );
};

export default Input;
