"use client";

import { Button } from "@nextui-org/react";
import { RiCheckDoubleLine, RiEditLine } from "@remixicon/react";
import { useAppStore } from "../../_lib/store";
import { updateProductItems, useProductItems } from "@/app/_lib/api";

export default function ProductEditModeButton() {
  const updatedItems = useAppStore((state) => state.updatedItems);
  const isEditingProducts = useAppStore((state) => state.isEditingProducts);
  const setIsEditingProducts = useAppStore(
    (state) => state.setIsEditingProducts
  );
  const { isProductItemsLoading, mutateProductItems } = useProductItems();

  const editMode = () => {
    setIsEditingProducts(true);
  };

  const save = async () => {
    setIsEditingProducts(false);

    try {
      await updateProductItems(updatedItems);
      mutateProductItems();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      startContent={
        isEditingProducts ? (
          <RiCheckDoubleLine size="1rem" />
        ) : (
          <RiEditLine size="1rem" />
        )
      }
      variant="light"
      color="primary"
      onClick={isEditingProducts ? save : editMode}
    >
      {isEditingProducts ? <p>Save All</p> : <p>Edit</p>}
    </Button>
  );
}
