import Image from "next/image";

export default function Home() {
  return (
    <div className="relative">
      <div className="h-screen flex justify-center items-center text-white relative">
        <Image
          className="hidden md:block cursor-pointer absolute inset-0"
          layout="fill"
          objectFit="cover"
          src="/images/HACKATHON.png"
          alt="Robot logo"
        />
        <div className="z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to ICT HACKATON 2024</h1>
          <p className="text-lg md:text-xl mb-8">CHAMPION TECH BARNEY</p>
          <button className="bg-white text-gray-800 px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition duration-300 shadow-lg">Chat Barney</button>
          <div className="absolute bottom-0 left-0 right-0 mb-6 text-center">
            <p className="text-sm text-gray-200">Organized by I love you, you love me? - B A R N E Y.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
