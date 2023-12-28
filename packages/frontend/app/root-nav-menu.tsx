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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  NavbarMenuItem,
} from "@nextui-org/react";
import { ChevronDown, Github } from "lucide-react";

import { ModeToggle } from "../components/theme-mode-toggle";

import { DropdownToggle } from "@/components/dropdown-toggle";

export function RootNavMenu(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const mainItems = (
    <>
      <NavbarItem>
        <Link href="/register/user">Register</Link>
      </NavbarItem>

      <NavbarItem>
        <Link href="/login">Login</Link>
      </NavbarItem>

      <NavbarItem>
        <FeaturesDropdown />
      </NavbarItem>
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

function FeaturesDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);
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
    <Dropdown onOpenChange={setIsOpen}>
      <DropdownTrigger>
        <div>
          <DropdownToggle open={isOpen}>Features</DropdownToggle>
        </div>
      </DropdownTrigger>
      <DropdownMenu>
        {featuresMap.map((feature, i) => (
          <DropdownItem key={i}>
            <Link href={feature.path}>{feature.title}</Link>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
