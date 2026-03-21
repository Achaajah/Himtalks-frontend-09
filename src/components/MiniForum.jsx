"use client";

import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ForumCard from "@/components/ForumCard";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import Link from "next/link";

const API_BASE = "http://localhost:8080";

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

export default function MiniForum() {
  const [latest, setLatest] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getForums() {
      try {
        const res = await fetch(`${API_BASE}/forums`);
        if (!res.ok) throw new Error("Gagal fetch");

        const data = await res.json();

        const sorted = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setLatest(sorted[0] || null);
        setRecent(sorted.slice(1, 10));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getForums();
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Loading forum...</p>;
  }

  return (
    <main className="bg-[#F3EEE6] min-h-screen">

      {/* 🔥 HERO */}
      <section className="text-center py-24 px-6">

        <h1 className="
          max-w-3xl mx-auto
          font-playfair
          font-semibold
          italic
          text-[52px]
          leading-[120%]
          tracking-[-0.02em]
          text-[#5E6F69]
          mb-5
        ">
          Every voice deserves to be heard and understood
        </h1>

        <p className="text-gray-500 mb-8 text-[15px]">
          Let your thoughts find their place here
        </p>

        <button className="bg-[#5E6F69] text-white px-7 py-3 rounded-full shadow-sm hover:opacity-90 transition">
          Start Discussion!
        </button>

        {/* 🔥 IMAGE + SHAPE */}
        <div className="mt-14 flex justify-center relative">
          <div className="absolute w-[320px] h-[220px] bg-[#7C948A] rounded-full opacity-80 blur-sm"></div>

          <Image
            src="/birds.png"
            width={320}
            height={220}
            alt="birds"
            className="relative z-10"
          />
        </div>

      </section>

      {/* 🔥 LATEST DISCUSSION */}
      {latest && (
        <section className="max-w-5xl mt-32 mx-auto px-6 pb-16">

          <h2 className="text-[32px] italic font-playfair text-[#5E6F69] mb-10 text-center">
            Latest Discussion
          </h2>

          <Link href={`/himtalks/mini-forum/${latest.id}`}>
            <div className="bg-white rounded-[20px] shadow-md p-8 hover:shadow-lg transition cursor-pointer">

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                Himtalks • {timeAgo(latest.created_at)}
              </div>

              <h3 className="text-xl font-semibold text-[#2f3e39] mb-2">
                {latest.title}
              </h3>

              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {latest.content}
              </p>

              {latest.image && (
                <Image
                  src={latest.image}
                  width={800}
                  height={400}
                  className="rounded-2xl mt-3"
                  alt="discussion"
                />
              )}

              <div className="mt-5 text-sm bg-[#EAEAEA] px-4 py-1.5 rounded-full inline-block">
                💬 {latest.comment_count ?? 0} Komentar
              </div>

            </div>
          </Link>

        </section>
      )}

      {/* 🔥 RECENT DISCUSSIONS */}
      {recent.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-24">

          <div className="flex justify-between items-center mb-10">

            <h2 className="text-[32px] italic font-playfair text-[#5E6F69]">
              Recent Discussions
            </h2>

            <Link
              href="/himtalks/mini-forum/browse-forum"
              className="text-sm text-[#5E6F69] hover:underline"
            >
              Continue Exploring →
            </Link>

          </div>

          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
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
      )}

    </main>
  );
}