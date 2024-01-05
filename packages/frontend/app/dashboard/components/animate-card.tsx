"use client";

import { motion } from "framer-motion";

const AnimateCard = ({
  children,
  delay = 0,
}: {
  children: JSX.Element;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 1.5, delay },
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateCard;
