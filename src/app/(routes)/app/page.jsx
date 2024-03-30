"use client";

import NavSelect from "@/app/_components/NavSelect";
import ProductList from "@/app/_components/product/ProductList";
import FloatingMenu from "@/app/_components/FloatingMenu";
import { Spinner } from "@nextui-org/react";
import { useCollections, useProductItems, useTemplates } from "@/app/_lib/api";

export default function App() {
  const { collections, isCollectionsLoading } = useCollections();
  const { templates, isTemplatesLoading } = useTemplates();
  const { productItems, isProductItemsLoading } = useProductItems();

  return (
    <>
      {isCollectionsLoading || isTemplatesLoading || isProductItemsLoading ? (
        <main className="h-screen flex justify-center items-center">
          <Spinner
            label={
              isCollectionsLoading
                ? "Organizing Collections"
                : "Transporting Products"
            }
          />
        </main>
      ) : (
        <main className="h-screen p-8 flex flex-col gap-8 overflow-y-hidden">
          <NavSelect collections={collections} />
          <ProductList productItems={productItems} templates={templates} />
          <FloatingMenu />
        </main>
      )}
    </>
  );
}
