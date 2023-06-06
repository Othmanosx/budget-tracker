import React from "react";

interface Props {
  type?: string;
  id?: string;
  name?: string;
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  onChange: (value: string) => void;
}
const Input = ({
  type = "text",
  placeholder = "input",
  required,
  onChange,
  name,
  value,
  id,
}: Props) => {
  return (
    <input
      name={name}
      type={type}
      id={id}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      placeholder={placeholder}
      required={required}
    />
  );
};

export default Input;
