const { create } = require("zustand");

export const useAppStore = create((set) => ({
  // collections
  currentCollectionId: "",
  setCurrentCollectionId: (newId) => set({ currentCollectionId: newId }),
  currentCodePrefix: "",
  setCurrentCodePrefix: (newPrefix) => set({ currentCodePrefix: newPrefix }),

  // templates
  currentTemplateId: "",
  setCurrentTemplateId: (newId) => set({ currentTemplateId: newId }),

  // items
  isEditingProducts: false,
  setIsEditingProducts: (boolean) => set({ isEditingProducts: boolean }),
  updatedItems: [],
  addUpdatedItem: (id, updatedItem) =>
    set((state) => {
      const index = state.updatedItems.findIndex((item) => item._id === id);
      if (index !== -1) {
        const updatedItems = [...state.updatedItems];
        updatedItems[index] = updatedItem;
        return { updatedItems };
      } else {
        return { updatedItems: [...state.updatedItems, updatedItem] };
      }
    }),
}));
