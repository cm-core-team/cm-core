import { Button } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import FeatureItem from "@/components/feature-item";
import TextAnim from "@/components/text-animation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// export function Home() {
//   // For now just using images from a random watchtower
//   const features = [
//     {
//       label: "Display media for the meeting",
//       imgUrl:
//         "https://assetsnffrgf-a.akamaihd.net/assets/m/2023562/univ/art/2023562_univ_lsr_lg.jpg",
//     },
//     {
//       label: "Manage meeting duties swiftly",
//       imgUrl:
//         "https://assetsnffrgf-a.akamaihd.net/assets/m/2023562/univ/art/2023562_univ_lsr_lg.jpg",
//     },
//     {
//       label: "Arrange and distribute territory",
//       imgUrl:
//         "https://assetsnffrgf-a.akamaihd.net/assets/m/2023562/univ/art/2023562_univ_lsr_lg.jpg",
//     },
//     {
//       label: "Co-ordinate public witnessing schedules",
//       imgUrl:
//         "https://assetsnffrgf-a.akamaihd.net/assets/m/2023562/univ/art/2023562_univ_lsr_lg.jpg",
//     },
//   ];

//   return (
//     <main className="flex flex-col items-center justify-between p-24 gap-y-12 text-center">
//       <TextAnim />
//       <div className="flex flex-col items-center gap-y-12">
//         <h1 className="text-xl font-bold">Our features:</h1>
//         <ul className="flex flex-col gap-y-12 px-12">
//           {features.map((feature, i) => (
//             <FeatureItem feature={feature} key={i} />
//           ))}
//         </ul>
//       </div>
//     </main>
//   );
// }

export function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-primary">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 space-x-24">
        <div className="flex flex-col justify-center space-y-10">
          <h1 className="text-5xl font-bold">
            Manage a congregation with ease.
          </h1>
          <p className="text-muted-foreground">
            Simplify organizational tasks with advanced digital solutions.
          </p>

          <Button
            variant="bordered"
            className="w-64 flex ml-auto"
            color="success"
          >
            <div className="flex gap-x-2 place-items-center hover:gap-x-6 transition-all duration-500">
              TAKE MY MONEY <ArrowRight />
            </div>
          </Button>
        </div>

        <Image
          width={2000}
          height={2000}
          src="/home-logo.avif"
          alt="Inspirational Visual"
          className="hidden ml-auto md:flex"
        />
      </div>
    </div>
  );
}
