
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function SongfessHero() {
  return (
    <section className="pt-[120px] pb-24 px-6 bg-[#EFE9DF] text-center">

      {/* TITLE */}
      <h1 className={`${playfair.className} italic text-[#5E6F69] text-3xl md:text-5xl lg:text-6xl max-w-4xl mx-auto leading-tight`}>
        Even the toughest feelings can be shared in
        <br />
        unique and meaningful ways.
      </h1>

      {/* SUBTITLE */}
      <p className="text-[#6B7F77] mt-6 text-sm md:text-base">
        Let the song speak the words you can't say.
      </p>

      {/* ILLUSTRATION */}
      <div className="flex justify-center mt-12">
        <Image
          src="/songfess/burung nyanyi.svg"
          width={420}
          height={420}
          alt="songfess illustration"
          className="w-[260px] md:w-[340px] lg:w-[420px]"
          priority
        />
      </div>

    </section>
  );
}