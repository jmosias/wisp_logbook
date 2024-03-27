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
