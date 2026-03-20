"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const API_BASE = "http://localhost:8080";

export default function SongfessSlideshow() {

    const [songfessData, setSongfessData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const controls = useAnimation();
    const containerRef = useRef(null);
    const scrollTimeout = useRef(null);

    const [isScrolling, setIsScrolling] = useState(false);

    // ================= FETCH DATA =================
    useEffect(() => {

        async function fetchSongfessData() {
            try {

                const response = await fetch(`${API_BASE}/songfess`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                const transformedData = data.map(item => ({
                    id: item.id,
                    to: item.recipient_name || "Anonymous",
                    message: item.content,
                    songTitle: item.song_title,
                    artist: item.artist,
                    date: new Date(item.created_at).toLocaleDateString('id-ID',{
                        year:"numeric",
                        month:"long",
                        day:"numeric"
                    }),
                    image: item.album_art || "/songfess/image-song-example.png"
                }));

                setSongfessData(transformedData);
                setLoading(false);

            } catch(err){
                console.error("Error fetching songfess:", err);
                setError(err.message);
                setLoading(false);
            }
        }

        fetchSongfessData();

    },[]);



    // ================= ANIMATION =================
    useEffect(() => {

        if(songfessData.length === 0) return;

        const cardWidth = 420;
        const totalWidth = songfessData.length * cardWidth;

        const speed = 95;
        const duration = totalWidth / speed;

        controls.set({
            x: "100vw"
        });

        controls.start({
            x: -totalWidth,
            transition:{
                duration: duration,
                ease:"linear",
                repeat:Infinity
            }
        });

        return () => {
            controls.stop();
        };

    },[songfessData, controls]);



    // ================= HANDLE SCROLL =================
    const handleScroll = () => {

        setIsScrolling(true);
        controls.stop();

        if(scrollTimeout.current){
            clearTimeout(scrollTimeout.current);
        }

        scrollTimeout.current = setTimeout(() => {

            setIsScrolling(false);

            const cardWidth = 420;
            const totalWidth = songfessData.length * cardWidth;

            const speed = 95;
            const duration = totalWidth / speed;

            controls.start({
                x: -totalWidth,
                transition:{
                    duration: duration,
                    ease:"linear",
                    repeat:Infinity
                }
            });

        },1000);
    };



    return(
        <>

        <section className="pb-28 px-6 sm:px-16 md:px-12 lg:px-28 bg-yellowBG text-black">

            {loading && (
                <div className="flex justify-center py-10">
                    <p>Loading songfess data...</p>
                </div>
            )}

            {error && (
                <div className="flex justify-center py-10">
                    <p>Error: {error}</p>
                </div>
            )}

            <div
            className="relative w-full mx-auto overflow-x-scroll custom-scrollbar2 p-5 bg-[#EFE9DF]"
            onScroll={handleScroll}
            >

                <motion.div
                ref={containerRef}
                className="flex space-x-4 min-w-[calc(100vw+600px)]"
                initial={{x:"100vw"}}
                animate={controls}
                >

                {songfessData.length > 0 ? (

                    songfessData.map((songfess,index)=>(
                        <Link
                        key={songfess.id}
                        href={`/himtalks/songfess/${songfess.id}`}
                        >

                        <motion.div
                        key={index}
                        className="w-[350px] md:w-[400px] bg-white rounded-2xl shadow-md"
                        whileHover={{scale:1.05}}
                        >

                        <div className="px-5 pt-5 pb-1">

                            <p className="text-[#707070] text-sm font-medium">
                                To:
                                <span className="text-black"> {songfess.to}</span>
                            </p>

                            <div className="h-[70px] md:h-[80px] flex items-center md:mt-2">

                                <p className="text-black font-semibold text-2xl font-[Caveat] line-clamp-2">
                                    {songfess.message}
                                </p>

                            </div>

                        </div>


                        <div className="bg-purple px-4 py-3 md:py-4 rounded-2xl">

                        <div className="flex gap-2 items-center w-full">

                        <Image
                        src={songfess.image}
                        width={33}
                        height={33}
                        alt="Song Image"
                        draggable={false}
                        className="rounded-lg"
                        />

                        <div className="w-full px-2 flex items-center justify-between">

                        <div className="w-full">

                        <p className="text-white text-xs md:text-sm font-medium line-clamp-1">
                            {songfess.songTitle}
                        </p>

                        <p className="text-white text-xs md:text-sm">
                            {songfess.artist}
                        </p>

                        </div>

                        </div>

                        </div>

                        </div>

                        </motion.div>
                        </Link>
                    ))

                ):(

                    <div className="w-[350px] md:w-[400px] bg-white rounded-2xl shadow-md p-5">
                        Tidak ada songfess yang terkirim
                    </div>

                )}

                </motion.div>
            </div>

        </section>

        </>
    )
}