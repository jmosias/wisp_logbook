import LoginForm from "@/app/_components/auth/LoginForm";

export default async function LoginPage() {
  return (
    <div className="m-4">
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
}
