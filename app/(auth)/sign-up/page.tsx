"use client";

import RegisterForm from "@/components/auth/RegisterForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">

        {/* Pestañas */}
        <div className="flex mb-6 border border-gray-300 rounded-lg overflow-hidden">
          <button className="flex-1 py-2 text-sm font-semibold text-gray-500 bg-white">
            Iniciar sesión
          </button>
          <button className="flex-1 py-2 text-sm font-semibold text-white bg-gray-800">
            Crear cuenta
          </button>
        </div>

        <RegisterForm onSwitchToLogin={() => {}} />

      </div>
    </div>
  );
}