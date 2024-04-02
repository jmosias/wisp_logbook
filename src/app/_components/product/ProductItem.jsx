import { useAppStore } from "@/app/_lib/store";
import { Input } from "@nextui-org/react";
import { useState } from "react";

export default function ProductItem({ item, currentTemplate }) {
  const [details, setDetails] = useState(item.details);
  const [productCode, setProductCode] = useState(item.code);
  const isEditingProducts = useAppStore((state) => state.isEditingProducts);
  const addUpdatedItem = useAppStore((state) => state.addUpdatedItem);

  const handleInputChange = (name, newValue) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: newValue,
    }));
    addUpdatedItem(item._id, {
      ...item,
      details: { ...details, [name]: newValue },
    });
  };

  const handleCodeChange = (newCode) => {
    setProductCode(newCode);
    addUpdatedItem(item._id, {
      ...item,
      code: newCode,
    });
  };

  return (
    <div className="flex gap-8">
      <div className="flex flex-col flex-1 text-sm">
        {isEditingProducts ? (
          <Input
            label="Code"
            variant="bordered"
            value={productCode}
            onValueChange={handleCodeChange}
          ></Input>
        ) : (
          <p className="font-bold">{item.code}</p>
        )}
      </div>
      <div className="flex flex-col gap-4 flex-4 ">
        {isEditingProducts ? (
          <>
            {currentTemplate.names &&
              currentTemplate.names.map((name, index) => (
                <Input
                  key={`${name} ${index}`}
                  label={name}
                  variant="bordered"
                  value={details[name]}
                  onValueChange={(value) => handleInputChange(name, value)}
                ></Input>
              ))}
          </>
        ) : (
          <>
            {currentTemplate.names &&
              currentTemplate.names.map((name, index) => (
                <div
                  className="flex gap-4 items-center border-b border-solid border-default-200 pb-2"
                  key={`${name} ${index}`}
                >
                  <p className="flex-1 text-sm font-bold">{name}</p>
                  <p className="flex-2 text-sm">{item.details[name]}</p>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}
