import React from "react";

interface Props {
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
}
const Button = ({ title, onClick, fullWidth, type = "button" }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {title}
    </button>
  );
};

export default Button;
