"use client";

import { Button } from "@nextui-org/react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Headphones, Palette } from "lucide-react";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureItem, featureData } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Home() {
  const renderFeature = (item: FeatureItem, i: number) => {
    return (
      <motion.div
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid place-items-center my-8 text-primary"
      >
        <Card
          className={cn(
            "w-2/3 place-items-center rounded-xl p-0 sm:p-4 md:px-16 grid md:grid-rows-1 grid-cols-1 grid-rows-1 cursor-pointer shadow-xl shadow-gray-800 sm:text-sm text-xs",
            `bg-${item.color}`,
          )}
        >
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>{item.description}</CardContent>
        </Card>
      </motion.div>
    );
  };

  const renderIntroHeader = () => {
    return (
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 space-x-24 place-items-center h-[70vh]">
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
          src="/home-logo.png"
          alt="Inspirational Visual"
          className="hidden ml-auto md:flex"
        />
      </div>
    );
  };

  const renderOurApproachSection = () => {
    return (
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 p-8 select-none sm:text-md text-sm">
        <div className="flex flex-col items-center justify-center">
          <Palette className="h-12 w-10 mb-4" />
          <h3 className="text-lg font-semibold">Innovative Design</h3>
          <p className="text-center">
            We focus on intuitive and user-friendly design to enhance user
            experience.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Cpu className="h-12 w-10 mb-4" />
          <h3 className="text-lg font-semibold">Cutting-Edge Technology</h3>
          <p className="text-center">
            Utilizing the latest technologies to deliver high-quality solutions.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Headphones className="h-12 w-10 mb-4" />
          <h3 className="text-lg font-semibold">Exceptional Support</h3>
          <p className="text-center">
            Dedicated support team to ensure seamless operation and user
            satisfaction.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="grid sm:p-4 text-primary space-y-8 h-[80vh] scroll-smooth">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
        style={{
          backgroundImage:
            "url(https://railway.app/illustrations/computer-city-lines--dark.svg)",
        }}
      >
        <Parallax pages={featureData.length + 2}>
          <ParallaxLayer offset={0}>{renderIntroHeader()}</ParallaxLayer>
          <ParallaxLayer offset={1} speed={0.5}>
            {renderOurApproachSection()}
          </ParallaxLayer>
          {featureData.map((item, i) => (
            <ParallaxLayer key={item.description} offset={i + 2} speed={0.5}>
              {renderFeature(item, i)}
            </ParallaxLayer>
          ))}
        </Parallax>
      </motion.div>
    </div>
  );
}
