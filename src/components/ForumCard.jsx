"use client";

import Image from "next/image";
import Link from "next/link";

function slugify(text) {
  return text
    ?.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

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

export default function ForumCard({ forum }) {
  const slug = `${forum.id}-${slugify(forum.title)}`;

  const isClosed = (() => {
    const now = new Date();
    const created = new Date(forum.created_at);
    const diffDays = (now - created) / (1000 * 60 * 60 * 24);
    return diffDays > 7;
  })();

  return (
  <Link 
  href="/himtalks/mini-forum/form-forum"
  className="block"
>
      <div className="bg-white rounded-2xl shadow-md p-5 relative border border-gray-100 
                      hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer">

        {/* CLOSED */}
        {isClosed && (
          <span className="absolute top-4 right-4 bg-[#C2A88D] text-white text-xs px-3 py-1 rounded-full">
            Closed
          </span>
        )}

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <span>Himtalks</span>
            <span>•</span>
            <span>{timeAgo(forum.created_at)}</span>
          </div>

          {!isClosed && (
            <span className="text-xs border px-3 py-1 rounded-full text-gray-500">
              19.00 - 21.00 WIB
            </span>
          )}
        </div>

        {/* TITLE */}
        <h2 className="text-xl font-serif text-[#5E6F64] mb-2">
          {forum.title}
        </h2>

        {/* DESC */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {forum.content}
        </p>

        {/* IMAGE */}
        <div className="overflow-hidden rounded-xl mb-4">
          <Image
            src={forum.image}
            width={500}
            height={300}
            className="w-full h-[180px] object-cover"
            alt=""
          />
        </div>

        {/* COMMENT */}
        <div>
          <span className="inline-flex items-center gap-2 bg-[#EAEAEA] text-[#2f3e39] px-4 py-2 rounded-full text-sm">
            💬 {forum.comment_count} Komentar
          </span>
        </div>

      </div>
    </Link>
  );
}