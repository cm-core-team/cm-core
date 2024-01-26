"use client";

import React from "react";

import { Button } from "@nextui-org/react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { NumberLabel } from "@/components/number-label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureItem, featureData } from "@/lib/config";

export function Home() {
  const router = useRouter();
  const [parallaxPages, setParallaxPages] = React.useState(3);

  const renderFeature = (item: FeatureItem) => {
    return (
      <div
        onClick={() => router.push(item.href)}
        className="grid place-items-center"
      >
        <Card
          style={{ backgroundColor: item.color }}
          className="w-2/3 place-items-center rounded-xl p-4 md:px-16 grid md:grid-rows-1 grid-cols-1 grid-rows-2 cursor-pointer shadow-xl shadow-gray-800"
        >
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>{item.description}</CardContent>
        </Card>
      </div>
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

  React.useEffect(() => {
    const footerHeight = 100;
    setParallaxPages(
      featureData.length + 1 - footerHeight / window.innerHeight,
    );
  }, []);

  return (
    <div className="grid sm:p-4 text-primary space-y-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "url(https://railway.app/illustrations/computer-city-lines--dark.svg)",
        }}
      >
        <Parallax pages={parallaxPages} key={`Parallax-${parallaxPages}`}>
          <ParallaxLayer offset={0}>{renderIntroHeader()}</ParallaxLayer>
          {featureData.map((item, i) => (
            <ParallaxLayer key={item.description} offset={i + 1} speed={0.5}>
              <center>
                <NumberLabel i={i + 1} />
              </center>

              {renderFeature(item)}
            </ParallaxLayer>
          ))}
        </Parallax>
      </motion.div>
    </div>
  );
}
