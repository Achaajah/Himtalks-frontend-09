"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const API_BASE = "http://localhost:8080";

export default function SongfessBrowse() {

const controls = useAnimation();
const containerRef = useRef(null);
const scrollTimeout = useRef(null);

const [isFocused,setIsFocused] = useState(false);
const [value,setValue] = useState("");

const [songfessData,setSongfessData] = useState([]);
const [filteredData,setFilteredData] = useState([]);

const [isSearching,setIsSearching] = useState(false);
const [loading,setLoading] = useState(true);
const [error,setError] = useState(null);



/* ================= FETCH DATA ================= */

useEffect(()=>{

async function fetchSongfessData(){

try{

const res = await fetch(`${API_BASE}/songfess`);

if(!res.ok){
throw new Error(`HTTP Error ${res.status}`);
}

const data = await res.json();

const transformed = data.map(item=>({

id:item.id,
to:item.recipient_name || "Anonymous",
message:item.content || "",
songTitle:item.song_title || "",
artist:item.artist || "",
image:item.album_art || "/songfess/image-song-example.png",

}));

setSongfessData(transformed);
setFilteredData(transformed);
setLoading(false);

}
catch(err){

console.error(err);
setError(err.message);
setLoading(false);

}

}

fetchSongfessData();

},[]);



/* ================= AUTO SCROLL ================= */

useEffect(()=>{

const totalWidth = songfessData.length * 440;

const speed = 95;
const duration = totalWidth / speed;

if(!isSearching){

controls.set({x:"100vw"});

controls.start({
x:`-${totalWidth}px`,
transition:{
repeat:Infinity,
duration:duration,
ease:"linear"
}
});

}
else{
controls.stop();
}

return ()=>{
if(scrollTimeout.current) clearTimeout(scrollTimeout.current);
}

},[songfessData,isSearching,controls]);



/* ================= SEARCH ================= */

const handleSearch = (e)=>{

const searchValue = e.target.value.toLowerCase();

setValue(searchValue);

if(!songfessData.length){
setFilteredData([]);
return;
}

if(searchValue){

setIsSearching(true);

const filtered = songfessData.filter(item=>

(item.to || "").toLowerCase().includes(searchValue) ||
(item.message || "").toLowerCase().includes(searchValue) ||
(item.songTitle || "").toLowerCase().includes(searchValue) ||
(item.artist || "").toLowerCase().includes(searchValue)

);

setFilteredData(filtered);

controls.stop();
controls.set({x:"0%"});

}
else{

setIsSearching(false);
setFilteredData(songfessData);

}

};



/* ================= UI ================= */

return(

<section className="pt-36 pb-28 px-6 sm:px-16 md:px-12 lg:px-28 bg-[#EDE6DB] text-black">

{/* TITLE */}

<h1 className="font-serif italic font-semibold text-4xl sm:text-5xl lg:text-6xl text-center text-[#4C5F5A]">
Explore the messages waiting for you
</h1>

<p className="text-center text-[#4C5F5A] mt-4 text-sm sm:text-base">
Ada pesan yang menunggu untuk kamu dengarkan—temukan Songfess yang ditujukan untukmu.
</p>



{/* SEARCH */}

<div className="relative mt-10 mb-16 w-full max-w-2xl mx-auto">

<input
type="text"
placeholder="Enter recipient name"
value={value}
onChange={handleSearch}
onFocus={()=>setIsFocused(true)}
onBlur={()=>setIsFocused(false)}
className="w-full rounded-full px-6 py-4 text-sm border-2 bg-[#FFFFFF] border-[#ddd] focus:border-[#7D9A8B] outline-none"
/>

<div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#7D9A8B] p-2 rounded-full flex items-center justify-center hover:scale-105 transition cursor-pointer">

<button
type="button"
onClick={() => handleSearch({ target: { value } })}
>
<Image
src="/icons/search.svg"
width={16}
height={16}
alt="Search icon"
/>
</button>
</div>

</div>



{/* CAROUSEL */}

<div className="relative w-full overflow-hidden">

<motion.div
ref={containerRef}
className="flex space-x-8"
animate={controls}
initial={{x:"100%"}}
>

{filteredData.length > 0 ? (

filteredData.map(songfess=>(

<Link
key={songfess.id}
href={`/himtalks/songfess/${songfess.id}`}
>

<motion.div
whileHover={{scale:1.05}}
className="w-[380px] md:w-[420px] bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
>


{/* MESSAGE */}

<div className="px-6 pt-6 pb-4">

<p className="text-[#707070] text-sm">
To: <span className="text-black">{songfess.to}</span>
</p>

<div className="h-[80px] flex items-center mt-3">

<p className="italic text-lg text-[#2d2d2d] font-serif line-clamp-2">
{songfess.message}
</p>

</div>

</div>



{/* SONG INFO */}

<div className="bg-[#7D9A8B] px-5 py-4 rounded-b-2xl">

<div className="flex items-center justify-between">

<div className="flex items-center gap-3">

<Image
src={songfess.image}
width={36}
height={36}
alt="album"
className="rounded-md"
/>

<div>

<p className="text-white text-sm font-semibold">
{songfess.songTitle}
</p>

<p className="text-white/80 text-xs">
{songfess.artist}
</p>

</div>

</div>

<Image
src="/icons/spotify.svg"
width={20}
height={20}
alt="spotify"
/>

</div>

</div>

</motion.div>

</Link>

))

)

:

(

<div className="w-[380px] bg-white rounded-2xl shadow-md p-6">

<p className="text-center text-gray-500">
Tidak ada Songfess ditemukan
</p>

</div>

)}

</motion.div>

</div>

</section>

)

}