"use client";

import React from "react";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/home");
  }, [router]);

  return <></>;
}
