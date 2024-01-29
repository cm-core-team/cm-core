"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { RootNavMenu } from "../../components/nav/root";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <section>
      <RootNavMenu />
      {children}
    </section>
  );
}
