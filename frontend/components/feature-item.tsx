"use client";
import { motion } from "framer-motion";
import Image from "next/image";

function FeatureItem({
  feature,
}: {
  feature: { label: string; img_url: string };
}) {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="flex justify-between items-start gap-x-48 p-12"
    >
      <Image src={feature.img_url} alt="An image" width={500} height={500} />
      <h2 className="w-full text-left">{feature.label}</h2>
    </motion.li>
  );
}

export default FeatureItem;
