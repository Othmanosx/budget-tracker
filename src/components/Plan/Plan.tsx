import React, { type FormEvent, useMemo } from "react";
import Button from "../Button";
import Input from "../Input";
import { api } from "~/utils/api";
import { useGlobalStore } from "store";
import Spinner from "../Spinner";
import Alert from "../Alert/Alert";
import { useSnackbar } from "notistack";

const Plan = () => {
  const utils = api.useContext();
  const { enqueueSnackbar } = useSnackbar();
  // edit budget toggle
  const editBudget = useGlobalStore((state) => state.editBudget);
  const setEditBudget = useGlobalStore((state) => state.setEditBudget);

  // budget amount
  const budget = useGlobalStore((state) => state.budget);
  const setBudget = useGlobalStore((state) => state.setBudget);

  const { data, isLoading } = api.example.getPlan.useQuery();
  const { data: expenses, isLoading: isLoadingExpenses } =
    api.example.getExpenses.useQuery();
  const { mutate, isLoading: isUpdatingBudget } =
    api.example.editPlan.useMutation({
      async onSettled() {
        await utils.example.getPlan.invalidate();
        setEditBudget(false);
      },
      onSuccess() {
        enqueueSnackbar({
          message: "Expense updated successfully!",
          variant: "success",
        });
      },
      onError(e) {
        enqueueSnackbar({
          message: "Couldn't update the budget!",
          variant: "error",
        });
        console.log(e);
      },
    });

  const submitBudget = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editBudget) {
      mutate({ budget });
    } else {
      setEditBudget(!editBudget);
      setBudget(String(data?.budget));
    }
  };

  const totalExpenses = expenses?.reduce(
    (current, next) => current + Number(next.cost),
    0
  );

  const remaining = useMemo(
    () => Number(data?.budget ?? 0) - Number(totalExpenses),
    [data?.budget, totalExpenses]
  );
  const shouldAlert = expenses && expenses.length > 0 && remaining <= 0;
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3 align-middle">
        <form
          onSubmit={submitBudget}
          className="flex justify-between gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700"
        >
          {editBudget ? (
            <Input
              value={budget}
              onChange={setBudget}
              type="number"
              name="budget"
              id="budget"
              placeholder="0"
              required
            />
          ) : (
            <h2 className="flex items-center font-normal text-gray-500 dark:text-white">
              <b>Budget: </b>
              {isLoading ? <Spinner /> : Number(data?.budget ?? 0)}$
            </h2>
          )}
          <Button
            type="submit"
            title={
              isUpdatingBudget ? "Loading..." : editBudget ? "Submit" : "Edit"
            }
          />
          {editBudget && (
            <Button title={"Cancel"} onClick={() => setEditBudget(false)} />
          )}
        </form>
        <div className="flex justify-between gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700">
          <h2 className="flex items-center font-normal text-gray-500 dark:text-white">
            <b>Remaining: </b>
            {isLoadingExpenses ? <Spinner /> : Number(remaining ?? 0)}$
          </h2>
        </div>
        <div className="flex justify-between gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700">
          <h2 className="flex items-center font-normal text-gray-500 dark:text-white">
            <b>Spent so far: </b>
            {isLoadingExpenses ? <Spinner /> : Number(totalExpenses ?? 0)}$
          </h2>
        </div>
      </div>
      {shouldAlert && <Alert title="You have spent all of your budget!" />}
    </div>
  );
};

export default Plan;
