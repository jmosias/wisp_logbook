const { create } = require("zustand");

export const useAppStore = create((set) => ({
  currentCollectionId: "",
  setCurrentCollectionId: (newId) => set({ currentCollectionId: newId }),
}));
