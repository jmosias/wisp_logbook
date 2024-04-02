"use client";

import { useAppStore } from "../../_lib/store";
import ProductEditModeButton from "./ProductEditModeButton";
import ProductItemAddButton from "./ProductItemAddButton";
import ProductItem from "./ProductItem";

export default function ProductList({ productItems, templates }) {
  const currentCollectionId = useAppStore((state) => state.currentCollectionId);
  const isEditingProducts = useAppStore((state) => state.isEditingProducts);
  const currentTemplateId = useAppStore((state) => state.currentTemplateId);

  const filteredProductItems = productItems.filter(
    (item) => item.collectionId === currentCollectionId
  );

  const currentTemplate = templates.filter(
    (template) => template._id === currentTemplateId
  )[0];

  return (
    <div className="h-full p-2 flex flex-col gap-4 overflow-y-hidden">
      <div className="flex justify-between items-center">
        <h3 className="uppercase">Products</h3>
        <ProductEditModeButton />
      </div>

      <div className="h-full py-2 flex flex-col gap-8 overflow-y-auto">
        {currentCollectionId && filteredProductItems.length < 1 ? (
          <div className="text-center">This collection is empty</div>
        ) : (
          <div className="flex flex-col gap-8">
            {filteredProductItems.map((item) => (
              <ProductItem
                key={item._id}
                item={item}
                currentTemplate={currentTemplate}
              />
            ))}
          </div>
        )}

        {isEditingProducts && (
          <div className="self-center">
            <ProductItemAddButton
              currentTemplate={currentTemplate}
              productListLength={filteredProductItems.length}
            />
          </div>
        )}
      </div>
    </div>
  );
}
