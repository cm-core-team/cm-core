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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export function RootNavMenu(): JSX.Element {
  return (
    <div className="m-4 flex flex-row justify-end">
      <NavigationMenu>
        <NavigationMenuList>
          <div className="flex flex-row gap-2 items-center justify-center">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex flex-col items-center justify-center w-32 gap-2 p-4">
                  <NavigationMenuLink className="p-2 rounded transition-[0.5s] hover:bg-slate-700">
                    Feature 1
                  </NavigationMenuLink>
                  <NavigationMenuLink className="p-2 rounded transition-[0.5s] hover:bg-slate-700">
                    Feature 2
                  </NavigationMenuLink>
                  <NavigationMenuLink className="p-2 rounded transition-[0.5s] hover:bg-slate-700">
                    Feature 3
                  </NavigationMenuLink>
                  <NavigationMenuLink className="p-2 rounded transition-[0.5s] hover:bg-slate-700">
                    Feature 4
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ModeToggle />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="https://github.com/j-koziel/cong-manager"
                target="_blank"
                className="p-2 rounded transition-[0.5s] hover:bg-slate-700"
              >
                <FontAwesomeIcon icon={faGithub} size="xl" />
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
