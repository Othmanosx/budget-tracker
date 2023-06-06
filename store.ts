import { create } from "zustand";

interface GlobalState {
  budget: string;
  setBudget: (input: string) => void;
  editBudget: boolean;
  setEditBudget: (editBudget: boolean) => void;
}
interface NewExpenseState {
  name: string;
  setName: (name: string) => void;
  cost: string;
  setCost: (cost: string) => void;
}

interface ModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useGlobalStore = create<GlobalState>()((set) => ({
  budget: "0",
  editBudget: false,
  setEditBudget: (editBudget) =>
    set((state) => ({ ...state, editBudget: editBudget })),
  setBudget: (input) => set((state) => ({ ...state, budget: input })),
}));

export const useNewExpenseStore = create<NewExpenseState>()((set) => ({
  name: "",
  cost: "",
  setName: (name) => set((state) => ({ ...state, name })),
  setCost: (cost) => set((state) => ({ ...state, cost })),
}));

export const useModalStore = create<ModalState>()((set) => ({
  open: false,
  setOpen: (open) => set((state) => ({ ...state, open })),
}));
