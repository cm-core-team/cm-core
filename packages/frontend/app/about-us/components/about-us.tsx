import { Bug, Mails, Phone } from "lucide-react";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ArticleSection } from "./article-section";

export function AboutUs() {
  return (
    <article className="w-full text-center">
      <header className="relative w-full h-[200px]">
        <Image
          src="/about-us-header.jpg"
          alt="idek"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <h1 className="w-full absolute top-1/2 bottom-1/2 m-auto font-bold text-4xl md:text-6xl select-none">
          About
        </h1>
      </header>
      <main>
        {/* Need to have a think about what to write in these sections */}
        {/* I just put lorem ipsum in here for now for proof of concept */}
        <ArticleSection
          sectionHeading="What we are aiming to achieve"
          sectionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus
            mauris a sapien commodo, quis rutrum magna tincidunt. Suspendisse
            tempus ut orci a efficitur. Proin vitae ante at ex sagittis gravida.
            Nullam semper nisl vel blandit fringilla. Donec suscipit enim
            tellus, ac dignissim lorem porttitor nec. Vestibulum convallis ut
            metus sed scelerisque. Cras id lacinia nibh, et tempus tortor.
            Integer porttitor lectus augue, ac eleifend metus luctus in. Morbi
            massa nisl, tristique eu consectetur a, blandit id augue. Nullam
            euismod tempor dui, vel faucibus massa. Donec iaculis semper felis
            vitae rhoncus. Donec rutrum ex vitae massa rhoncus congue. Quisque
            sem est, mattis eu massa at, malesuada commodo justo. Aliquam eget
            leo ut lorem posuere luctus tristique eu tortor."
        />
        <ArticleSection
          sectionHeading="What we are not trying to achieve"
          sectionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus
            mauris a sapien commodo, quis rutrum magna tincidunt. Suspendisse
            tempus ut orci a efficitur. Proin vitae ante at ex sagittis gravida.
            Nullam semper nisl vel blandit fringilla. Donec suscipit enim
            tellus, ac dignissim lorem porttitor nec. Vestibulum convallis ut
            metus sed scelerisque. Cras id lacinia nibh, et tempus tortor.
            Integer porttitor lectus augue, ac eleifend metus luctus in. Morbi
            massa nisl, tristique eu consectetur a, blandit id augue. Nullam
            euismod tempor dui, vel faucibus massa. Donec iaculis semper felis
            vitae rhoncus. Donec rutrum ex vitae massa rhoncus congue. Quisque
            sem est, mattis eu massa at, malesuada commodo justo. Aliquam eget
            leo ut lorem posuere luctus tristique eu tortor."
        />
      </main>
      <footer className="mx-3 mt-4 flex flex-col gap-y-2 items-center justify-center md:gap-x-2">
        <Card className="w-1/4 flex-col">
          <CardHeader>
            <CardTitle>For queries contact us here:</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-evenly">
            <div className="flex gap-x-2 justify-center">
              <Mails />
              <a
                href="mailto:example@gmail.com"
                className="font-bold underline"
              >
                example@gmail.com
              </a>
            </div>
            <div className="flex gap-x-2 justify-center">
              <Phone />
              <span className="font-bold underline">07777777777</span>
            </div>
          </CardContent>
        </Card>
        <Card className="w-1/4 text-left">
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
