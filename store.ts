import { create } from "zustand";

interface State {
  budget: string;
  setBudget: (input: string) => void;
  editBudget: boolean;
  setEditBudget: (editBudget: boolean) => void;
}

export const useGlobalStore = create<State>()((set) => ({
  budget: "0",
  editBudget: false,
  setEditBudget: (editBudget) =>
    set((state) => ({ ...state, editBudget: editBudget })),
  setBudget: (input) => set((state) => ({ ...state, budget: input })),
}));
