import { Krub } from "next/font/google";
import "../globals.css";
import UIProvider from "../_components/UIProvider";

const krub = Krub({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  weight: ["200", "400", "700"],
});

export const metadata = {
  title: "Wisp Logbook",
  description: "List collections of products to manipulate in Wisp later.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={krub.className}>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
