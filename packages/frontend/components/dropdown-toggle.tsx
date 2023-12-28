import React from "react";

import { ChevronDownIcon } from "lucide-react";

interface DropdownToggleProps {
  open: boolean;
}

export function DropdownToggle({
  children,
  open,
}: React.PropsWithChildren<DropdownToggleProps>) {
  return (
    <div className="flex items-center gap-x-2 cursor-pointer">
      {children}
      <ChevronDownIcon
        className={`h-5 w-5 transition-transform duration-200 ${
          open ? "rotate-180" : ""
        }`}
      />
    </div>
  );
}
