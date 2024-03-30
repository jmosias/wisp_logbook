"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAppStore } from "../_lib/store";

export default function NavSelect({ collections }) {
  const lastItem = collections[collections.length - 1];
  const [currentCollection, setCurrentCollection] = useState(lastItem);
  const [value, setValue] = useState(currentCollection._id);
  const setCollectionId = useAppStore((state) => state.setCurrentCollectionId);
  const setTemplateId = useAppStore((state) => state.setCurrentTemplateId);
  const setCodePrefix = useAppStore((state) => state.setCurrentCodePrefix);

  const handleSelectionChange = (e) => {
    setValue(e.target.value);
    setCurrentCollection(
      collections.find((collection) => collection._id === e.target.value)
    );
  };

  useEffect(() => {
    setCollectionId(currentCollection._id);
    setTemplateId(currentCollection.templateId);
    setCodePrefix(currentCollection.codePrefix);
  }, [currentCollection, setCollectionId, setTemplateId, setCodePrefix]);

  return (
    <Select
      isRequired
      aria-label="Current Collection"
      selectedKeys={[value]}
      onChange={handleSelectionChange}
      disallowEmptySelection
      classNames={{
        value: "text-lg",
      }}
      variant="bordered"
    >
      {collections.map((collection) => (
        <SelectItem key={collection._id} value={collection._id}>
          {collection.name}
        </SelectItem>
      ))}
    </Select>
  );
}
