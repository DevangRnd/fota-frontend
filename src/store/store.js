import { create } from "zustand";
const useStore = create((set) => ({
  loading: false,
  error: null,
}));
export default useStore;
