import { Button } from "@nextui-org/react";
import { RiAddLine } from "@remixicon/react";

export default function ProductItemAddButton() {
  return (
    <Button variant="faded" color="primary" startContent={<RiAddLine />}>
      Add a new product
    </Button>
  );
}
