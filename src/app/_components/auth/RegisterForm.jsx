"use client";

import { userRegister } from "@/app/_api";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import validator from "validator";

export default function RegisterForm() {
  const { push } = useRouter();

  const [form, setForm] = useState({
    email: { value: "", error: "" },
    password: { value: "", error: "" },
  });
  const [formError, setFormError] = useState("");

  const handleInputChange = (name, value) => {
    setFormError("");
    setForm((prevForm) => ({
      ...prevForm,
      [name]: { ...prevForm[name], value },
    }));
  };

  const validateForm = () => {
    setFormError("");
    const newForm = { ...form };
    let isValid = true;

    if (!newForm.email.value || !validator.isEmail(newForm.email.value)) {
      newForm.email.error = "Email is not valid";
      isValid = false;
    } else {
      newForm.email.error = "";
    }

    if (
      !newForm.password.value ||
      !validator.isStrongPassword(newForm.password.value)
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
      const res = await userRegister(form.email.value, form.password.value);
      push("/login");
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <main>
      <Input
        type="email"
        label="Email"
        value={form.email.value}
        onValueChange={(value) => handleInputChange("email", value)}
        isInvalid={!!form.email.error || !!formError}
        errorMessage={form.email.error}
      ></Input>
      <Input
        type="password"
        label="Password"
        value={form.password.value}
        onValueChange={(value) => handleInputChange("password", value)}
        isInvalid={!!form.password.error || !!formError}
        errorMessage={form.password.error}
      ></Input>
      <p>{formError}</p>
      <Button onClick={handleRegister}>Register</Button>
    </main>
  );
}
