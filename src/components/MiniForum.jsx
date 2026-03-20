"use client";

import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ForumCard from "@/components/ForumCard";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import Link from "next/link";

const API_BASE = "http://localhost:8080"; // ✅ FIX

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
    <main className="bg-[#efe9df] min-h-screen">
       {/* 🔥 HERO */}
    <section className="text-center py-20 px-6">

      <h1 className="
      max-w-2xl mx-auto
      pt-15
      font-playfair 
      font-semibold 
      italic 
      text-[48px] 
      leading-[100%] 
      tracking-[-0.04em] 
      text-center 
    text-[#5E6F69]
      mb-4
      ">
        Every voice deserves to be heard and understood
      </h1>

      <p className="text-gray-500 mb-6">
        Let your thoughts find their place here
      </p>

      <button className="bg-[#5E6F69] text-white px-6 py-2 rounded-lg hover:opacity-90 transition">
        Start Discussion!
      </button>

      {/* 🔥 GAMBAR */}
      <div className="mt-10 flex justify-center">
        <Image
          src="/birds.png" // pastiin ada di public/
          width={300}
          height={200}
          alt="birds"
        />
      </div>

    </section>
      {/* 🔥 LATEST DISCUSSION */}
      {latest && (
        <section className="max-w-5xl mt-30 mx-auto px-6 pb-16">

          <h2 className="text-3xl text-[#5E6F69] font-serif mb-10">
            Latest Discussion
          </h2>

          <Link href={`/himtalks/mini-forum/${latest.id}`}>
            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition cursor-pointer">

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                Himtalks • {timeAgo(latest.created_at)}
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {latest.title}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                {latest.content}
              </p>

              {latest.image && (
                <Image
                  src={latest.image}
                  width={800}
                  height={400}
                  className="rounded-xl"
                  alt="discussion"
                />
              )}

              <div className="mt-4 text-sm bg-[#E6E6E6] px-4 py-1 rounded-full inline-block">
                💬 {latest.comment_count ?? 0} Komentar
              </div>

            </div>
          </Link>

        </section>
      )}

      {/* 🔥 RECENT DISCUSSIONS */}
      {recent.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-20">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl text-[#5E6F69] font-serif">
              Recent Discussions
            </h2>

            <Link
              href="/himtalks/mini-forum/browse-forum"
              className="text-sm text-[#5E6F69]"
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