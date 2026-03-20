"use client";

import Image from "next/image";
import Link from "next/link";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function ForumCard({ forum }) {
  return (

    <Link
      href={`/himtalks/mini-forum/${forum.id}-${slugify(forum.title)}`}
      className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition block"
    >

      {/* HEADER */}
      <div className="flex justify-between items-center text-sm text-gray-500 mb-3">

        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
          Himtalks • {forum.time || "5 mnt ago"}
        </span>

        <span className="border px-3 py-1 rounded-full text-xs">
          19.00 - 21.00 WIB
        </span>

      </div>

      {/* TITLE */}
      <h2 className="text-2xl font-serif text-[#5E6F64] mb-2">
        {forum.title}
      </h2>

      {/* CONTENT */}
      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
        {forum.content}
      </p>

      {/* IMAGE */}
      {forum.image && (
        <div className="relative w-full h-[230px] mb-5">
          <Image
            src={forum.image}
            fill
            alt="topic"
            className="rounded-2xl object-cover"
          />
        </div>
      )}

      {/* COMMENT */}
      <div className="inline-flex items-center gap-2 bg-[#5E6F64] text-white px-4 py-1 rounded-full text-sm">
        💬 {forum.comment_count || forum.comments || 0} Komentar
      </div>

    </Link>
  );
}