"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "../_lib/store";
import { getUserInfo } from "../_api";

export default function ProductList() {
  const currentCollectionId = useAppStore((state) => state.currentCollectionId);
  const [info, setInfo] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getUserInfo();

      const { userInfo } = res;

      setInfo(userInfo.email);
    })();
  });

  return (
    <div>
      {currentCollectionId} email:{info}
    </div>
  );
}
