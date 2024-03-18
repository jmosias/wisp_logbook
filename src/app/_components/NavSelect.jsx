"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { useAppStore } from "../_lib/store";

export default function NavSelect({ collections }) {
  const lastItemId = collections[collections.length - 1]._id;
  const [value, setValue] = useState(lastItemId);
  const setCollectionId = useAppStore((state) => state.setCurrentCollectionId);

  const handleSelectionChange = (e) => {
    setValue(e.target.value);
    setCollectionId(value);
  };

  return (
    <Select
      isRequired
      aria-label="Collection"
      selectedKeys={[value]}
      onChange={handleSelectionChange}
      disallowEmptySelection
      classNames={{
        value: "uppercase text-lg",
        listbox: "uppercase",
      }}
    >
      {collections.map((collection) => (
        <SelectItem key={collection._id} value={collection.collectionPrefix}>
          {`Collection ${collection.collectionPrefix}`}
        </SelectItem>
      ))}
    </Select>
  );
}
