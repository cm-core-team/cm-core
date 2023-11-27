"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RootState } from "@/lib/stores/store";
import { useSelector } from "react-redux";

export function PhoneNumberCheck() {
  const selectedCongregation = useSelector(
    (state: RootState) => state.localMeetings.selectedCongregation
  );

  return (
    <div className="flex justify-center mx-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Select your congregation phone number
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {selectedCongregation?.phoneNumbers.map((phoneNumber, i) => (
            <DropdownMenuItem key={i}>{phoneNumber.phone}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
