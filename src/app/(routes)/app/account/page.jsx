import LogoutButton from "@/app/_components/auth/LogoutButton";
import { Button, Input, Link } from "@nextui-org/react";
import { RiArrowLeftLine } from "@remixicon/react";

export default function AccountPage() {
  return (
    <main className="h-screen p-8 flex flex-col gap-8 overflow-y-hidden">
      <div className="py-2">
        <Button
          className="fixed top-8 left-8"
          isIconOnly
          as={Link}
          href="/app"
          variant="light"
        >
          <RiArrowLeftLine size="1.5rem" />
        </Button>
        <h2 className="text-center uppercase">Account</h2>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm uppercase">Change Password</h3>
        <Input type="password" label="Old Password" variant="bordered"></Input>
        <Input type="password" label="New Password" variant="bordered"></Input>
      </div>
      <LogoutButton />
    </main>
  );
}
