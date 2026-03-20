import Image from "next/image";
import PodcastHero from "@/components/PodcastHero";
import GetKnowPodcast from "@/components/GetKnowPodcast";
import PodcastHome from "@/components/PodcastHome";

export default function Home() {
  return (
    <>
      <PodcastHero />
      <GetKnowPodcast />
      {/* <BannerPodcast /> */}
      <PodcastHome heading="" />
    </>
  );
}
