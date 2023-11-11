"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./components/theme-mode-toggle";
import { Github } from "lucide-react";

export function RootNavMenu(): JSX.Element {
  return (
    <div className="h-5vh w-screen flex flex-col justify-center py-4">
      <div className="flex flex-row justify-between items-center px-8 py-4">
        <div>
          <a href="/" className="font-bold hover:underline">
            Congregation Manager
          </a>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <div className="flex items-center justify-between">
              <div className="flex flex-row gap-4 items-center">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="flex flex-col items-left justify-center w-44 gap-2 p-4">
                      <NavigationMenuLink className="p-2 rounded transition-[0.5s] hover:bg-slate-700">
                        Meeting Media
                      </NavigationMenuLink>
                      <NavigationMenuLink className="p-2 rounded transition-[0.5s] hover:bg-slate-700">
                        Meeting Duties
                      </NavigationMenuLink>
                      <NavigationMenuLink className="p-2 rounded transition-[0.5s] hover:bg-slate-700">
                        Territory
                      </NavigationMenuLink>
                      <NavigationMenuLink className="p-2 rounded transition-[0.5s] hover:bg-slate-700">
                        Public Witnessing
                      </NavigationMenuLink>
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
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <hr className="h-px w-full bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
}
