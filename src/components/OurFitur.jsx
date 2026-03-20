"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function OurFitur(){

const [isHoverCard,setIsHoverCard] = useState(false);
const [isHoverCard2,setIsHoverCard2] = useState(false);
const [isHoverCard3,setIsHoverCard3] = useState(false);

const timeoutRef = useRef(null);
const timeoutRef2 = useRef(null);
const timeoutRef3 = useRef(null);

const handleEnter1 = ()=>{
clearTimeout(timeoutRef.current);
setIsHoverCard(true);
}

const handleLeave1 = ()=>{
timeoutRef.current=setTimeout(()=>{setIsHoverCard(false)},500);
}

const handleEnter2 = ()=>{
clearTimeout(timeoutRef2.current);
setIsHoverCard2(true);
}

const handleLeave2 = ()=>{
timeoutRef2.current=setTimeout(()=>{setIsHoverCard2(false)},500);
}

const handleEnter3 = ()=>{
clearTimeout(timeoutRef3.current);
setIsHoverCard3(true);
}

const handleLeave3 = ()=>{
timeoutRef3.current=setTimeout(()=>{setIsHoverCard3(false)},500);
}

return(

<section className="pt-24 pb-32 px-7 md:px-16 lg:px-28 bg-[#F5F1E8] text-[#3F4F44]">

{/* Title */}
<div className="w-full text-center mb-16">
<h1 className="text-5xl md:text-6xl font-semibold text-[#7A918D]">
Our Feature
</h1>

<p className="text-sm md:text-base mt-4 max-w-xl mx-auto leading-7">
Himtalks hadir dengan tiga fitur utama yang membantu mahasiswa
menyampaikan pesan, berbagi cerita, dan berdiskusi bersama.
</p>
</div>

{/* Card Grid */}
<div className="grid gap-8 lg:grid-cols-3">

{/* CARD 1 SONGFESS */}
<div
onMouseEnter={handleEnter1}
onMouseLeave={handleLeave1}
className={`rounded-2xl shadow-md overflow-hidden transition-all duration-500
${isHoverCard ? "bg-[#839E8F] scale-105" : "bg-[#8FAE9A]"}`}
>

  {/* IMAGE HEADER */}
  <div className="relative w-full h-56">
    <Image
      src="/New folder/card1.svg"
      alt="Songfess"
      fill
      className="object-cover select-none"
    />
  </div>

<div className="px-6 pb-6">

<h3 className="text-xl font-semibold mb-2">
Songfess
</h3>

<p className="text-sm leading-6 mb-6">
Ekspresikan perasaanmu melalui lagu dan pesan anonim
melalui fitur Songfess.
</p>

<Link
href="/himtalks/songfess"
className="inline-flex items-center gap-2 bg-[#7A918D] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
>
Send Now →
</Link>

</div>
</div>


{/* CARD 2 CHAT ANONYM */}
<div
  onMouseEnter={handleEnter2}
  onMouseLeave={handleLeave2}
  className={`rounded-2xl shadow-md overflow-hidden transition-all duration-500
  ${isHoverCard2 ? "bg-[#839E8F] scale-105" : "bg-[#8FAE9A]"}`}
>

  {/* IMAGE HEADER */}
  <div className="relative w-full h-56">
    <Image
      src="/New folder/card2.svg"
      alt="chat anonym"
      fill
      className="object-cover select-none"
    />
  </div>

  {/* CONTENT */}
  <div className="px-6 pb-6 pt-4">

    <h3 className="text-xl font-semibold mb-2">
      Chat Anonym
    </h3>

    <p className="text-sm leading-6 mb-6">
      Kirimkan pesan tanpa mengungkap identitas kepada
      pengurus maupun mahasiswa lainnya.
    </p>

    <Link
      href="/himtalks/chat-anonym"
      className="inline-flex items-center gap-2 bg-[#7A918D] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
    >
      Send Now →
    </Link>

  </div>

</div>


{/* CARD 3 MINI FORUM */}
<div
onMouseEnter={handleEnter3}
onMouseLeave={handleLeave3}
className={`rounded-2xl shadow-md overflow-hidden transition-all duration-500
${isHoverCard3 ? "bg-[#839E8F] scale-105" : "bg-[#8FAE9A]"}`}
>

  {/* IMAGE HEADER */}
  <div className="relative w-full h-56">
    <Image
      src="/New folder/card3.svg"
      alt="Mini Forum"
      fill
      className="object-cover select-none"
    />
  </div>

<div className="px-6 pb-6">

<h3 className="text-xl font-semibold mb-2">
Mini Forum
</h3>

<p className="text-sm leading-6 mb-6">
Tempat berdiskusi, berbagi ide, dan bertukar
pendapat bersama mahasiswa lainnya.
</p>

<Link
href="/himtalks/mini-forum"
className="inline-flex items-center gap-2 bg-[#7A918D] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
>
Explore →
</Link>

</div>
</div>

</div>
</section>

)
}