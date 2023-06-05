import React from "react";

interface Props {
  title: string;
  onClick?: () => void;
}
const Button = ({ title, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {title}
    </button>
  );
};

export default Button;
