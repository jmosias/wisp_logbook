"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

export default function NavSelect({ collections }) {
  const lastItemId = collections[collections.length - 1]._id;
  const [value, setValue] = useState([lastItemId]);

  return (
    <Select
      isRequired
      aria-label="Collection"
      selectedKeys={value}
      onSelectionChange={setValue}
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
