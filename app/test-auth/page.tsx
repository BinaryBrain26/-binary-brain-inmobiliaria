"use client";
import { useState } from "react";
import AuthModal from "@/components/auth/AuthModal";

export default function TestAuthPage() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col items-center">
      <nav className="p-4 flex justify-between w-full bg-white rounded-lg shadow-sm mb-10">
        <h1 className="font-bold text-lg">Binary Brain - Test</h1>
        <button 
          onClick={() => setShowAuth(true)}
          className="bg-[#B47B65] text-white px-6 py-2 rounded-full font-bold"
        >
          Iniciar Sesión
        </button>
      </nav>

      <div className="p-10 text-center text-gray-400 italic">
        (Este fondo representa el HOME que está haciendo el otro grupo)
      </div>

      {/* Aquí inyectamos el Sidebar modular */}
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
}