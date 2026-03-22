"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

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

  // 🔥 FIX PARAM (slug → ambil id)
  const { id: slug } = useParams();
  const idOnly = slug?.split("-")[0];

  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔥 auto update timeAgo
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 FETCH DATA
  useEffect(() => {
    async function fetchTopic() {
      try {
        const res = await fetch(`${API_BASE}/forums/${idOnly}`);
        if (!res.ok) throw new Error("Gagal fetch");

        const data = await res.json();
        setTopic(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (idOnly) fetchTopic();
  }, [idOnly]);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!topic) {
    return <p className="text-center mt-20">Topic tidak ditemukan</p>;
  }

  // 🔥 SUBMIT KOMENTAR
  async function handleCommentSubmit() {
    if (!commentContent.trim()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/forums/${idOnly}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          author: username || "Anonymous",
          content: commentContent,
        }),
      });

      if (res.ok) {
        // refresh data
        const fresh = await fetch(`${API_BASE}/forums/${idOnly}`);
        const freshData = await fresh.json();
        setTopic(freshData);

        setCommentContent("");
        setUsername("");
      }

    } catch (err) {
      console.error("Gagal kirim komentar:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#F3EEE6] px-6 py-16">

      {/* 🔥 BACK */}
      <div className="max-w-3xl mx-auto mb-6">
        <Link
          href="/himtalks/mini-forum/browse-forum"
          className="text-[#5E6F64]"
        >
          ← Back to Forum
        </Link>
      </div>

      {/* 🔥 CARD WRAPPER */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow">

        {/* TITLE */}
        <h1 className="text-[40px] font-playfair italic text-[#5E6F64] mb-4">
          {topic.title}
        </h1>

        {/* AUTHOR */}
        <p className="text-sm text-gray-500 mb-6">
          {topic.author || "Anonymous"} • {timeAgo(topic.created_at)}
        </p>

        {/* IMAGE */}
        {topic.image && (
          <div className="relative w-full h-[300px] mb-6">
            <Image
              src={topic.image}
              alt="topic"
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        )}

        {/* CONTENT */}
        <p className="text-gray-700 mb-10 leading-relaxed">
          {topic.content}
        </p>

        {/* 🔥 COMMENTS */}
        <div>

          <h2 className="text-xl font-semibold mb-4 text-[#5E6F64]">
            Komentar
          </h2>

          {topic.comments?.length > 0 ? (
            topic.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-[#F6EFE7] p-4 rounded-xl mb-3"
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

          {/* 🔥 INPUT */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">

            <h3 className="font-semibold mb-3 text-[#5E6F64]">
              Tuangkan Pikiranmu
            </h3>

            <input
              placeholder="Masukkan Username (Anonim)"
              className="w-full bg-[#F6EFE7] p-3 rounded-lg mb-3 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <div className="flex gap-2">
              <textarea
                placeholder="Tulis komentar..."
                className="flex-1 bg-[#F6EFE7] p-3 rounded-lg outline-none"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />

              <button
                onClick={handleCommentSubmit}
                disabled={isSubmitting}
                className="bg-[#5E6F64] text-white px-5 rounded-full disabled:opacity-50"
              >
                {isSubmitting ? "..." : "Kirim"}
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}