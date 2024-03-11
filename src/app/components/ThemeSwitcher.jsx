"use client";

import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // As per documentation, use useTheme only when the component is mounted
  // Read more about this here: https://www.npmjs.com/package/next-themes
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  let switchTheme = () =>
    theme === "dark" ? setTheme("light") : setTheme("dark");

  return (
    <Button onClick={switchTheme} color="primary" variant="flat">
      Switch
    </Button>
  );
}
