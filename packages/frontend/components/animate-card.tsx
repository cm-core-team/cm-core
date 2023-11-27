"use client";
import { motion } from "framer-motion";

const AnimateCard = ({ children }: { children: JSX.Element }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.5 } }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateCard;
