"use client";

import { useState, useEffect } from "react";
import ForumCard from "@/components/ForumCard";

export default function ForumBrowse() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  // 🔥 LOADING STATE
  const [loading, setLoading] = useState(true);

  // 🔥 SIMULASI LOADING (BIAR KELIATAN)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 detik

    return () => clearTimeout(timer);
  }, []);

  // 🔥 DUMMY DATA
  const topics = [
    {
      id: 1,
      title: "Benarkah Hitler Orang Bekasi?",
      content: "Lorem ipsum dolor sit amet consectetur. Integer proin imperdie...",
      created_at: new Date(),
      image: "/New folder/1.jpg",
      comment_count: 67,
    },
    {
      id: 2,
      title: "Kalian Buka Puasa Pakai Apa?",
      content: "Lorem ipsum dolor sit amet consectetur. Integer proin imperdie...",
      created_at: new Date(Date.now() - 60 * 60 * 1000),
      image: "/New folder/2.jpg",
      comment_count: 67,
    },
    {
      id: 3,
      title: "Gimana Cara Dapat IPK 5?",
      content: "Lorem ipsum dolor sit amet consectetur. Integer proin imperdie...",
      created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      image: "/New folder/2.jpg",
      comment_count: 67,
    },
    {
      id: 4,
      title: "Benarkah Fasilkom Banyak Femboy?",
      content: "Lorem ipsum dolor sit amet consectetur. Integer proin imperdie...",
      created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      image: "/New folder/2.jpg",
      comment_count: 67,
    },
  ];

  // 🔍 SEARCH
  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(search.toLowerCase())
  );

  // 🔽 SORT
  const sortedTopics = [...filteredTopics].sort((a, b) => {
    if (sort === "newest") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else {
      return new Date(a.created_at) - new Date(b.created_at);
    }
  });

  // 🔥 LOADING UI (WAJIB ADA SEBELUM RETURN UTAMA)
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3EEE6]">
        
        <img
          src="/New folder/burung-mikir.svg"
          className="w-40 mb-4 animate-bounce"
          alt="loading"
        />

        <div className="w-10 h-10 border-4 border-[#5E6F69] border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-4 text-[#5E6F69] text-sm">
          Menyiapkan diskusi...
        </p>

      </div>
    );
  }

  // 🔥 UI UTAMA
  return (
    <section className="bg-[#E7DFD5] min-h-screen px-6 lg:px-24 py-20">

      {/* TITLE */}
      <div className="text-center mt-16 mb-12">
        <h1 className="font-serif italic font-semibold text-5xl text-[#6B7C72] text-center">
          Explore the thoughts shared by others
        </h1>

        <p className="text-gray-500 mt-4 max-w-xl mx-auto leading-relaxed">
          Ada banyak pemikiran yang ingin dibagikan—temukan sudut pandang yang mungkin juga kamu rasakan.
        </p>
      </div>

      {/* SEARCH */}
      <div className="max-w-2xl mx-auto mb-6 relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter the topic title"
          className="w-full px-6 py-4 rounded-full bg-white shadow-md outline-none 
          focus:ring-2 focus:ring-[#5E6F64]"
        />

        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </div>
      </div>

      {/* SORT */}
      <div className="max-w-2xl mx-auto mb-10 flex justify-end">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 rounded-lg border text-sm bg-white"
        >
          <option value="newest">Terbaru</option>
          <option value="oldest">Terlama</option>
        </select>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-10">
        {sortedTopics.map((topic) => (
          <ForumCard key={topic.id} forum={topic} />
        ))}
      </div>

    </section>
  );
}