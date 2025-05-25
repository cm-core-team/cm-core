"use client";

import { NextUIProvider } from "@nextui-org/react";

import StoreProvider from "./store-provider";
import { ThemeProvider } from "./theme-provider";

import { Toaster } from "@/components/ui/sonner";

/**
 * All the different providers that are being used for dark mode,
 * theming and redux
 *
 * @param children The rest of the site to be rendered
 * @returns
 */
export function Providers({ children }: React.PropsWithChildren<{}>) {
  return (
    <StoreProvider>
      <NextUIProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </NextUIProvider>
    </StoreProvider>
  );
}
