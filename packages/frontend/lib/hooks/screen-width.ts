import React from "react";

export interface UseScreenWidthReturn {
  isSmall: boolean;
}

export function useScreenWidth(): UseScreenWidthReturn {
  // The value for tailwind's SM breakpoint
  const smallPx = 640;
  const [isSmall, setIsSmall] = React.useState(false);

  React.useEffect(() => {
    // For the on page load
    const checkIfSmall = () => window.innerWidth < smallPx;
    setIsSmall(checkIfSmall());

    // Called every resize
    const handleResize = () => setIsSmall(checkIfSmall());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isSmall };
}
