"use client";

import { useEffect, useState } from "react";
import { getAllProductCollections } from "../_lib/api";
import NavSelect from "./NavSelect";

export default function NavBar() {
  const [collections, setCollections] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await getAllProductCollections();
      setCollections(res);
    })();
  }, []);

  return (
    <div>{collections !== null && <NavSelect collections={collections} />}</div>
  );
}
