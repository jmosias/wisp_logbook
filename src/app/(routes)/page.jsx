import { Button } from "@nextui-org/react";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";

export default async function Home() {
  return (
    <main className="h-screen px-4 py-8 flex flex-col justify-between overflow-y-hidden">
      <div className="h-full flex flex-col justify-center items-center text-center">
        <p className="pt-12 text-2xl">
          Welcome to <span className="font-bold">Wisp</span>
        </p>
        <h2 className="pb-32 font-bold text-6xl">Logbook</h2>
        <p className="text-2xl">Your assistant for streamlined image editing</p>
      </div>
      <Button
        className="p-8 font-bold text-base self-center"
        href="/register"
        as={Link}
        endContent={<RiArrowRightLine size="1.5rem" />}
        color="primary"
      >
        Get Started
      </Button>
    </main>
  );
}
