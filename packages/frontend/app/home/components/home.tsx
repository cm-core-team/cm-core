import { Button } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center sm:p-4 text-primary">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 space-x-24">
        <div className="flex flex-col justify-center space-y-10">
          <h1 className="sm:text-5xl text-4xl font-bold">
            Manage a congregation with ease.
          </h1>
          <p className="text-muted-foreground">
            Simplify organizational tasks with advanced digital solutions.
          </p>

          <Button
            variant="bordered"
            className="sm:w-64 w-52 flex mr-auto"
            color="success"
          >
            <div className="flex gap-x-2 place-items-center hover:gap-x-6 transition-all duration-500">
              TAKE MY MONEY <ArrowRight />
            </div>
          </Button>
        </div>

        <Image
          width={2000}
          height={2000}
          src="/home-logo.avif"
          alt="Inspirational Visual"
          className="hidden ml-auto md:flex"
        />
      </div>
    </div>
  );
}
