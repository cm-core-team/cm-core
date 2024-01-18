"use client";

import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { NumberLabel } from "@/components/number-label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

type FeatureItem = {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  href: string;
};

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus mauris a sapien commodo, quis rutrum magna tincidunt. Suspendisse tempus ut orci a efficitur. Proin vitae ante at ex sagittis gravida. Nullam semper nisl vel blandit fringilla. Donec suscipit enim tellus, ac dignissim lorem porttitor nec. Vestibulum convallis ut metus sed scelerisque. Cras id lacinia nibh, et tempus tortor. Integer porttitor lectus augue, ac eleifend metus luctus in. Morbi massa nisl, tristique eu consectetur a, blandit id augue. Nullam euismod tempor dui, vel faucibus massa. Donec iaculis semper felis vitae rhoncus. Donec rutrum ex vitae massa rhoncus congue. Quisque sem est, mattis eu massa at, malesuada commodo justo. Aliquam eget leo ut lorem posuere luctus tristique eu tortor.";

export function Home() {
  const router = useRouter();
  const renderFeature = (item: FeatureItem) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => router.push(item.href)}
        className="grid place-items-center"
      >
        <Card
          style={{ backgroundColor: item.color }}
          className="w-2/3 place-items-center rounded-xl p-4 md:px-16 grid md:grid-rows-1 grid-cols-1 grid-rows-2 md:py-16 cursor-pointer shadow-xl shadow-gray-800"
        >
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>{item.description}</CardContent>
        </Card>
      </motion.div>
    );
  };

  const featureData: FeatureItem[] = [
    {
      title: "Feature 1",
      subtitle: "Manage at light speed.",
      description: loremIpsum,
      color: "#1E1762",
      href: "#",
    },
    {
      title: "Feature 2",
      subtitle: "Seamless event and member coordination.",
      description: loremIpsum,
      color: "#0F222F",
      href: "#",
    },
    {
      title: "Feature 3",
      subtitle: "Empower collaboration and communication.",
      description: loremIpsum,
      color: "#301236",
      href: "#",
    },
  ];

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
          src="/home-logo.avif"
          alt="Inspirational Visual"
          className="hidden ml-auto md:flex"
        />
      </div>
    );
  };

  return (
    <div className="grid sm:p-4 text-primary space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "url(https://railway.app/illustrations/computer-city-lines--dark.svg)",
        }}
      >
        {renderIntroHeader()}

        <div className="space-y-32">
          {featureData.map((item, i) => (
            <div key={item.description}>
              <center>
                <NumberLabel i={i + 1} />
              </center>

              {renderFeature(item)}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
