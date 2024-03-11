import { getAllProductCollections } from "../api";
import NavSelect from "./NavSelect";

export default async function NavBar() {
  const collections = await getAllProductCollections();

  return (
    <div className="m-4">
      <NavSelect collections={collections} />
    </div>
  );
}
