import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Cormorant_Garamond } from "next/font/google";
import { Poppins } from "next/font/google";
import { Playfair_Display } from "next/font/google";

export const metadata = {
  title: "Himtalks",
  description: "Platform komunikasi HIMTIKA",
};

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
  variable: "--font-playfair",
});
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${playfair.variable} ${cormorant.className} flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]`}>

        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}