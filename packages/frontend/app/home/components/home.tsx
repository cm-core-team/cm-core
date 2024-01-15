import FeatureItem from "@/components/feature-item";
import TextAnim from "@/components/text-animation";

export function Home() {
  // For now just using images from a random watchtower
  const features = [
    {
      label: "Display media for the meeting",
      imgUrl:
        "https://assetsnffrgf-a.akamaihd.net/assets/m/2023562/univ/art/2023562_univ_lsr_lg.jpg",
    },
    {
      label: "Manage meeting duties swiftly",
      imgUrl:
        "https://assetsnffrgf-a.akamaihd.net/assets/m/2023562/univ/art/2023562_univ_lsr_lg.jpg",
    },
    {
      label: "Arrange and distribute territory",
      imgUrl:
        "https://assetsnffrgf-a.akamaihd.net/assets/m/2023562/univ/art/2023562_univ_lsr_lg.jpg",
    },
    {
      label: "Co-ordinate public witnessing schedules",
      imgUrl:
        "https://assetsnffrgf-a.akamaihd.net/assets/m/2023562/univ/art/2023562_univ_lsr_lg.jpg",
    },
  ];

  return (
    <main className="flex flex-col items-center justify-between p-24 gap-y-12 text-center">
      <TextAnim />
      <div className="flex flex-col items-center gap-y-12">
        <h1 className="text-xl font-bold">Our features:</h1>
        <ul className="flex flex-col gap-y-12 px-12">
          {features.map((feature, i) => (
            <FeatureItem feature={feature} key={i} />
          ))}
        </ul>
      </div>
    </main>
  );
}
