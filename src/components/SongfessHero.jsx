"use client"; // 🔥 wajib kalau mau pakai useState/useEffect

import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { useState, useEffect } from "react"; // 🔥 tambahan

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function SongfessHero() {

  // 🔥 LOADING
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // 🔥 LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3EEE6]">
        
        <Image
          src="/New folder/burung-mikir.svg"
          width={200}
          height={200}
          alt="loading"
          className="mb-4 animate-bounce"
        />

        <div className="w-10 h-10 border-4 border-[#5E6F69] border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-4 text-[#5E6F69] text-sm">
          Menyiapkan diskusi...
        </p>

      </div>
    );
  }

  // ================= KODE LU (UTUH) =================

  return (
    <section className="pt-[120px] pb-24 px-6 bg-[#EFE9DF] text-center">

      {/* TITLE */}
      <h1 className="font-serif italic font-semibold text-5xl text-[#6B7C72] text-center">
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