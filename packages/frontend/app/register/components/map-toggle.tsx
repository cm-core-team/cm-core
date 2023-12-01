import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DynamicMapView = dynamic(
  () => import("./map-view").then((mod) => mod.MapView),
  { ssr: false },
);

export function MapToggle() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Show Map</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[90vw]">
        <DynamicMapView />
      </PopoverContent>
    </Popover>
  );
}
