"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import BlinkingCursor from "./blinking-cursor";

export default function TextAnim() {
  const baseText = "Manage a congregation with ease.";
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween", // Not really needed because adding a duration will force "tween"
      duration: 1,
      ease: "easeInOut",
    });
    return controls.stop;
  }, [count]);

  return (
    <span className="text-2xl">
      <motion.span>{displayText}</motion.span>
      <BlinkingCursor />
    </span>
  );
}
