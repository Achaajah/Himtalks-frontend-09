"use client";

import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import ForumCard from "@/components/ForumCard";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import Link from "next/link";



/*  SLUG */
function slugify(text) {
  return text
    ?.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/*  TIME FORMAT */
function timeAgo(date) {
  if (!date) return "-";

  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((now - past) / 1000);

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);

  if (minutes < 1) return "Baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  return `${days} hari lalu`;
}

/*  FULL DUMMY DATA */
const dummyForums = [
  {
    id: 1,
    title: "Bagaimana cara menjaga kesehatan mental?",
    content:
      "Diskusi tentang pentingnya menjaga kesehatan mental di tengah kesibukan.",
    image: "/New folder/forum burung.svg",
    author: "Anonymous",
    created_at: new Date(Date.now() - 1000 * 60 * 5),
    comment_count: 12,
  },
  {
    id: 2,
    title: "Tips belajar efektif untuk mahasiswa",
    content: "Share cara belajar kalian biar ga burnout...",
    image: "/New folder/forum burung.svg",
    author: "Anon",
    created_at: new Date(Date.now() - 1000 * 60 * 30),
    comment_count: 5,
  },
  {
    id: 3,
    title: "Overthinking tiap malam, normal ga sih?",
    content: "Sering banget kepikiran hal-hal kecil sampe susah tidur...",
    image: "/New folder/forum burung.svg",
    author: "User123",
    created_at: new Date(Date.now() - 1000 * 60 * 60),
    comment_count: 8,
  },
  {
    id: 4,
    title: "Gimana cara konsisten ngoding?",
    content: "Udah niat tiap hari tapi suka males di tengah jalan 😭",
    image: "/New folder/forum burung.svg",
    author: "DevNewbie",
    created_at: new Date(Date.now() - 1000 * 60 * 120),
    comment_count: 3,
  },
  {
    id: 5,
    title: "Circle pertemanan makin kecil, wajar?",
    content: "Makin dewasa kok makin sedikit temen ya...",
    image: "/New folder/forum burung.svg",
    author: "Anon",
    created_at: new Date(Date.now() - 1000 * 60 * 240),
    comment_count: 10,
  },
  {
    id: 6,
    title: "Produktif tapi capek, solusi?",
    content: "Kerja terus tapi burnout juga 😩",
    image: "/New folder/forum burung.svg",
    author: "Worker",
    created_at: new Date(Date.now() - 1000 * 60 * 360),
    comment_count: 6,
  },
];

export default function MiniForum() {
  const router = useRouter();
  const [latest, setLatest] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //  FAKE LOADING (BIAR KAYAK ADA API)
    setTimeout(() => {
      const sorted = [...dummyForums].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setLatest(sorted[0]);
      setRecent(sorted.slice(1, 6)); // tetap 5 card
      setLoading(false);
    }, 1200); // delay 1.2 detik
  }, []);

  /*  LOADING (TETEP SAMA) */
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

  return (
    <main className="bg-[#F3EEE6] min-h-screen">

      {/* HERO */}
      <section className="text-center py-24 px-6">
        <h1 className="font-serif italic font-semibold text-5xl text-[#6B7C72] text-center">
          Every voice deserves to be 
          <br/>heard and understood
        </h1>

        <p className="text-gray-500 mb-8 text-[15px]">
          Let your thoughts find their place here
        </p>

        <Link href="/himtalks/mini-forum/browse-forum">
          <button className="bg-[#5E6F69] text-white px-7 py-3 rounded-full shadow-sm hover:opacity-90 transition">
            Start Discussion!
          </button>
        </Link>

        <div className="mt-14 flex justify-center">
          <Image
            src="/New folder/forum burung.svg"
            width={320}
            height={220}
            alt="birds"
          />
        </div>
      </section>

      {/* LATEST */}
<section className="max-w-5xl mt-20 mx-auto px-6 pb-16">

  <h2 className="text-[32px] italic font-playfair text-[#5E6F69] mb-10 text-center">
    Latest Discussion
  </h2>

  <Link 
  href="/himtalks/mini-forum/form-forum#comment"
 onClick={(e) => e.stopPropagation()}
  className="block"
>
    <div className="bg-white rounded-[24px] shadow-md p-6 md:p-8 hover:shadow-lg transition cursor-pointer">

      {/* IMAGE */}
      {latest.image && (
        <div className="relative w-full h-[240px] mb-5">
          <Image
            src={latest.image}
            alt="latest"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      )}

      {/* TITLE */}
      <h3 className="text-xl font-semibold mb-2">
        {latest.title}
      </h3>

      {/* CONTENT */}
      <p className="text-sm text-gray-500 mb-4">
        {latest.content}
      </p>

      {/* META */}
      <button>
      <span className="hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer">
        💬 {latest.comment_count} Komentar • {timeAgo(latest.created_at)}
      </span>
</button>
    </div>
  </Link>

</section>

      {/* RECENT */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <h2 className="text-[32px] italic font-playfair text-[#5E6F69] mb-10">
          Recent Discussions
        </h2>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1.2}
          grabCursor={true}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {recent.map((forum) => (
            <SwiperSlide key={forum.id}>
              <ForumCard forum={forum} />
            </SwiperSlide>
          ))}
        </Swiper>

      </section>

    </main>
  );
}