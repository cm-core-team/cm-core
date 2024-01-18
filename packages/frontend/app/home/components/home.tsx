"use client";

import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type FeatureItem = { title: string; description: string; color: string };

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus mauris a sapien commodo, quis rutrum magna tincidunt. Suspendisse tempus ut orci a efficitur. Proin vitae ante at ex sagittis gravida. Nullam semper nisl vel blandit fringilla. Donec suscipit enim tellus, ac dignissim lorem porttitor nec. Vestibulum convallis ut metus sed scelerisque. Cras id lacinia nibh, et tempus tortor. Integer porttitor lectus augue, ac eleifend metus luctus in. Morbi massa nisl, tristique eu consectetur a, blandit id augue. Nullam euismod tempor dui, vel faucibus massa. Donec iaculis semper felis vitae rhoncus. Donec rutrum ex vitae massa rhoncus congue. Quisque sem est, mattis eu massa at, malesuada commodo justo. Aliquam eget leo ut lorem posuere luctus tristique eu tortor.";

export function Home() {
  const renderFeature = (item: FeatureItem) => {
    return (
      <motion.div
        key={item.title}
        className="w-full place-items-center rounded-xl p-4 grid grid-cols-2 py-32 cursor-pointer"
        style={{ backgroundColor: item.color }}
        initial={{ opacity: 0.5 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>{item.title}</h1>
        <text>{item.description}</text>
      </motion.div>
    );
  };

  const featureData: FeatureItem[] = [
    {
      title: "Feature 1",
      description: loremIpsum,
      color: "#1E1762",
    },
    {
      title: "Feature 2",
      description: loremIpsum,
      color: "#0F222F",
    },
    {
      title: "Feature 3",
      description: loremIpsum,
      color: "#301236",
    },
  ];

  return (
    <div className="grid sm:p-4 text-primary space-y-16">
      <motion.div
        className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 space-x-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <motion.div
          className="flex flex-col justify-center space-y-10"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="sm:text-5xl text-4xl font-bold">
            Manage a congregation with ease.
          </h1>
          <p className="text-muted-foreground">
            Congregation Manager simplifies organizational tasks with advanced
            digital solutions.
          </p>

          <Button
            variant="bordered"
            className="sm:w-64 w-52 flex mr-auto"
            color="success"
          >
            <div className="flex gap-x-2 place-items-center hover:gap-x-6 transition-all duration-500">
              Get Started <ArrowRight />
            </div>
          </Button>
        </motion.div>

        <Image
          width={3000}
          height={3000}
          src="/home-logo.avif"
          alt="Inspirational Visual"
          className="hidden ml-auto md:flex"
        />
      </motion.div>

      {featureData.map((item) => renderFeature(item))}
    </div>
  );
}
