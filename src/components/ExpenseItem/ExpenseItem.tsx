import React from "react";
import { api } from "~/utils/api";
import Spinner from "../Spinner/Spinner";

type Props = {
  id: string;
  name: string;
  cost: string;
};

const ExpenseItem = ({ id, name, cost }: Props) => {
  const utils = api.useContext();

  const { mutate, isLoading } = api.example.deleteExpense.useMutation({
    async onSettled() {
      await utils.example.getExpenses.invalidate();
    },
  });
  return (
    <div className="relative flex w-full flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row">
      <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
        <p className="flex items-center text-sm font-normal text-gray-500 dark:text-white">
          {name}
        </p>
      </div>
      <div className="mb-3 mr-4 ms-auto flex flex-col items-start md:mb-0 md:flex-row md:items-center">
        <p className="flex items-center rounded-full bg-blue-700 p-1 px-2 text-sm font-normal text-white">
          {Number(cost)}$
        </p>
      </div>
      <div className="flex flex-shrink-0 items-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <button
            onClick={() => mutate({ id })}
            title="delete"
            type="button"
            className="absolute right-2.5 top-2.5 inline-flex flex-shrink-0 items-center justify-center rounded-lg p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white md:relative md:right-auto md:top-auto"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">delete</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ExpenseItem;
