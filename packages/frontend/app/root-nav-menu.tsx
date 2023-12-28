"use client";

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  NavbarBrand,
} from "@nextui-org/react";
import { Github } from "lucide-react";

import { ModeToggle } from "../components/theme-mode-toggle";

import { Button } from "@/components/ui/button";

export function RootNavMenu(): JSX.Element {
  const featuresMap = [
    {
      title: "Meeting Media",
      path: "",
    },
    {
      title: "Meeting Duties",
      path: "",
    },
    {
      title: "Territory",
      path: "",
    },
    {
      title: "Public Witnessing",
      path: "",
    },
  ];
  return (
    <div className="flex flex-col justify-center flex-grow-0 flex-shrink flex-basis-auto py-4">
      <div className="flex flex-row justify-between items-center px-8 py-4">
        <Navbar>
          <NavbarBrand>
            <a href="/" className="font-bold hover:underline">
              Congregation Manager
            </a>
          </NavbarBrand>
          <NavbarContent>
            <NavbarItem>
              <Link href="/register/user">Register</Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent>
            <NavbarItem>
              <Link href="/login">Login</Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent>
            <Dropdown>
              <NavbarItem>
                <DropdownTrigger>
                  <Button>Features</Button>
                </DropdownTrigger>
              </NavbarItem>

              <DropdownMenu className="bg-transparent">
                {featuresMap.map((feature, i) => (
                  <DropdownItem key={i}>
                    <Link className="w-full flex justify-start bg-transparent">
                      {feature.title}
                    </Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>

          <NavbarContent>
            <NavbarItem>
              <Link
                href="https://github.com/cm-core-team/cm-core"
                target="_blank"
              >
                <Github />
              </Link>
            </NavbarItem>
            <NavbarItem>
              <ModeToggle />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
      <hr className="h-px w-full bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
}
