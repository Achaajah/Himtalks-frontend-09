"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
export default function ForumDetail() {

  const { id } = useParams();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    async function fetchTopic() {
      const res = await fetch(`${API_BASE}/topics/${id}`);
      const data = await res.json();
      setTopic(data);
    }

    if (id) fetchTopic();
  }, [id]);

  if (!topic) return <p className="text-center mt-20">Loading...</p>;

  return (
    <section className="bg-[#E9E1D6] min-h-screen px-6 lg:px-24 py-16">

      {/* back */}
      <Link
        href="/himtalks/mini-forum/browse-forum"
        className="text-[#5E6F64] mb-10 inline-block"
      >
        ← Return to discussion list
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* DISCUSSION CARD */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex justify-between text-sm text-gray-500 mb-3">
              <span>Himtalks • {topic.time || "5 mnt ago"}</span>
              <span className="border px-3 py-1 rounded-full text-xs">
                19.00 - 21.00 WIB
              </span>
            </div>

            <h1 className="text-2xl font-semibold text-[#5E6F64] mb-3">
              {topic.title}
            </h1>

            <p className="text-gray-500 mb-4">
              {topic.content}
            </p>

            {topic.image && (
              <Image
                src={topic.image}
                width={800}
                height={400}
                className="rounded-xl"
                alt="topic"
              />
            )}

            <button className="mt-4 text-sm bg-gray-200 px-4 py-1 rounded-full">
              💬 {topic.comment_count || 0} komentar
            </button>

          </div>

          {/* COMMENT INPUT */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="text-[#5E6F64] mb-4 font-semibold">
              Tuangkan Pikiranmu
            </h3>

            <input
              placeholder="Masukkan Username (Anonim)"
              className="w-full border-b p-2 mb-3 outline-none"
            />

            <div className="flex items-center gap-3">

              <textarea
                placeholder="Tulis komentar..."
                className="flex-1 border-b p-2 outline-none"
              />

              <button className="bg-[#5E6F64] text-white px-4 py-2 rounded-full">
                →
              </button>

            </div>

          </div>

          {/* COMMENT LIST */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex justify-between mb-6">
              <h3 className="font-semibold text-[#5E6F64]">
                Pikiran yang Dibagikan
              </h3>

              <span className="text-sm text-gray-500">
                Terbaru ▼
              </span>
            </div>

            <div className="space-y-6">

              <div>
                <p className="font-medium">
                  Burung Berkicau • 30 scn ago
                </p>
                <p className="text-gray-500 text-sm">
                  Lorem ipsum dolor sit amet consectetur...
                </p>
              </div>

              <div>
                <p className="font-medium">
                  Harimau Pagi • 5 mnt ago
                </p>
                <p className="text-gray-500 text-sm">
                  Lorem ipsum dolor sit amet consectetur...
                </p>
              </div>

              <div>
                <p className="font-medium">
                  MBG Enjoyer • 1 days ago
                </p>
                <p className="text-gray-500 text-sm">
                  Lorem ipsum dolor sit amet consectetur...
                </p>
              </div>

            </div>

            <p className="text-center mt-6 text-sm text-gray-500 cursor-pointer">
              Lihat tanggapan lain...
            </p>

          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* SUMMARY */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="font-semibold mb-3 text-[#5E6F64]">
              Ringkasan Diskusi
            </h3>

            <p className="text-sm text-gray-500">
              {topic.summary || "Lorem ipsum dolor sit amet consectetur..."}
            </p>

          </div>

          {/* GUIDELINE */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="font-semibold mb-3 text-[#5E6F64]">
              Panduan Diskusi
            </h3>

            <ul className="text-sm text-gray-500 list-disc ml-4 space-y-2">
              <li>Saling menghargai.</li>
              <li>Fokus pada topik.</li>
              <li>No Hate Speech.</li>
              <li>Gunakan bahasa yang sopan.</li>
            </ul>

          </div>

          {/* OTHER FEATURE */}
          <div className="space-y-4">

            <Link href="/himtalks/songfess">
              <div className="bg-white rounded-2xl shadow p-4 flex gap-3 items-center cursor-pointer">
                <Image
                  src="/flowerbird.jpg"
                  width={70}
                  height={70}
                  className="rounded-lg"
                  alt="songfess"
                />
                <div>
                  <p className="font-semibold">Songfess</p>
                  <p className="text-sm text-gray-500">
                    Ekspresikan perasaanmu melalui lagu!
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/himtalks/chat-anonym">
              <div className="bg-white rounded-2xl shadow p-4 flex gap-3 items-center cursor-pointer">
                <Image
                  src="/flowerbird.jpg"
                  width={70}
                  height={70}
                  className="rounded-lg"
                  alt="chat"
                />
                <div>
                  <p className="font-semibold">Chat Anonym</p>
                  <p className="text-sm text-gray-500">
                    Kirimkan pesan tanpa identitas.
                  </p>
                </div>
              </div>
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}