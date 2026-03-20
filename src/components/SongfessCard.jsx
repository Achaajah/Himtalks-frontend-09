
"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function SongfessCard(){

    const [isHover, setIsHover] = useState(false);
    const [isHoverButton2, setIsHoverButton2] = useState(false);
    const [isHoverButton3, setIsHoverButton3] = useState(false);

    const [isHoverCard, setIsHoverCard] = useState(false);
    const [isHoverCard2, setIsHoverCard2] = useState(false);
    const [isHoverCard3, setIsHoverCard3] = useState(false);

    const timeoutRef = useRef(null);
    const timeoutRefButton2 = useRef(null);
    const timeoutRefButton3 = useRef(null);

    const timeoutRefCard = useRef(null);
    const timeoutRefCard2 = useRef(null);
    const timeoutRefCard3 = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsHover(false);
        }, 700);
    };

    const handleMouseEnterButton2 = () => {
        clearTimeout(timeoutRefButton2.current);
        setIsHoverButton2(true);
    };

    const handleMouseLeaveButton2 = () => {
        timeoutRefButton2.current = setTimeout(() => {
            setIsHoverButton2(false);
        }, 700);
    };

    const handleMouseEnterCard = () => {
        clearTimeout(timeoutRefCard.current);
        setIsHoverCard(true);
    };

    const handleMouseLeaveCard = () => {
        timeoutRefCard.current = setTimeout(() => {
            setIsHoverCard(false);
        }, 500);
    };

    const handleMouseEnterCard2 = () => {
        clearTimeout(timeoutRefCard2.current);
        setIsHoverCard2(true);
    };

    const handleMouseLeaveCard2 = () => {
        timeoutRefCard2.current = setTimeout(() => {
            setIsHoverCard2(false);
        }, 500);
    };

    return (
        <section className="pt-20 lg:pt-[135px] pb-28 px-7 md:px-16 lg:px-28 bg-[#EFE9DF]">

            <div className="grid gap-[50px] sm:grid-cols-1 lg:grid-cols-2 max-w-[770px] mx-auto">

                {/* CARD 1 */}
                <div
                    onMouseEnter={handleMouseEnterCard}
                    onMouseLeave={handleMouseLeaveCard}
                    className={`rounded-2xl shadow-lg overflow-hidden transition-all duration-700 group
                    ${isHoverCard ? "bg-[#6F8F80] scale-105" : "hover:bg-[#6F8F80] hover:scale-105 bg-white"}`}
                >

<div className="relative h-[170px] w-full bg-[#DCE6EC] overflow-hidden">

    <Image
        src="/songfess/card2.svg"
        alt="Explore Songfess"
        fill
        className="object-cover"
    />

</div>

                    <div className="px-6 pb-6 pt-8">

                        <h3 className={`mb-3 font-semibold text-xl ${isHoverCard ? "text-white" : "text-[#4F5F58]"}`}>
                            Explore the messages waiting for you.
                        </h3>

                        <p className={`text-sm mb-6 ${isHoverCard ? "text-white" : "text-[#4F5F58]"}`}>
                            Ada pesan yang menunggu untuk kamu dengarkan—temukan Songfess yang ditujukan untukmu.
                        </p>

                        <Link
                            href="/himtalks/songfess/browse-songfess"
                            className="inline-flex items-center gap-2 bg-[#6F8F80] text-white py-2 px-4 rounded-lg"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            Browse Now
                        </Link>

                    </div>
                </div>


                {/* CARD 2 */}
                <div
                    onMouseEnter={handleMouseEnterCard2}
                    onMouseLeave={handleMouseLeaveCard2}
                    className={`rounded-2xl shadow-lg overflow-hidden transition-all duration-700 group
                    ${isHoverCard2 ? "bg-[#6F8F80] scale-105" : "hover:bg-[#6F8F80] hover:scale-105 bg-white"}`}
                >

<div className="relative h-[170px] w-full bg-[#DCE6EC] overflow-hidden">

    <Image
        src="/songfess/card1.svg"
        alt="Explore Songfess"
        fill
        className="object-cover"
    />

</div>

                    <div className="px-6 pb-6 pt-8">

                        <h3 className={`mb-3 font-semibold text-xl ${isHoverCard2 ? "text-white" : "text-[#4F5F58]"}`}>
                            Reveal your untold story. Feel it, sing it.
                        </h3>

                        <p className={`text-sm mb-6 ${isHoverCard2 ? "text-white" : "text-[#4F5F58]"}`}>
                            Jangan simpan ceritamu sendiri. Biarkan musik menjadi jembatan untuk menyampaikan perasaanmu.
                        </p>

                        <Link
                            href="/himtalks/songfess/form-songfess"
                            className="inline-flex items-center gap-2 bg-[#6F8F80] text-white py-2 px-4 rounded-lg"
                            onMouseEnter={handleMouseEnterButton2}
                            onMouseLeave={handleMouseLeaveButton2}
                        >
                            Send Now
                        </Link>

                    </div>
                </div>

            </div>
        </section>
    );
}
