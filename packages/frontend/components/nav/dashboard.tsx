"use client";

import React from "react";

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarBrand,
} from "@nextui-org/react";
import { Github } from "lucide-react";

import { ModeToggle } from "../theme-mode-toggle";

export function DashboardNavMenu(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const mainItems = (
    <>
      <NavbarItem>
        <Link>My Congregation</Link>
      </NavbarItem>

      <NavbarItem>
        <Link>Members</Link>
      </NavbarItem>

      <div className="flex justify-between w-16"></div>

      <NavbarItem>
        <Link href="https://github.com/cm-core-team/cm-core" target="_blank">
          <Github />
        </Link>
      </NavbarItem>
      <NavbarItem>
        <ModeToggle />
      </NavbarItem>
    </>
  );

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      <NavbarBrand>
        <a href="/" className="font-bold hover:underline">
          Congregation Manager
        </a>
      </NavbarBrand>

      <NavbarMenu>{mainItems}</NavbarMenu>

      <NavbarContent className="hidden sm:flex">{mainItems}</NavbarContent>
    </Navbar>
  );
}
