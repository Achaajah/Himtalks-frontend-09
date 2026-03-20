import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="relative pt-16 lg:pt-24 pb-32 px-6 sm:px-16 md:px-12 lg:px-28 bg-[#F5F1E8]">

      {/* bunga kanan atas */}
      <Image
        src="/himtalks/pink.png"
        width={140}
        height={140}
        alt="decoration"
        className="absolute 
        top-4 right-2 
        sm:top-8 sm:right-6 
        lg:top-10 lg:right-8 
        w-[80px] sm:w-[110px] lg:w-[140px]
        select-none pointer-events-none"
      />

      {/* burung kiri bawah */}
      <Image
        src="/himtalks/buwung.png"
        width={150}
        height={150}
        alt="decoration"
        className="absolute 
        bottom-4 left-2 
        sm:bottom-6 sm:left-4 
        lg:bottom-8 lg:left-10 
        w-[90px] sm:w-[120px] lg:w-[150px]
        select-none pointer-events-none"
      />

      <div className="max-w-6xl mx-auto bg-[#EAEAEA] rounded-2xl shadow-sm p-8 md:p-12">

        <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-10">

          <div className="flex justify-center lg:justify-start">
            <Image
              src="/himtalks/about-us.svg"
              width={420}
              height={420}
              alt="illustration"
              className="w-[260px] sm:w-[340px] lg:w-[420px] h-auto select-none"
            />
          </div>

          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#7A918D] mb-6">
              About Us
            </h1>

            <p className="text-sm sm:text-base leading-7 text-[#3F4F44]">
              Himtalks adalah platform yang bertujuan menjadi penghubung dan
              sarana komunikasi antara pengurus Himtika dengan anggota maupun
              mahasiswa lainnya. Himtalks menyediakan fasilitas untuk
              menyampaikan kritik dan saran yang membangun, serta memungkinkan
              pengiriman pesan anonim.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}