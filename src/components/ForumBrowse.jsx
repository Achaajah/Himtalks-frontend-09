"use client";

import { useEffect, useState } from "react";
import ForumCard from "@/components/ForumCard";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function ForumBrowse() {

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // 🔥 fetch data
  async function fetchTopics() {
    try {
      const res = await fetch(`${API_BASE}/forums`);
      const data = await res.json();

      // ✅ urutkan terbaru
      const sorted = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setTopics(sorted);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTopics();

    // 🔥 auto refresh tiap 30 detik (biar kayak live forum)
    const interval = setInterval(fetchTopics, 30000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 filter search
  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-[#E7DFD5] min-h-screen px-6 lg:px-24 py-20">

      {/* TITLE */}
      <div className="text-center mt-20 mb-14">

        <h1 className="text-6xl italic font-serif text-[#5E6F64]">
          Explore the thoughts shared by others
        </h1>

        <p className="text-gray-500 mt-4">
          Ada banyak pemikiran yang ingin dibagikan—temukan sudut pandang yang mungkin juga kamu rasakan.
        </p>

      </div>

      {/* SEARCH */}
      <div className="max-w-2xl mx-auto mb-20 relative">

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter the topic title"
          className="w-full px-6 py-4 rounded-full bg-white shadow outline-none"
        />

        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#5E6F64] w-10 h-10 rounded-full text-white flex items-center justify-center">
          🔍
        </button>

      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-center text-lg">Loading forum...</p>
      ) : filteredTopics.length === 0 ? (
        <p className="text-center text-gray-500">
          Tidak ada forum ditemukan
        </p>
      ) : (

        /* GRID */
        <div className="grid md:grid-cols-2 gap-12">

          {filteredTopics.map((topic) => (
            <ForumCard
              key={topic.id}
              forum={topic}
            />
          ))}

        </div>

      )}

    </section>
  );
}