"use client";
import Link from "next/link";
import Image from "next/image";

export default function SongfessSlideshow() {
  const data = [
    {
      id: 1,
      to: "Ade maman",
      message:
        "masih ada notes kita di gallery, full of plans yang gapernah kejadian",
      song: "Apocalypse",
      artist: "Cigarettes after sex",
      image: "/New folder/2.jpg",
    },
    {
      id: 2,
      to: "Jokowi Pramono",
      message: "kamu mau ga jadi kadiv akuuu",
      song: "Apocalypse",
      artist: "Cigarettes after sex",
      image: "/New folder/2.jpg",
    },
    {
      id: 3,
      to: "Ade maman",
      message:
        "masih ada notes kita di gallery, full of plans yang gapernah kejadian",
      song: "Apocalypse",
      artist: "Cigarettes after sex",
      image: "/New folder/2.jpg",
    },
  ];

  return (
    <section className="px-6 lg:px-24 pb-28 bg-[#E7DFD5]">
      <div className="overflow-x-auto">
<div className="flex gap-6">

  {data.map((item) => (
    <Link
      key={item.id}
      href={`/himtalks/songfess/${item.id}`}
      className="min-w-[340px] md:min-w-[380px]"
    >
      <div className="bg-white rounded-2xl shadow-md overflow-hidden 
                      hover:scale-105 transition 
                      h-[220px] flex flex-col justify-between">

        {/* TOP CONTENT */}
        <div className="p-5 flex-1 flex flex-col justify-between">

          <p className="text-sm text-gray-500">
            To: <span className="text-black">{item.to}</span>
          </p>

          {/* TEXT FIX HEIGHT */}
          <p className="mt-2 text-xl font-[Caveat] text-black line-clamp-2 h-[60px]">
            {item.message}
          </p>

        </div>

        {/* BOTTOM (LAGU) */}
        <div className="bg-[#6F8F80] px-4 py-3 flex items-center gap-3">

          <Image
            src={item.image}
            width={40}
            height={40}
            alt=""
            className="rounded-md"
          />

          <div className="text-white text-sm">
            <p className="font-semibold line-clamp-1">
              {item.song}
            </p>
            <p className="text-xs opacity-80 line-clamp-1">
              {item.artist}
            </p>
          </div>

          <div className="ml-auto text-white">🎵</div>

        </div>

      </div>
    </Link>
  ))}

</div>
      </div>
    </section>
  );
}
