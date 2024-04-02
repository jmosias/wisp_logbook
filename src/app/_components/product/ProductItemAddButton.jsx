import { createProductItem, useProductItems } from "@/app/_lib/api";
import { useAppStore } from "@/app/_lib/store";
import { Button } from "@nextui-org/react";
import { RiAddLine } from "@remixicon/react";

export default function ProductItemAddButton({
  currentTemplate,
  productListLength,
}) {
  const currentCollectionId = useAppStore((state) => state.currentCollectionId);
  const currentCodePrefix = useAppStore((state) => state.currentCodePrefix);
  const { mutateProductItems } = useProductItems();

  const handleAddProduct = async () => {
    const details = {};
    currentTemplate.names.forEach((name) => {
      details[name] = "";
    });

    try {
      await createProductItem({
        details,
        collectionId: currentCollectionId,
        code: `${currentCodePrefix}${productListLength + 1}`,
      });
      mutateProductItems();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onPress={handleAddProduct}
      variant="faded"
      color="primary"
      startContent={<RiAddLine />}
    >
      Add a new product
    </Button>
  );
}
