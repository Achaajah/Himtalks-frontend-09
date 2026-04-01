"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForumDetail() {
const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [forum, setForum] = useState(null);
  const [comments, setComments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  const [username, setUsername] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [avatar, setAvatar] = useState(null);
  const [tempAvatar, setTempAvatar] = useState(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const [showScrollTop, setShowScrollTop] = useState(false);

  const avatarList = Array.from(
    { length: 14 },
    (_, i) => `/avatar/${i + 1}.png`
  );
useEffect(() => {
  const timer = setInterval(() => {
    const el = document.getElementById("comment");
    if (window.location.hash === "#comment" && el) {
      el.scrollIntoView({ behavior: "smooth" });
      clearInterval(timer);
    }
  }, 100);

  return () => clearInterval(timer);
}, []);

  useEffect(() => {
  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 300);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
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
          text: "Lorem ipsum dolor sit amet consectetur.",
          avatar: avatarList[i % avatarList.length],
        }))
      );

      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleStartTyping = () => {
    if (!avatar) return alert("Pilih avatar dulu ya!");
    if (username.trim() === "") return alert("Masukkan username dulu!");
    setIsTyping(true);
  };

  const handleSendComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      user: username,
      avatar,
      time: "baru saja",
      text: commentText,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3EEE6]">
        
        <img
          src="/New folder/burung-mikir.svg"
          className="w-40 mb-4 animate-bounce"
          alt="loading"
        />

        <div className="w-10 h-10 border-4 border-[#5E6F69] border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-4 text-[#5E6F69] text-sm">
          Menyiapkan diskusi...
        </p>

      </div>
    );
  }

  if (!forum) return null;

  return (
    <section className="bg-[#E7DFD5] mt-20 min-h-screen px-6 lg:px-24 py-16">
      
      <Link href="/himtalks/mini-forum" className="text-gray-600 mb-10 block">
        ← Return to discussion list
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* POST */}
          <div className="bg-white p-6 rounded-3xl shadow-md">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <p className="text-sm text-gray-600">
                  Himtalks • 5 mnt ago
                </p>
              </div>

              <div className="text-xs px-3 py-1 border rounded-full text-gray-500">
                19:00 - 21:00 WIB
              </div>
            </div>

            <h1 className="text-xl font-serif text-[#5E6F64] mb-2">
              {forum.title}
            </h1>

            <p className="text-sm text-gray-600 mb-2">
              {forum.content}{" "}
              <span className="text-[#5E6F64] cursor-pointer">
                ...Lihat Selengkapnya
              </span>
            </p>

            <Image
              src={forum.image}
              width={600}
              height={300}
              className="rounded-2xl"
              alt=""
            />
            <button
            onClick={() => {
              const el = document.getElementById("comment");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });}}}
            className="bg-primary rounded-2xl shadow-md p-2 relative border border-gray-100 
            hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer">
            💬 {comments.length} Komentar
            </button>
          </div>

          {/* INPUT */}
<div id="comment"
className="bg-white p-5 rounded-2xl shadow flex flex-col gap-4">

  {/* HEADER */}
  <div className="flex justify-between items-center">
    <p className="text-[#5E6F64] font-medium">
      Tuangkan Pikiranmu
    </p>

    {/* DOTS */}
    <div className="flex gap-1">
      <div className="w-2 h-2 bg-[#5E6F64] rounded-full"></div>
      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
    </div>
  </div>

  {!isTyping ? (
    <div className="flex items-center gap-3">

      {/* AVATAR */}
      <div
        onClick={() => setShowAvatarModal(true)}
        className="relative w-10 h-10 rounded-full bg-gray-300 overflow-hidden cursor-pointer"
      >
        {avatar && (
          <Image src={avatar} width={40} height={40} alt="" />
        )}

        {/* ICON PENSIL */}
        <div className="absolute bottom-0 right-0 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
          ✎
        </div>
      </div>

      {/* INPUT */}
      <input
        placeholder="Masukkan Username (Anonim)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="flex-1 border-b outline-none text-sm placeholder:text-gray-400"
      />

      {/* BUTTON */}
      <button
        onClick={handleStartTyping}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition
          ${
            username
              ? "bg-[#5E6F64] text-white"
              : "bg-gray-200 text-gray-500"
          }`}
      >
        →
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-3">

      {/* AVATAR */}
      <div className="relative w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
        {avatar && (
          <Image src={avatar} width={40} height={40} alt="" />
        )}
      </div>

      {/* TEXTAREA STYLE INLINE */}
      <input
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Masukkan Pendapatmu"
        className="flex-1 border-b outline-none text-sm"
      />

      {/* SEND BUTTON */}
      <button
        disabled={!commentText.trim()}
        onClick={handleSendComment}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition
          ${
            commentText
              ? "bg-[#5E6F64] text-white"
              : "bg-gray-200 text-gray-400"
          }`}
      >
        ✈
      </button>
    </div>
  )}
</div>

{/* COMMENTS */}
<div className="bg-white p-6 rounded-2xl shadow">
  <div className="flex justify-between items-center mb-4">
    <h2 className="font-serif text-[#5E6F64]">
      Pikiran yang Dibagikan
    </h2>

    {comments.length > 0 && (
      <button className="text-sm text-gray-500">
        Terbaru ▾
      </button>
    )}
  </div>

  {/* Kalau Tidak Ada Komentar */}
  {comments.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="text-4xl mb-3">🐦</div>

      <p className="text-[#5E6F64] font-serif text-lg">
        Belum ada tanggapan
      </p>

      <p className="text-sm text-gray-400 mt-1">
        Jadilah yang pertama membagikan pikiranmu.
      </p>
    </div>
  ) : (
    <>
      {comments.slice(0, visibleCount).map((c) => (
        <div key={c.id} className="flex gap-3 mb-4 border-b pb-3">
          <Image
            src={c.avatar}
            width={32}
            height={32}
            className="rounded-full"
            alt=""
          />

          <div>
            <div className="text-xs text-gray-500">
              <span className="font-medium text-gray-700">
                {c.user}
              </span>{" "}
              • {c.time}
            </div>

            <p className="text-sm text-gray-600">
              {c.text}
            </p>
          </div>
        </div>
      ))}

      {visibleCount < comments.length && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 10)}
          className="w-full bg-[#5E6F64] text-white p-2 rounded-xl text-sm"
        >
          Lihat lebih banyak
        </button>
      )}
    </>
  )}
</div>
        </div>

        {/* RIGHT SIDEBAR */}
{/* <div className="space-y-6"> */}
  <div className="space-y-6 sticky top-24 self-start">

  {/* RINGKASAN */}
 <div className="bg-white p-5 rounded-2xl shadow">
      <h3 className="text-[#5E6F64] font-serif mb-2">
        Ringkasan Diskusi
      </h3>

      <p className="text-sm text-gray-600 leading-relaxed">
        {isOpen ? (
          <>
            Lorem ipsum dolor sit amet consectetur. Viverra adipiscing amet tortor massa.
            Sodales id ullamcorper eget id etiam nibh magna pellentesque mauris.
            Quam elementum amet id libero. Lorem ipsum dolor sit amet consectetur.
            Viverra adipiscing amet tortor massa. Sodales id ullamcorper eget id etiam
            nibh magna pellentesque mauris. Quam elementum amet id libero.
          </>
        ) : (
          <>
            Lorem ipsum dolor sit amet consectetur. Viverra adipiscing amet tortor massa...
          </>
        )}
      </p>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm mt-2 text-[#5E6F64] font-medium hover:opacity-70 transition"
      >
        → {isOpen ? "Tutup" : "Lihat Selengkapnya"}
      </button>
    </div>

  <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
      
      {/* IMAGE */}
      <Image
        src="/New folder/2.jpg"
        width={400}
        height={200}
        className="w-full h-40 object-cover"
        alt=""
      />

      {/* HEADER */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-100"
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border border-gray-500 rounded-sm"></div>
          <h3 className="text-[#5E6F64] font-serif text-lg">
            Panduan Diskusi
          </h3>
        </div>

{open ? (
  <span className="text-gray-500">▲</span>
) : (
  <span className="text-gray-500">▼</span>
)}
      </button>

      {/* CONTENT */}
      {open && (
        <div className="px-5 py-4 text-sm text-gray-600">
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <span className="font-semibold">
                Saling Menghargai:
              </span>{" "}
              Setiap suara berhak didengar dan dipahami.
            </li>

            <li>
              <span className="font-semibold">
                Fokus Tema:
              </span>{" "}
              Pastikan pendapatmu sesuai dengan tema mingguan.
            </li>

            <li>
              <span className="font-semibold">
                No Hate Speech:
              </span>{" "}
              Jaga ruang diskusi tetap nyaman dan aman.
            </li>

            <li>
              <span className="font-semibold">
                Berkomentar yang Sopan:
              </span>{" "}
              Tidak menggunakan kata yang tidak senonoh.
            </li>

            <li>
              Namamu anonim, jadi tidak wajib memasukkan nama asli.
            </li>

            <li>
              Bersifat statis, kamu akan menginput username lagi jika kembali.
            </li>
          </ul>
        </div>
      )}
    </div>

  {/* CARA LAIN */}
  <div>
    <h3 className="text-[#5E6F64] font-serif mb-3">
      Cara Lain untuk Bersuara
    </h3>

    <div className="space-y-3">

      {/* SONGFESS */}
<Link href="/songfess">
  <div className="mb-4 bg-white rounded-xl shadow flex items-center gap-3 p-3 cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-95 transition ">
    <Image
      src="/songfess/image1.svg"
      width={60}
      height={60}
      alt=""
    />
    <div>
      <p className="font-medium text-[#5E6F64]">Songfess</p>
      <p className="text-xs text-gray-500">
        Ekspresikan perasaanmu melalui lagu!
      </p>
    </div>
  </div>
</Link>

      {/* CHAT ANONYM */}
<Link href="/chat-anonym">
  <div className="bg-white rounded-xl shadow flex items-center gap-3 p-3 cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-95 transition">
    <Image
      src="/chat-anonym/bear-purple.svg"
      width={60}
      height={60}
      alt=""
    />
    <div>
      <p className="font-medium text-[#5E6F64]">Chat Anonym</p>
      <p className="text-xs text-gray-500">
        Kirim pesan tanpa identitas!
      </p>
    </div>
  </div>
</Link>

    </div>
  </div>

</div>
      </div>

      {/* MODAL */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-[#EDEBE7] w-125 max-w-[90%] p-6 rounded-3xl">

            <div className="flex justify-between mb-6">
              <h2 className="text-[#5E6F64] font-serif">
                Pilih Foto Profil Kamu
              </h2>
              <button onClick={() => setShowAvatarModal(false)}>✕</button>
            </div>

            <div className="grid grid-cols-7 gap-4 mb-6">
              {avatarList.map((item) => (
                <div
                  key={item}
                  onClick={() => setTempAvatar(item)}
                  className={`w-14 h-14 rounded-full overflow-hidden cursor-pointer
                  ${tempAvatar === item ? "ring-2 ring-[#5E6F64]" : ""}`}
                >
                  <Image src={item} width={56} height={56} alt="" />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAvatarModal(false)}
                className="px-5 py-2 border rounded-full"
              >
                Discard
              </button>

              <button
                onClick={() => {
                  setAvatar(tempAvatar);
                  setShowAvatarModal(false);
                }}
                className="px-5 py-2 bg-[#5E6F64] text-white rounded-full"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {showScrollTop && (
  <button
    onClick={scrollToTop}
    className="fixed bottom-6 right-6 bg-[#7C9487] hover:bg-[#5E6F64] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition"
  >
    ↑
  </button>
)}
    </section>
  );
}