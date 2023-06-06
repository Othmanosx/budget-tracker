import React, { type FormEvent } from "react";
import Input from "../Input/Input";
import { useModalStore, useNewExpenseStore } from "store";
import Button from "../Button/Button";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

const Modal = () => {
  const utils = api.useContext();
  const { data } = useSession();
  const setOpen = useModalStore((state) => state.setOpen);
  const name = useNewExpenseStore((state) => state.name);
  const setName = useNewExpenseStore((state) => state.setName);
  const cost = useNewExpenseStore((state) => state.cost);
  const setCost = useNewExpenseStore((state) => state.setCost);

  const { mutateAsync, isLoading: isMutating } =
    api.example.addExpense.useMutation({
      async onSettled() {
        await utils.example.getExpenses.invalidate();
      },
    });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    if (!data?.user) {
      alert("Please login first");
      return;
    }
    e.preventDefault();
    mutateAsync({ name, cost })
      .then(() => {
        setName("");
        setCost("");
        setOpen(false);
      })
      .catch(console.log);
  };
  return (
    <div>
      {/* Main modal */}
      <div className="fixed left-0 right-0 top-0 z-50 h-full max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0">
        <div className="relative m-auto max-h-full w-full max-w-md translate-y-[50%]">
          {/* Modal content */}
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="rounded-lg px-6 py-6 shadow-[0_0_20px_9999px_#00000070] lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Add a new expense
              </h3>
              <form className="space-y-6" onSubmit={submit}>
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Expense name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="name"
                    required
                    value={name}
                    onChange={setName}
                  />
                </div>
                <div>
                  <label
                    htmlFor="cost"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Cost of expense
                  </label>
                  <Input
                    type="number"
                    name="cost"
                    id="cost"
                    placeholder="0"
                    required
                    value={cost}
                    onChange={setCost}
                  />
                </div>
                <Button
                  title={isMutating ? "Loading..." : "submit"}
                  type="submit"
                  fullWidth
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
