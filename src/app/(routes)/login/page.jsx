import LoginForm from "@/app/_components/auth/LoginForm";

export default async function LoginPage() {
  return (
    <main className="h-screen p-8 flex flex-col gap-8 justify-center overflow-y-hidden">
      <h2 className="font-bold text-6xl">Let&apos;s sign you in</h2>
      <LoginForm />
    </main>
  );
}
