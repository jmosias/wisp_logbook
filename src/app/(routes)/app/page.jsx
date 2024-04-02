"use client";

import NavSelect from "@/app/_components/NavSelect";
import ProductList from "@/app/_components/product/ProductList";
import FloatingMenu from "@/app/_components/FloatingMenu";
import { Button, Spinner, useDisclosure } from "@nextui-org/react";
import { useCollections, useProductItems, useTemplates } from "@/app/_lib/api";
import ModalCreateCollections from "@/app/_components/collections/ModalCreateCollections";
import { RiAddLargeLine } from "@remixicon/react";

export default function App() {
  const { collections, isCollectionsLoading } = useCollections();
  const { templates, isTemplatesLoading } = useTemplates();
  const { productItems, isProductItemsLoading } = useProductItems();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <div className="flex gap-2 justify-evenly items-center">
            <NavSelect className="flex-4" collections={collections} />
            <Button
              className="flex-2 h-full"
              onPress={onOpen}
              isIconOnly
              variant="light"
              color="primary"
            >
              <RiAddLargeLine />
            </Button>
          </div>
          <ProductList productItems={productItems} templates={templates} />
          <FloatingMenu />
          <ModalCreateCollections
            isOpen={isOpen}
            onClose={onClose}
            templates={templates}
          />
        </main>
      )}
    </>
  );
}
