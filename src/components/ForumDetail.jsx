"use client";

import Image from "next/image";
import Link from "next/link";

export default function ForumDetail() {

  // 🔥 DUMMY DATA POST
  const forum = {
    title: "Benarkah Hitler orang Bekasi?",
    content:
      "Lorem ipsum dolor sit amet consectetur. Ut cras aliquet sit lorem nulla cras aliquet eget. Vel sit lacus phasellus viverra quis. Neque erat orci tincidunt eget sit. Tellus pellentesque vel commodo tortor. Sapien eu commodo et mauris purus mollis.",
    image: "/New folder/1.jpg",
  };

  // 🔥 DUMMY KOMENTAR (PANJANG BIAR SCROLL)
  const comments = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    user: ["Burung Berkicau", "Harimau Pagi", "MBG Enjoyer"][i % 3],
    time: `${i + 1} jam lalu`,
    text: "Lorem ipsum dolor sit amet consectetur. Ut cras aliquet sit lorem nulla cras aliquet eget. Vel sit lacus phasellus viverra quis.",
  }));

  return (
    <section className="bg-[#E7DFD5] min-h-screen px-6 lg:px-24 py-16">

      {/* 🔙 BACK */}
      <Link
        href="/himtalks/mini-forum"
        className="text-gray-600 mb-10 block"
      >
        ← Return to discussion list
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* 🔥 LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6">

          {/* 📝 POST */}
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
              💬 67 Komentar
            </div>
          </div>

          {/* ✍️ INPUT */}
          <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">

            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>

            <input
              placeholder="Masukkan Username (Anonim)"
              className="flex-1 outline-none text-sm"
            />

            <button className="bg-[#5E6F64] text-white px-4 py-2 rounded-full">
              →
            </button>
          </div>

          {/* 💬 KOMENTAR */}
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

            <p className="text-center text-gray-500 text-sm">
              Lihat tanggapan lain...
            </p>
          </div>

        </div>

        {/* 👉 RIGHT SIDEBAR */}
        <div className="space-y-6 lg:sticky lg:top-24 h-fit">

          {/* 📌 RINGKASAN */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="font-serif text-[#5E6F64] mb-2">
              Ringkasan Diskusi
            </h3>

            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Viverra adipiscing amet tortor massa. 
              Sodales id ullamcorper eget id etiam nibh magna pellentesque mauris.
            </p>
          </div>

          {/* 📖 PANDUAN */}
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

          {/* 🎤 EXTRA CARD */}
          <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
            <Image
              src="/New folder/2.jpg"
              width={80}
              height={80}
              className="rounded-xl object-cover"
              alt=""
            />
            <div>
              <p className="font-serif text-[#5E6F64]">Songfess</p>
              <p className="text-sm text-gray-500">
                Ekspresikan perasaanmu lewat lagu!
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* 🔝 BACK TO TOP */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-[#5E6F64] text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        ↑
      </button>

    </section>
  );
}