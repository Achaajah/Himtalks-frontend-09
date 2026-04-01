"use client"; // 🔥 tambahan

import Link from "next/link";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { Poppins } from "next/font/google";
import { useState, useEffect } from "react"; // 🔥 tambahan

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Hero() {

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

  // ================= KODE LU (TIDAK DIUBAH) =================

  return (
    <section className="pt-[130px] pb-32 px-6 sm:px-16 md:px-12 lg:px-28 bg-[#F5F1E8] text-[#3F4F44] transition-all duration-500">

      {/* Title */}
      <h1
        className="
font-serif italic font-semibold text-5xl text-[#6B7C72] text-center
        "
      >
        HIMTALKS
      </h1>

      <div className="w-full flex flex-col lg:flex-col-reverse items-center text-center">

        {/* Illustration */}
        <div className="flex justify-center">
          <Image
            src="/himtalks/illustrasion-hero.svg"
            width={500}
            height={429}
            alt="illustration"
            className="w-80 h-56 md:w-96 md:h-80 lg:w-[500px] lg:h-[380px] select-none"
          />
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base leading-7 mt-8 max-w-xl text-center">
          Sampaikan kritik, saran, atau cerita anonimmu, dan ekspresikan
          perasaanmu melalui fitur songfess. Yuk, mulai berbagi dan
          berkomunikasi bersama kami!
        </p>

        {/* Button */}
        <div className="mt-8">
          <Link
            href="/himtalks/songfess"
            className={`${poppins.className} inline-block bg-[#7A918D] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#667b77] transition`}
          >
            Start Now
          </Link>
        </div>

      </div>
    </section>
  );
}