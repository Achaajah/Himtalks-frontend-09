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

  const { slug } = useParams();
  const id = slug?.split("-")[0];

  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        const res = await fetch(`${API_BASE}/forums/${id}`);

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

  async function handleCommentSubmit() {
    if (!commentContent.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/forums/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: username || "Anonymous",
          content: commentContent,
        }),
      });
      if (res.ok) {
        // Refresh topic
        const freshRes = await fetch(`${API_BASE}/forums/${id}`);
        const freshData = await freshRes.json();
        setTopic(freshData);
        setCommentContent("");
        setUsername("");
      }
    } catch (err) {
      console.error("Gagal mengirim komentar:", err);
    } finally {
      setIsSubmitting(false);
    }
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

        {/* COMMENT INPUT FORM */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-4 text-[#5E6F64]">Tuangkan Pikiranmu</h3>
          <input
            placeholder="Masukkan Username (Anonim)"
            className="w-full border-b p-2 mb-3 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <textarea
              placeholder="Tulis komentar..."
              className="flex-1 border-b p-2 outline-none"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <button 
              onClick={handleCommentSubmit}
              disabled={isSubmitting}
              className="bg-[#5E6F64] text-white px-4 py-2 rounded-full disabled:opacity-50"
            >
              {isSubmitting ? "..." : "Kirim"}
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}