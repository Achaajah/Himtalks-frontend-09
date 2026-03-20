"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

await fetch("http://localhost:8080/forums", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Test dari FE",
    content: "Ini isi forum",
  }),
});

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

export default function ForumDetailPage() {

  const { slug } = useParams();
  const id = slug?.split("-")[0];

  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 buat auto update timeAgo tiap menit
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {

    async function fetchTopic() {
      try {
        const res = await fetch(`${API_BASE}/topics/${id}`);

        if (!res.ok) throw new Error("Gagal fetch");

        const data = await res.json();
        setTopic(data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchTopic();

  }, [id]);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!topic) {
    return <p className="text-center mt-20">Topic tidak ditemukan</p>;
  }

  return (
    <section className="min-h-screen bg-[#F6EFE7] px-6 lg:px-24 py-16">

      <Link href="/mini-forum/browse-forum" className="mb-8 inline-block">
        ← Back to Forum
      </Link>

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-4">
        {topic.title}
      </h1>

      {/* AUTHOR + TIME */}
      <p className="text-sm text-gray-500 mb-6">
        {topic.author || "Anonymous"} • {timeAgo(topic.created_at)}
      </p>

      {/* IMAGE */}
      {topic.image && (
        <div className="relative w-full max-w-3xl h-[320px] mb-6">
          <Image
            src={topic.image}
            alt="topic"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      )}

      {/* CONTENT */}
      <p className="max-w-3xl text-gray-700 mb-10">
        {topic.content}
      </p>

      {/* COMMENTS */}
      <div className="max-w-3xl">

        <h2 className="text-2xl font-semibold mb-4">
          Comments
        </h2>

        {topic.comments?.length > 0 ? (
          topic.comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white p-4 rounded-lg mb-3 shadow"
            >
              <p className="text-gray-700">
                {comment.content}
              </p>

              <span className="text-xs text-gray-400">
                {comment.author || "Anonymous"} • {timeAgo(comment.created_at)}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Belum ada komentar</p>
        )}

      </div>

    </section>
  );
}