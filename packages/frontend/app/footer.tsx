import { Github } from "lucide-react";
import Link from "next/link";

import { FooterLinks, FooterLink } from "../lib/types/footer-link";

import { Separator } from "@/components/ui/separator";

export function Footer(): JSX.Element {
  // These should probably be retrieved automatically
  const links: FooterLinks = [
    { name: "Home", content: "Home", pageToNavigateTo: "/" },
    { name: "Register", content: "Register", pageToNavigateTo: "/register" },
    {
      name: "GitHub",
      content: <Github />,
      pageToNavigateTo: "https://github.com/cm-core-team/cm-core",
    },
  ];

  return (
    <div className="w-full h-[10vh] flex flex-col">
      <Separator />
      <div className="w-full h-full flex items-center justify-evenly">
        {links.map((footerLink: FooterLink, i: number) => {
          return (
            <Link
              key={i}
              href={footerLink.pageToNavigateTo}
              // Screen reader will read what this link does or where it goes to
              aria-label={footerLink.name}
            >
              {footerLink.content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
