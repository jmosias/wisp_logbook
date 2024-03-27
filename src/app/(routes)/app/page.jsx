import NavBar from "@/app/_components/NavBar";
import ProductList from "@/app/_components/ProductList";
import FloatingMenu from "@/app/_components/FloatingMenu";

export default function App() {
  return (
    <main className="h-screen p-8 flex flex-col gap-8 overflow-y-hidden">
      <NavBar />
      <ProductList />
      <FloatingMenu />
    </main>
  );
}
