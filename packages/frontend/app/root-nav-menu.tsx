"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "../components/theme-mode-toggle";
import { Github } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
    <div className="h-5vh flex flex-col justify-center py-4">
      <div className="flex flex-row justify-between items-center px-8 py-4">
        <div>
          <a href="/" className="font-bold hover:underline">
            Congregation Manager
          </a>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <div className="flex gap-x-4 items-center">
              <NavigationMenuItem>
                <Link href="/register" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Register
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-44 gap-2 p-2">
                    {featuresMap.map((feature, i) => (
                      <Link href={feature.path} key={i} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "w-full flex justify-start"
                          )}
                        >
                          {feature.title}
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="https://github.com/j-koziel/cong-manager"
                  target="_blank"
                >
                  <Github />
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <ModeToggle />
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <hr className="h-px w-full bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
}
