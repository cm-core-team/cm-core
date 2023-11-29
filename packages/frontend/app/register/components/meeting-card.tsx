"use client";

import { Congregation } from "@/lib/types/congregation";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";

export interface MeetingCardProps {
  congregation: Congregation;
  isSelected: boolean;
  onSelect: () => void;
  animationDelay: number;
}

export function MeetingCard({
  congregation,
  isSelected,
  onSelect,
  animationDelay,
}: MeetingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.5, delay: animationDelay / 4 },
      }}
    >
      <Card className="p-2">
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
    </motion.div>
  );
}
