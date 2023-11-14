"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import BlinkingCursor from "./blinking-cursor";

export default function TextAnim() {
  // The typing animation was copied from this article:
  // https://blog.noelcserepy.com/how-i-created-a-typing-text-animation-with-framer-motion
  const baseText = "For God is a God not of disorder but of peace.";
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween", // Not really needed because adding a duration will force "tween"
      duration: 1.2,
      ease: "easeInOut",
    });
    return controls.stop;
  }, [count]);

  return (
    <div className="flex flex-col">
      <span className="text-4xl">
        <motion.span>{displayText}</motion.span>
        <BlinkingCursor />
      </span>
      <motion.a
        href="https://wol.jw.org/en/wol/dx/r1/lp-e/1001070150/28803"
        target="_blank"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-left"
      >
        1 Corinthians 14:33
      </motion.a>
    </div>
  );
}
