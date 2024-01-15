import { Bug } from "lucide-react";
import Image from "next/image";

import { TeamMemberCard } from "./team-member-card";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AboutUs() {
  return (
    <article className="w-full text-center">
      <header className="relative w-full h-[200px]">
        <Image
          src="/about-us-header.jpg"
          alt="idek"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />

        <h1 className="w-full absolute top-1/2 bottom-1/2 m-auto font-bold text-4xl md:text-6xl select-none">
          About
        </h1>
      </header>
      <main>
        <section>
          <h2>Who we are</h2>
          <div className="w-full flex gap-2">
            <TeamMemberCard teamMember="Jude Davis" memberDesc="info" />
            <TeamMemberCard teamMember="Jonathan Koziel" memberDesc="info" />
          </div>
        </section>
        <section>
          <h2 className="text-4xl">What we are aiming to achieve</h2>
        </section>
        <section>
          <h2 className="text-4xl">What we are not trying to achieve</h2>
        </section>
      </main>
      <footer className="mx-3 flex flex-col gap-y-2 items-center md:gap-x-2 md:flex-row">
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>For queries contact us here:</CardTitle>
          </CardHeader>
        </Card>
        <Card className="w-1/2 text-left">
          <CardHeader>
            <CardTitle>
              <div className="flex gap-x-2">
                Found a bug? <Bug />
              </div>
            </CardTitle>
            <CardContent className="p-0">
              <p>
                Please file an issue in our{" "}
                <a
                  href="https://github.com/cm-core-team/cm-core/issues/new"
                  target="_blank"
                  rel="noreferrer"
                  className="underline font-bold"
                >
                  Github repo
                </a>
              </p>
            </CardContent>
          </CardHeader>
        </Card>
      </footer>
    </article>
  );
}
