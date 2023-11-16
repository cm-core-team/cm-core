"use client";

import { Congregation } from "@/lib/types/congregation";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/react";

export interface MeetingCardProps {
  congregation: Congregation;
  isSelected: boolean;
  onSelect: () => void;
}

export function MeetingCard({
  congregation,
  isSelected,
  onSelect,
}: MeetingCardProps) {
  return (
    <Card>
      <CardHeader>
        <p>{congregation.name}</p>
      </CardHeader>
      <CardBody>
        <small>{congregation.address}</small>
      </CardBody>
      <CardFooter>
        {congregation.phoneNumbers[0].phone}
        <Button
          variant="ghost"
          color={isSelected ? "success" : "default"}
          className="flex ml-auto"
          onClick={onSelect}
        >
          Select
        </Button>
      </CardFooter>
    </Card>
  );
}
