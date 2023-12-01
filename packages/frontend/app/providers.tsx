"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";

import StoreProvider from "./store-provider";

export function Providers({ children }: React.PropsWithChildren<{}>) {
  return (
    <StoreProvider>
      <NextUIProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </NextUIProvider>
    </StoreProvider>
  );
}
