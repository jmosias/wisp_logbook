"use client";

import { Switch } from "@nextui-org/react";
import { RiSunLine, RiMoonLine } from "@remixicon/react";
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
    <Switch
      onValueChange={switchTheme}
      size="lg"
      color="primary"
      startContent={<RiSunLine size="2rem" />}
      endContent={<RiMoonLine size="2rem" />}
    ></Switch>
  );
}
