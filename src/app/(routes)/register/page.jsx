import RegisterForm from "@/app/_components/auth/RegisterForm";

export default async function RegisterPage() {
  return (
    <main className="h-screen p-8 flex flex-col gap-8 justify-center overflow-y-hidden">
      <h2 className="font-bold text-6xl">Create your account</h2>
      <RegisterForm />
    </main>
  );
}
