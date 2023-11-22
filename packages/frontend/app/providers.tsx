"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: React.PropsWithChildren<{}>) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
