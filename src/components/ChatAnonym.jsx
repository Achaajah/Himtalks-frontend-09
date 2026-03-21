"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { motion, AnimatePresence } from "framer-motion";
import clsx from 'clsx'

// API base URL
const API_BASE = "http://localhost:8080";

// object untuk isi dropdown Kategori Pesan
const pilihan = [
    { id: 1, name: 'Kritik', value: 'kritik' },
    { id: 2, name: 'Saran', value: 'saran' }
]

export default function ChatAnonym() {
    const [isClicked, setIsClicked] = useState(false);
    const [selected, setSelected] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        recipient: "",
    });
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
    const textareaRef = useRef(null);
    
    // function untuk mengatur discard semua input
    const handleChangeDiscard = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleDiscard = () => {
        setFormData({ name: "", recipient: ""});
        setSelected(null);
        setMessage("");
        textareaRef.current.style.height = "auto"; // Reset height
        setIsClicked(true);
        
        setTimeout(() => {
            setIsClicked(false);
        }, 2000)
    };

    // function untuk textarea supaya menurun kebawah dan tidak ada scroll bar
    const handleChange = (e) => {
        setMessage(e.target.value);
        textareaRef.current.style.height = "auto"; // Reset height
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Sesuaikan dengan konten
    };

    // Fungsi untuk menangani submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validasi input
        if (!message.trim()) {
            alert("Pesan tidak boleh kosong");
            return;
        }
        
        if (!selected) {
            alert("Silakan pilih kategori pesan");
            return;
        }
        
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        try {
            const response = await fetch(`${API_BASE}/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: message,
                    sender_name: formData.name || "Anonymous",
                    recipient_name: formData.recipient || "HIMTI",
                    category: selected.value, // Gunakan value (lowercase) agar sesuai format API
                }),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log("Message submitted successfully:", result);
            
            // Reset form setelah berhasil
            setFormData({ name: "", recipient: "" });
            setSelected(null);
            setMessage("");
            textareaRef.current.style.height = "auto";
            
            setSubmitStatus('success');
            setTimeout(() => setSubmitStatus(null), 5000);
            
        } catch (error) {
            console.error("Error submitting message:", error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section className=" relative pt-36 pb-28 px-6 lg:px-28 bg-[#F3EDE4] text-[#5E6F64]">
                {/* Existing SVG/Image components */}
<Image
  src="/songfess/image2.svg"
  width="210"
  height="256"
  alt="bear-purple-illustrasion"
  className="absolute w-[200px] h-[200px] top-10 left-5 z-10
  sm:top-12 sm:left-10 sm:w-[100px] sm:h-[100px]
  md:top-16 md:left-16 md:w-[100px] md:h-[200px]
  lg:top-60 lg:left-90
  transition-all duration-500"
/>
        <Image
          src="/songfess/image3.svg"
          width="105"
          height="128"
          alt="bear-yellow-illustrasion"
          className="absolute top-[320px] z-10 right-0 sm:top-52 sm:right-0 md:top-72 md:right-5 lg:top-66 lg:right-90 transition-all duration-500"
        />
                <h1 className="font-serif italic font-semibold text-6xl text-[#6B7C72] text-center">
                    Speak freely, stay anonymous
                </h1>
<p className="text-center text-[#7A8B80] mt-6 max-w-xl mx-auto">
Kirimkan pesanmu tanpa mengungkap identitas melalui fitur Pesan Anonim
</p>

                <div className="bg-[#7F9A8C] w-full max-w-[500px] mt-16 p-8 text-white rounded-2xl mx-auto shadow-lg">
                    <AnimatePresence>
                        {submitStatus === 'success' && (
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
                        {submitStatus === 'error' && (
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
                            <div className="w-full ">
                                <div className="mb-6">
                                    <h3 className="text-center font-serif italic text-xl mb-6">
                                    Send ur Anonym Chat
                                    </h3>
                                </div>
                                <div className="mb-6">
                                    <label className="text-white font-normal text-sm font-[Plus Jakarta Sans] selection:bg-white selection:text-darkPurple">Enter ur name</label>
                                    <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChangeDiscard}
                                    placeholder="Enter your name"
                                    className="w-full mt-2 rounded-md bg-white text-gray-700 p-3 text-sm focus:outline-none"
                                    />
                                </div>
                                <div className="mb-6 relative">
                                    <label className="text-white font-normal text-sm font-[Plus Jakarta Sans] selection:bg-white selection:text-darkPurple">Recipient name</label>
                                    <input
                                    type="text"
                                    name="recipient"
                                    value={formData.recipient}
                                    onChange={handleChangeDiscard}
                                    placeholder="Enter recipient name"
                                    className="w-full mt-2 rounded-md bg-white text-gray-700 p-3 text-sm focus:outline-none"
                                    />
                                </div>
                                <div className="mb-6 relative">
                                    <label className="text-white font-normal text-sm font-[Plus Jakarta Sans] selection:bg-white selection:text-darkPurple">Message category</label>
                                    <Listbox value={selected} onChange={setSelected}>
                                        {/* Existing Listbox implementation */}
                                        {({ open }) => (
                                            <div>
                                                <ListboxButton
                                               className={clsx(
                                                "relative w-full bg-white text-gray-700 rounded-md p-3 mt-1 text-sm text-left",
                                                selected
                                                ? "font-semibold"
                                                : "text-gray-400 italic"
                                                )}
                                                >
                                                {selected ? selected.name : "Pilih kategori ..."}
                                                <ChevronDownIcon
                                                    className={clsx(
                                                    "pointer-events-none absolute top-3 right-3 size-4 text-gray-500 transition-transform",
                                                    { "rotate-180": open }
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                </ListboxButton>

                                                <AnimatePresence>
                                                    {open && (
                                                        <ListboxOptions
                                                            static
                                                            as={motion.div}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            transition={{ duration: 1 }}
                                                            className="w-full mt-2 rounded-md bg-white shadow-md p-1 focus:outline-none"
                                                        >
                                                            {pilihan.map((person) => (
                                                                <ListboxOption
                                                                    key={person.id}
                                                                    value={person}
                                                                    className="group flex cursor-pointer items-center gap-2 rounded-lg py-2 px-3 select-none data-[focus]:bg-gray-100"
                                                                >
                                                                    <CheckIcon className="invisible size-5 text-gray-600 group-data-[selected]:visible" />
                                                                   <div className="text-sm text-gray-700">{person.name}</div>
                                                                </ListboxOption>
                                                            ))}
                                                        </ListboxOptions>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )}
                                    </Listbox>
                                </div>
                                <div className="mb-6 relative">
                                    <label className="text-white font-normal text-sm font-[Plus Jakarta Sans] selection:bg-white selection:text-darkPurple">
                                        Message
                                    </label>
                                    <textarea
                                        ref={textareaRef}
                                        id="message"
                                        name="message"
                                        placeholder="Type ur message ..."
                                        required
                                        value={message}
                                        onChange={handleChange}
                                        className="w-full mt-2 rounded-md bg-white text-gray-700 p-3 text-sm resize-none focus:outline-none"
                                        rows={1}
                                    />      
                                </div>
                                <div className="flex max-w-64 w-full gap-4">
                                    <button 
                                        onClick={handleDiscard} 
                                        type="button" 
                                        name="discard" 
                                        className={`selection:bg-white selection:text-darkPurple transition-all duration-500 font-[Poppins] rounded-md w-full border border-white text-white py-2 rounded-md hover:bg-white hover:text-[#7F9A8C] transition }`} 
                                    >
                                        Discard
                                    </button>
                                    <button 
                                        type="submit" 
                                        name="submit" 
                                        disabled={isSubmitting}
                                        className="w-full bg-[#5F6F65] text-white py-2 rounded-md hover:bg-[#4F5E56] transition"
                                    >
                                        {isSubmitting ? "Mengirim..." : "Submit"}
                                    </button>
                                </div>
                            </div>
                    </form>
                </div>
            </section>
        </>
    );
}