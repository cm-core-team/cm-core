"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";

import StoreProvider from "./store-provider";

import { Toaster } from "@/components/ui/toaster";

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
