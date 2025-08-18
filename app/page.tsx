"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center bg-black">
        {/* header */}
        <div className="w-full px-5 py-4 flex items-center justify-between font-goldman">
          <h1 className="font-goldman tracking-widest text-xl sm:text-2xl">Second Brain</h1>
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/login" className="text-white hover:text-blue-400">Log in</Link>
            <Link href="/register" className="bg-blue-800 hover:bg-blue-600 transition-colors duration-300 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg font-semibold">Get SecondBrain Free</Link>
            <a href="#" className="text-gray-400 hover:text-white px-2 py-1 rounded-xl">Github</a>
          </div>
        </div>
{/* ---------------------------- */}

        {/* main island */}
        <div className="flex flex-col items-center w-full animate-fade-in px-4">
          {/* Hero Section Animation */}
          <div className="relative flex items-center justify-center w-full h-72 sm:h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-gray-900 opacity-60 rounded-3xl blur-2xl animate-gradient-move"></div>
            <Image
              src="/images/brain-circuit.png"
              alt="Second Brain Logo"
              width={160}
              height={160}
              className="z-10 animate-bounce-slow"
              priority
            />
          </div>
          {/* Animated tagline */}
          <h2 className="mt-8 text-3xl sm:text-4xl font-bold text-white text-center animate-slide-up font-goldman tracking-wide">
            Unlock your creativity and productivity
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300 text-center max-w-xl animate-fade-in-delay">
            Capture ideas, manage tasks, and organize knowledge in one unified, beautiful workspace.
          </p>
          {/* Animated call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10 animate-slide-up-delay">
            <Link href="/register" className="text-center bg-blue-800 hover:bg-blue-600 transition-colors duration-300 text-white px-6 py-3 rounded-xl shadow-lg font-semibold animate-pulse">
              Get SecondBrain Free
            </Link>
            <a href="#" className="text-center bg-transparent border border-blue-400 text-blue-400 px-6 py-3 rounded-xl hover:bg-blue-400 hover:text-black transition-colors duration-300 font-semibold">
              Request a demo
            </a>
          </div>
        </div>

        <style jsx>{`
          .animate-fade-in {
            animation: fadeIn 1.2s ease;
          }
          .animate-fade-in-delay {
            animation: fadeIn 2s ease 0.7s both;
          }
          .animate-slide-up {
            animation: slideUp 1.2s cubic-bezier(.4,0,.2,1);
          }
          .animate-slide-up-delay {
            animation: slideUp 1.2s cubic-bezier(.4,0,.2,1) 0.7s both;
          }
          .animate-gradient-move {
            animation: gradientMove 6s ease-in-out infinite alternate;
          }
          .animate-bounce-slow {
            animation: bounceSlow 2.5s infinite;
          }
          .animate-pulse {
            animation: pulse 2s infinite;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(60px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes gradientMove {
            0% { background-position: 0% 50%;}
            100% { background-position: 100% 50%;}
          }
          @keyframes bounceSlow {
            0%, 100% { transform: translateY(0);}
            50% { transform: translateY(-20px);}
          }
          @keyframes pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.7);}
            50% { box-shadow: 0 0 30px 10px rgba(59,130,246,0.3);}
          }
        `}</style>
          
        


      </div>
    </>
  )
}
