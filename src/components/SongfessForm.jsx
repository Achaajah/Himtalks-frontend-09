"use client";
import Image from "next/image";
import { Fragment, useState, useRef, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/20/solid";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const API_BASE = "http://localhost:8080";

export default function SongfessForm() {
  // Tambahan Raika
  const [showOverlay, setShowOverlay] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(30); // default 30 detik
  const [audio, setAudio] = useState(null);
  const [errors, setErrors] = useState({
    startTime: "",
    endTime: "",
  });

  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  // Data lagu hasil pencarian
  const [songs, setSongs] = useState([]);
  // Data form Songfess
  const [formData, setFormData] = useState({
    name: "",
    recipient: "",
    message: "",
    startTime: "",
    endTime: "" ,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const audioRef = useRef(null);
  const textareaRef = useRef(null);
  const [message, setMessage] = useState("");

  const [isClicked, setIsClicked] = useState(false);

  // Raika, untuk menambahkan default song pada informasi lagu jika lagu belum dipilih
  const defaultSong = {
    name: "No song selected",
    artists: ["Unknown Artist"],
    duration_ms: 0,
    album: {
      images: [{ url: "/songfess/image-default-spotify.png" }],
    },
  };
  // Jika belum memilih lagu, pakai defaultSong di bawah dropdown
  const songToShow = selected || defaultSong;

  // untuk menampilkan data waktu durasi lagunya
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  // Pencarian ke API Spotify
  async function searchSongs() {
    if (!query.trim()) return;
    try {
      const response = await fetch(
        `${API_BASE}/api/spotify/search?q=${encodeURIComponent(query)}`,
      );
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  }

  // Jalankan pencarian setiap kali query berubah
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchSongs();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  // (Bang Raika) menjalankan lagu saat lagu dipilih
  useEffect(() => {
    if (!selected || !audioRef.current) return;

    if (selected.preview_url) {
      audioRef.current.pause();
      audioRef.current.src = selected.preview_url;
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5;

      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }

    setIsPlaying(false);
  }, [selected]);

  // (Bang Raika) mengontrol pause/play
const handlePlayPause = () => {
  if (!selected?.preview_url) {
    alert("Lagu ini tidak punya preview 😢");
    return;
  }

  if (!audioRef.current) return;

  if (isPlaying) {
    audioRef.current.pause();
    setIsPlaying(false);
  } else {
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => alert("Gagal play audio"));
  }
};

  // (Raika) Untuk pengaturan hiddenkan icon play ketika lagu menyala
  // useEffect(() => {
  //     if (isPlaying && selected) {
  //         setShowOverlay(true);
  //         const timer = setTimeout(() => {
  //             setShowOverlay(false);
  //         }, 2000);

  //         return () => clearTimeout(timer); // Hapus timer saat berubah state
  //     } else {
  //         setShowOverlay(true); // Tetap tampil saat pause atau belum ada lagu
  //     }
  // }, [isPlaying, selected]);
  useEffect(() => {
    if (isPlaying && selected) {
      setShowOverlay(true); // Munculkan overlay saat play
      const timer = setTimeout(() => {
        setShowOverlay(false); // Hilangkan overlay setelah 3 detik
      }, 3000);

      return () => clearTimeout(timer); // Hapus timer saat state berubah
    } else {
      setShowOverlay(true); // Saat pause atau belum ada lagu, overlay tetap muncul
    }
  }, [isPlaying]);

  // Pilih lagu dari hasil pencarian
  function handleSelectSong(song) {
    console.log("Selected song:", song); // Cek isi data
    setSelected(song);
    // setIsPlaying(true);
    setFormData((prev) => ({
  ...prev,
  startTime: "",
  endTime: "",
}));
  }

  // Filter lagu berdasarkan input
  const filteredSongs =
    query === ""
      ? []
      : songs.filter(
          (song) =>
            song.name?.toLowerCase().includes(query.toLowerCase()) ||
            song.artists?.some((a) =>
              a.name.toLowerCase().includes(query.toLowerCase()),
            ),
        );

  // (Kang Jibran) Preview lagu (jika ada preview_url)
  function handlePreview() {
    if (selected?.preview_url && audioRef.current) {
      audioRef.current.src = selected.preview_url;
      audioRef.current.play();
    }
  }

  // (Raika) Fungsi validasi format waktu
 const isValidTimeFormat = (time) => {
  return /^\d{1,2}(\.\d{1,2})?$/.test(time);
};

const convertToSeconds = (time) => {
  if (!time) return 0;

  const parts = time.split(".");
  const minutes = parseInt(parts[0]) || 0;
  const seconds = parseInt(parts[1]) || 0;

  return minutes * 60 + seconds;
};

const validateTimeInput = (name, value) => {
  let newErrors = { ...errors };

  if (!value) {
    newErrors[name] = "";
  } else if (!isValidTimeFormat(value)) {
    newErrors[name] = "Format mm.ss (contoh: 01.30)";
  } else {
    newErrors[name] = "";
  }

  const start = name === "startTime" ? value : formData.startTime;
  const end = name === "endTime" ? value : formData.endTime;

  if (start && end) {
    if (convertToSeconds(end) < convertToSeconds(start)) {
      newErrors.endTime = "End harus lebih besar dari start";
    }
  }

  setErrors(newErrors);
};

  // (Raika) Handle perubahan input
const handleTimeChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  validateTimeInput(name, value);
};

  // Ubah isi form berdasarkan name input
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Atur textarea agar tidak overscroll
  function handleMessageChange(e) {
    handleChange(e);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }

  // function untuk mengatur discard semua input
  const handleChangeDiscard = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDiscard = () => {
    setFormData({
      name: "",
      recipient: "",
      startTime: "",
      endTime: "",
      message: "",
    });
    setSelected(null);
    setMessage("");
    textareaRef.current.style.height = "auto"; // Reset height
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  };

  // Submit Songfess
  async function handleSubmit(e) {
    e.preventDefault();

    if (errors.startTime || errors.endTime) {
      setSubmitStatus("validateTime"); // Tampilkan pesan error
      setTimeout(() => setSubmitStatus(null), 3000); // Hilangkan setelah 3 detik
      return;
    }
    if (!selected) return alert("Silakan pilih lagu terlebih dahulu.");

    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch(`${API_BASE}/songfess`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: formData.message,
          song_id: selected.id,
          song_title: selected.name,
          artist: selected.artists.map((a) => a.name).join(", "),
          album_art: selected.album.images[0]?.url || "",
          start_time: convertToSeconds(formData.startTime),
          end_time: convertToSeconds(formData.endTime),
          sender_name: formData.name,
          recipient_name: formData.recipient,
        }),
      });
      if (response.ok) {
        // Reset form
        setFormData({
          name: "",
          recipient: "",
          message: "",
          startTime: "",
          endTime: "",
        });
        setSelected(null);
        setSongs([]);
        setQuery("");
        setSubmitStatus("success");
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      console.error("Error submitting songfess:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    }
    setIsSubmitting(false);
  }

  return (
    <>
      <section className="relative pt-28 md:pt-36 pb-28 px-6 sm:px-16 md:px-16 lg:px-28 bg-dual text-black transition-all duration-500 selection:bg-purple selection:text-white">
        {/* ...existing hero/heading... */}
<Image
  src="/songfess/image2.svg"
  width="210"
  height="256"
  alt="bear-purple-illustrasion"
  className="absolute w-[100px] h-[100px] top-10 left-5 z-10
  sm:top-12 sm:left-10 sm:w-[100px] sm:h-[100px]
  md:top-16 md:left-16 md:w-[100px] md:h-[200px]
  lg:top-62 lg:left-85
  transition-all duration-500"
/>
        <Image
          src="/songfess/image3.svg"
          width="105"
          height="128"
          alt="bear-yellow-illustrasion"
          className="absolute top-[320px] z-10 right-0 sm:top-52 sm:right-0 md:top-72 md:right-5 lg:top-68 lg:right-85 transition-all duration-500"
        />

        <h1 className="font-[Caveat] font-bold max-w-md text-5xl md:max-w-xl lg:max-w-full sm:text-6xl md:text-[64px] lg:text-7xl text-purple mt-4 mb-4 sm:mb-2 transition-all duration-500 mx-auto text-center">
          Send your songfess on Himtalks
        </h1>
        <p className="font-medium text-sm md:text-base text-center text-darkPurple leading-6 sm:leading-7 mt-7 lg:mt-8 max-w-sm sm:max-w-md lg:max-w-3xl flex justify-center mx-auto transition-all duration-500">
          Jangan simpan ceritamu sendiri. Biarkan musik menjadi jembatan untuk
          menyampaikan perasaanmu.
        </p>
        <div className="relative bg-[#7D9A8B] w-full max-w-[520px] mt-24 md:mt-16 px-8 py-10 text-white rounded-2xl mx-auto">
          <AnimatePresence>
            {submitStatus === "success" && (
              <motion.div
                className="z-20 top-24 sticky mb-4 p-3 bg-green-200 text-green-800 rounded-md"
                initial={{ opacity: 0, y: -10 }} // Mulai dari transparan dan agak ke atas
                animate={{ opacity: 1, y: 0 }} // Muncul dengan smooth
                exit={{ opacity: 0, y: -10 }} // Menghilang dengan smooth
                transition={{ ease: "easeInOut", duration: 0.5 }} // Efek ease-in-out selama 0.5 detik
              >
                Pesan berhasil terkirim!
              </motion.div>
            )}
            {submitStatus === "error" && (
              <motion.div
                className="z-20 top-24 sticky mb-4 p-3 bg-red-200 text-red-800 rounded-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
              >
                Gagal mengirim pesan. Silakan coba lagi.
              </motion.div>
            )}
          </AnimatePresence>
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <div className="mb-6">
                <h3 className="font-handlee font-bold text-xl font-[Plus Jakarta Sans] cursor-default selection:bg-white selection:text-darkPurple">
                  ♫ Send ur Songfess ♬
                </h3>
              </div>
              <div className="mb-6">
                <label className="text-white font-normal text-sm font-[Plus Jakarta Sans] selection:bg-white selection:text-darkPurple">
                  Enter ur name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Masukkan nama anda (anonymous) ..."
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 font-[Plus Jakarta Sans] font-medium text-sm text-darkPurple rounded-md bg-white p-[11px]  focus:outline-none focus:bg-white focus:placeholder-white placeholder:text-darkPurple/50 placeholder:italic hover:placeholder-darkPurple/90 selection:bg-darkPurple selection:text-white"
                />
              </div>
              <div className="mb-6">
                <label className="text-white font-normal text-sm font-[Plus Jakarta Sans] selection:bg-white selection:text-darkPurple">
                  Recipient name
                </label>
                <input
                  type="text"
                  id="recipient"
                  name="recipient"
                  value={formData.recipient}
                  onChange={handleChange}
                  placeholder="Masukkan nama penerima ..."
                  required
                  className="w-full mt-1 font-[Plus Jakarta Sans] font-medium text-sm text-darkPurple rounded-md bg-white p-[11px] focus:outline-none focus:bg-white focus:placeholder-white  placeholder:text-darkPurple/50 placeholder:italic hover:placeholder-darkPurple/90 selection:bg-darkPurple selection:text-white"
                />
              </div>
              <div className="relative">
                <label className="text-white font-normal text-sm font-[Plus Jakarta Sans] selection:bg-white selection:text-darkPurple">
                  Choose song
                </label>
                <Combobox value={selected} onChange={handleSelectSong}>
                  <div className="relative w-full mt-1">
                    {/* Input Field */}
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white shadow-md text-left focus:outline-none focus:ring-2 focus:ring-darkPurple sm:text-sm">
                      <div className="flex justify-between sm:gap-0 items-center w-full">
                        <Combobox.Input
                          className="w-full font-[Plus Jakarta Sans] font-medium text-sm text-darkPurple rounded-md bg-white p-[11px] focus:outline-none focus:bg-white focus:placeholder-white placeholder:text-darkPurple/50 placeholder:italic hover:placeholder-darkPurple/90 selection:bg-darkPurple selection:text-white"
                          displayValue={(song) =>
                            song
                              ? `${song.name} • ${song.artists.map((a) => a.name).join(", ")}`
                              : ""
                          }
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Masukkan lagu ..."
                        />
                        <Combobox.Button className="flex items-center pr-2">
                          {({ open }) => (
                            <ChevronDownIcon
                              className={clsx(
                                "group size-4 fill-darkPurple transition-transform duration-500",
                                { "rotate-180": open },
                              )}
                              aria-hidden="true"
                            />
                          )}
                        </Combobox.Button>
                      </div>
                    </div>

                    {/* Option List */}
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      afterLeave={() => setQuery("")}
                    >
                      <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50 custom-scrollbar">
                        {filteredSongs.length === 0 && query !== "" ? (
                          <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                            No Results.
                          </div>
                        ) : (
                          filteredSongs.map((song) => (
                            <Combobox.Option
                              key={song.id}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-2 px-4 ${active ? "bg-purple text-white" : "text-gray-900"}`
                              }
                              value={song}
                            >
                              {({ selected, active }) => (
                                <div className="flex items-center gap-2 md:gap-3">
                                  {/* Gambar Lagu */}
                                  <div className="w-12 h-12 flex-shrink-0">
                                    <Image
                                      src={
                                        song.album.images[0]?.url ||
                                        "/songfess/image-default-spotify.png"
                                      }
                                      alt={song.name}
                                      width={100}
                                      height={100}
                                      className="w-full h-full object-cover rounded-md"
                                    />
                                  </div>

                                  {/* Judul dan Artist */}
                                  <div className="flex justify-between gap-2 sm:gap-0 items-center w-full">
                                    <div className="ml-1 flex flex-col">
                                      <p
                                        className={`truncate text-xs md:text-sm font-medium ${active ? "text-white" : "text-black"}`}
                                      >
                                        {song.name}
                                      </p>
                                      <p
                                        className={`text-[10px] leading-3 md:text-xs ${active ? "text-white" : "text-gray-500"}`}
                                      >
                                        {song.artists
                                          .map((a) => a.name)
                                          .join(", ")}{" "}
                                        ‧ {formatDuration(song.duration_ms)}
                                      </p>
                                    </div>
                                    {selected && (
                                      <span
                                        className={`${active ? "text-white" : "text-darkPurple"}`}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </Transition>
                  </div>
                </Combobox>
              </div>

              <div className="mb-6 mt-2">
                <div
                  onClick={() => {
                    if (!selected) return;
                    handlePlayPause();
                  }}
                  // if (selected) handlePlayPause();
                  // if (!selected?.preview_url) return; // Jangan lanjut kalau tidak ada preview
                  // handlePlayPause();

                  className={`relative rounded-md flex flex-col cursor-pointer select-none py-2 pl-2 pr-5 group ${selected ? (isPlaying ? "bg-gradient-to-r from-white via-[#F9BCBB] to-[#F37199] transition-colors duration-500" : "bg-white") : "bg-gradient-to-r from-white via-slate-200 to-slate-400"}`}
                >
                  <div className="flex w-full items-center gap-1 md:gap-3">
                    {/* Gambar Lagu */}
                    <div className="relative max-w-12 max-h-12 flex-shrink-0">
                      <Image
                        src={
                          songToShow.album.images[0].url ||
                          "/songfess/image-default-spotify.png"
                        }
                        alt={songToShow.name}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover rounded-md"
                      />
                      {selected && showOverlay && (
                        <div
                          className={clsx(
                            "absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-md cursor-pointer transition-all duration-500",
                            showOverlay ? "opacity-100" : "opacity-0",
                          )}
                        >
                          {isPlaying ? (
                            <PauseIcon className="w-5 h-5 text-white transition-all duration-500" />
                          ) : (
                            <PlayIcon className="w-5 h-5 text-white transition-all duration-500" />
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between gap-2 sm:gap-0 items-center w-full min-w-0">
                      {/* Judul dan Artist */}
                      <div
                        className={`ml-1 flex flex-col ${isPlaying ? "w-full flex-grow" : "w-full flex-none"} min-w-0`}
                      >
                        <p
                          className={`truncate text-xs md:text-sm font-medium text-black max-w-full overflow-hidden whitespace-nowrap`}
                        >
                          {songToShow.name}
                        </p>
                        <span
                          className={`text-[10px] md:text-xs text-gray-500`}
                        >
                          {songToShow.artists.map((a) => a.name).join(", ")} ‧{" "}
                          {formatDuration(songToShow.duration_ms)}
                        </span>
                      </div>

                      {/* 🔊 Audio Wave Animation (Muncul saat isPlaying true) */}
                      <div
                        className={`sound-wave ${isPlaying ? "show opacity-100" : "opacity-0"}`}
                      >
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            style={{ animationDelay: `${i / 6}s` }}
                          ></i>
                        ))}
                      </div>
                      <audio ref={audioRef} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 mt-6 relative">
                <label className="text-white font-normal text-sm font-[Plus Jakarta Sans] selection:bg-white selection:text-darkPurple">
                  Song start minute (e.g. 00.00)
                </label>
                <input
                  type="text"
                  id="start minute"
                  name="startTime"
                  placeholder="Masukkan menit awal lagu (cth: 00.00) ..."
                  value={formData.startTime}
                  onChange={handleTimeChange}
                  required
                  className="w-full mt-1 font-[Plus Jakarta Sans] font-medium text-sm text-darkPurple rounded-md bg-white p-[11px]  focus:outline-none focus:bg-white focus:placeholder-white placeholder:text-darkPurple/50 placeholder:italic hover:placeholder-darkPurple/90 selection:bg-darkPurple selection:text-white"
                />
                {errors.startTime && (
                  <p className="absolute text-red-300 font-bold text-xs mt-1">
                    {errors.startTime}
                  </p>
                )}
              </div>

              <div className="mb-6 relative">
                <label className="text-white font-normal text-sm font-[Plus Jakarta Sans] selection:bg-white selection:text-darkPurple">
                  Song end minute (e.g. 00.30)
                </label>
                <input
                  type="text"
                  id="end minute"
                  name="endTime"
                  placeholder="Masukkan menit akhir lagu (cth: 00.30) ..."
                  value={formData.endTime}
                  onChange={handleTimeChange}
                  required
                  className="w-full mt-1 font-[Plus Jakarta Sans] font-medium text-sm text-darkPurple rounded-md bg-white p-[11px]  focus:outline-none focus:bg-white focus:placeholder-white placeholder:text-darkPurple/50 placeholder:italic hover:placeholder-darkPurple/90 selection:bg-darkPurple selection:text-white"
                />
                {errors.endTime && (
                  <p className="absolute text-red-300 font-bold text-xs mt-1">
                    {errors.endTime}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label className="text-white text-sm">Message</label>
                <textarea
                  ref={textareaRef}
                  rows={1}
                  name="message"
                  value={formData.message}
                  onChange={handleMessageChange}
                  placeholder="Type your message ..."
                  required
                  className="w-full mt-1 font-[Plus Jakarta Sans] font-medium text-sm text-darkPurple rounded-md bg-white p-[11px] border-white focus:outline-none focus:bg-white focus:placeholder-white placeholder:text-darkPurple/50 placeholder:italic hover:placeholder-darkPurple/90 selection:bg-darkPurple selection:text-white resize-none overflow-hidden"
                />
              </div>
              <div className="flex max-w-64 w-full gap-4">
                <button
                  onClick={handleDiscard}
                  type="reset"
                  className={`selection:bg-white selection:text-darkPurple transition-all duration-500 font-[Poppins] rounded-md w-full font-medium hover:text-darkPurple py-2 ${isClicked ? "border-2 border-[#5F6F6C80] bg-[#5F6F6C80] hover:bg-[#5F6F6C80]  hover:text-white text-white rounded-lg" : "text-white rounded-lg hover:bg-white active:bg-[#5F6F6C80] active:text-white active:border-[#5F6F6C80] hover:text-darkPurple hover:border-white border-2 border-purple"}`}
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="text-white font-[Poppins] rounded-md w-full bg-purple font-medium hover:bg-white hover:text-darkPurple py-2 transition-all duration-500 selection:bg-white selection:text-purple"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
