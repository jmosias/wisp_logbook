"use client";

import { userRegister } from "@/app/_lib/api";
import { Link, Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import validator from "validator";
import LogoutButton from "./LogoutButton";

export default function RegisterForm() {
  const { push } = useRouter();

  const [form, setForm] = useState({
    organizationName: { value: "", error: "" },
    email: { value: "", error: "" },
    password: { value: "", error: "" },
  });
  const [formError, setFormError] = useState("");

  const handleInputChange = (name, value) => {
    setFormError("");
    setForm((prevForm) => ({
      ...prevForm,
      [name]: { ...prevForm[name], value, error: "" },
    }));
  };

  const validateForm = () => {
    setFormError("");
    const newForm = { ...form };
    let isValid = true;

    if (!newForm.organizationName.value) {
      newForm.organizationName.error = "Please add an organization name";
      isValid = false;
    } else {
      newForm.organizationName.error = "";
    }

    if (!newForm.email.value || !validator.isEmail(newForm.email.value)) {
      newForm.email.error = "Email is not valid";
      isValid = false;
    } else {
      newForm.email.error = "";
    }

    if (
      !newForm.password.value ||
      !validator.isStrongPassword(newForm.password.value, {
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      newForm.password.error = "Password is not strong enough";
      isValid = false;
    } else {
      newForm.password.error = "";
    }

    setForm(newForm);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await userRegister(
        form.organizationName.value,
        form.email.value,
        form.password.value
      );
      push("/login");
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          label="Organization Name"
          value={form.organizationName.value}
          onValueChange={(value) =>
            handleInputChange("organizationName", value)
          }
          isInvalid={!!form.organizationName.error || !!formError}
          errorMessage={form.organizationName.error}
          variant="bordered"
        ></Input>
        <Input
          type="email"
          label="Email"
          value={form.email.value}
          onValueChange={(value) => handleInputChange("email", value)}
          isInvalid={!!form.email.error || !!formError}
          errorMessage={form.email.error}
          variant="bordered"
        ></Input>
        <Input
          type="password"
          label="Password"
          value={form.password.value}
          onValueChange={(value) => handleInputChange("password", value)}
          isInvalid={!!form.password.error || !!formError}
          errorMessage={form.password.error}
          variant="bordered"
        ></Input>
        <p className="text-danger text-sm">{formError}</p>
      </div>
      <Button
        className="p-8 font-bold text-base"
        onClick={handleRegister}
        color="primary"
      >
        Register
      </Button>
      <Link className="underline self-center" href="/login" color="foreground">
        I already have an account
      </Link>
    </div>
  );
}
