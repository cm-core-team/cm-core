"use client";

import React from "react";

export interface UseScreenWidthReturn {
  isSmall: boolean;
}

export function useScreenWidth(): UseScreenWidthReturn {
  // The value for tailwind's SM breakpoint
  const smallPx = 640;
  const [isSmall, setIsSmall] = React.useState(window.innerWidth < smallPx);

  React.useEffect(() => {
    // Called every resize
    const handleResize = () => setIsSmall(window.innerWidth < smallPx);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isSmall };
}
