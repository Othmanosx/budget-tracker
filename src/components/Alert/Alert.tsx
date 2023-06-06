import React from "react";

interface Props {
  title: string;
}
const Alert = ({ title }: Props) => {
  return (
    <div
      className="my-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      {title}
    </div>
  );
};

export default Alert;
