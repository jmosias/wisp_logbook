import NavBar from "@/app/_components/NavBar";
import ProductList from "@/app/_components/ProductList";
import LogoutButton from "@/app/_components/auth/LogoutButton";

export default function App() {
  return (
    <main>
      <NavBar />
      <ProductList />
      <LogoutButton></LogoutButton>
    </main>
  );
}
