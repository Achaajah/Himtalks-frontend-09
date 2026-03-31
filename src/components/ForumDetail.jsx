"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ForumDetail() {

  // 🔥 LOADING STATE
  const [loading, setLoading] = useState(true);

  // 🔥 DUMMY DATA POST
  const [forum, setForum] = useState(null);
  const [comments, setComments] = useState([]);

  // 🔥 STATE TAMBAHAN
const [username, setUsername] = useState("");
const [isTyping, setIsTyping] = useState(false);
const [commentText, setCommentText] = useState("");

  // 🔥 SIMULASI FETCH
  useEffect(() => {
    const timer = setTimeout(() => {

      setForum({
        title: "Benarkah Hitler orang Bekasi?",
        content:
          "Lorem ipsum dolor sit amet consectetur. Ut cras aliquet sit lorem nulla cras aliquet eget. Vel sit lacus phasellus viverra quis.",
        image: "/New folder/1.jpg",
      });

      setComments(
        Array.from({ length: 25 }, (_, i) => ({
          id: i,
          user: ["Burung Berkicau", "Harimau Pagi", "MBG Enjoyer"][i % 3],
          time: `${i + 1} jam lalu`,
          text: "Lorem ipsum dolor sit amet consectetur. Ut cras aliquet sit lorem nulla cras aliquet eget.",
        }))
      );

      setLoading(false);
    }, 1000);

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

  // 🔥 SAFETY
  if (!forum) return null;

  return (
    <section className="bg-[#E7DFD5] mt-20 min-h-screen px-6 lg:px-24 py-16">

      {/* BACK */}
      <Link href="/himtalks/mini-forum" className="text-gray-600 mb-10 block">
        ← Return to discussion list
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* POST */}
          <div className="bg-white p-6 rounded-2xl shadow">

            <div className="flex justify-between mb-3">
              <div className="text-sm text-gray-500">
                Himtalks • 5 mnt ago
              </div>

              <span className="text-xs border px-3 py-1 rounded-full text-gray-500">
                19.00 - 21.00 WIB
              </span>
            </div>

            <h1 className="text-2xl font-serif text-[#5E6F64] mb-4">
              {forum.title}
            </h1>

            <p className="text-gray-600 mb-4">
              {forum.content}
            </p>

            <div className="overflow-hidden rounded-xl mb-4">
              <Image
                src={forum.image}
                width={600}
                height={300}
                className="w-full h-[220px] object-cover"
                alt=""
              />
            </div>

            <div className="bg-[#5E6F64] text-white px-4 py-2 rounded-full inline-block text-sm">
              💬 {comments.length} Komentar
            </div>
          </div>

          {/* INPUT */}
{/* INPUT */}
<div className="bg-white p-4 rounded-2xl shadow flex flex-col gap-3">

  {/* STEP 1: USERNAME */}
  {!isTyping && (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>

      <input
        placeholder="Masukkan Username (Anonim)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="flex-1 outline-none text-sm"
      />

      <button
        onClick={() => {
          if (username.trim() !== "") {
            setIsTyping(true);
          }
        }}
        className="bg-[#5E6F64] text-white px-4 py-2 rounded-full"
      >
        →
      </button>
    </div>
  )}

  {/* STEP 2: KOMENTAR */}
  {isTyping && (
    <div className="flex flex-col gap-2">

      <div className="text-sm text-gray-500">
        Mengirim sebagai <span className="font-medium">{username}</span>
      </div>

      <textarea
        placeholder="Tulis komentarmu..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="w-full outline-none text-sm border rounded-lg p-3 resize-none"
        rows={3}
      />

      <div className="flex justify-end gap-2">

        {/* GANTI USERNAME */}
        <button
          onClick={() => setIsTyping(false)}
          className="text-sm text-gray-500"
        >
          Ganti nama
        </button>

        {/* KIRIM */}
        <button
          onClick={() => {
            if (commentText.trim() === "") return;

            setComments([
              {
                id: Date.now(),
                user: username,
                time: "baru saja",
                text: commentText,
              },
              ...comments,
            ]);

            setCommentText("");
          }}
          className="bg-[#5E6F64] text-white px-4 py-2 rounded-full text-sm"
        >
          Kirim
        </button>

      </div>

    </div>
  )}

</div>

          {/* KOMENTAR */}
          <div className="bg-white p-6 rounded-2xl shadow">

            <div className="flex justify-between mb-4">
              <h2 className="font-serif text-lg text-[#5E6F64]">
                Pikiran yang Dibagikan
              </h2>

              <span className="text-sm text-gray-500">
                Terbaru
              </span>
            </div>

            {comments.map((c) => (
              <div key={c.id} className="mb-6 border-b pb-4">

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                  {c.user} • {c.time}
                </div>

                <p className="text-gray-600 text-sm">
                  {c.text}
                </p>
              </div>
            ))}

            <button>
            <p className="text-center text-gray-500 text-sm">
              Lihat tanggapan lain...
            </p>
            </button>
          </div>

        </div>

        {/* RIGHT (🔥 FIXED / STICKY) */}
        <div className="space-y-6 lg:sticky lg:top-28 self-start">

          {/* Ringkasan */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="font-serif text-[#5E6F64] mb-2">
              Ringkasan Diskusi
            </h3>

            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>

          {/* Panduan */}
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <Image
              src="/New folder/2.jpg"
              width={400}
              height={150}
              className="w-full h-[120px] object-cover"
              alt=""
            />

            <div className="p-5">
              <h3 className="font-serif text-[#5E6F64] mb-2">
                Panduan Diskusi
              </h3>

              <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                <li>Saling menghargai</li>
                <li>Fokus tema</li>
                <li>No hate speech</li>
                <li>Gunakan bahasa sopan</li>
                <li>Anonim tetap sopan</li>
              </ul>
            </div>
          </div>

          {/* 🔥 QUICK ACCESS */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="font-serif text-[#5E6F64] mb-3">
              Akses Cepat
            </h3>

            <div className="flex flex-col gap-2">
              <Link
                href="/himtalks/songfess"
                className="text-sm text-[#5E6F64] hover:underline"
              >
                🎵 Songfess
              </Link>

              <Link
                href="/himtalks/chat-anonym"
                className="text-sm text-[#5E6F64] hover:underline"
              >
                💬 Chat Anonym
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* BACK TO TOP */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-[#5E6F64] text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        ↑
      </button>

    </section>
  );
}