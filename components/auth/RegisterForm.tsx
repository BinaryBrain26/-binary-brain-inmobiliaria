"use client";

import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, CheckSquare } from "lucide-react";
import PasswordStrength from "./PasswordStrength";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // ── Validaciones ──────────────────────────────────────────
  function validate() {
    const newErrors: Record<string, string> = {};

    if (!nombre.trim())
      newErrors.nombre = "El nombre es obligatorio";

    if (!email.trim())
      newErrors.email = "El correo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Ingresa un correo electrónico válido";

    if (!password)
      newErrors.password = "La contraseña es obligatoria";
    else if (password.length < 8)
      newErrors.password = "La contraseña no cumple los requisitos mínimos";
    else if (!/[A-Z]/.test(password))
      newErrors.password = "Debe incluir al menos una mayúscula";

    if (!confirmPassword)
      newErrors.confirmPassword = "Debes confirmar tu contraseña";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";

    return newErrors;
  }

  // ── Submit ─────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // Aquí Max conectará con el backend (NextAuth)
      // Por ahora solo simulamos el registro
      console.log("Registrando usuario:", { nombre, email });
      await new Promise((res) => setTimeout(res, 1000));
      alert("Registro exitoso — conectar con Max");
    } catch {
      setErrors({ general: "Ocurrió un error. Intentá de nuevo." });
    } finally {
      setLoading(false);
    }
  }

  // ── UI ─────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

      {/* Error general */}
      {errors.general && (
        <p className="text-red-500 text-sm text-center">{errors.general}</p>
      )}

      {/* NOMBRE COMPLETO */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Nombre completo
        </label>
        <div className={`flex items-center border rounded-lg px-3 py-2 gap-2
          ${errors.nombre ? "border-red-500 bg-red-50" : "border-gray-300"}`}>
          <User size={18} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Tu nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full text-sm outline-none bg-transparent"
          />
        </div>
        {errors.nombre && (
          <p className="text-red-500 text-xs">{errors.nombre}</p>
        )}
      </div>

      {/* CORREO ELECTRÓNICO */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Correo electrónico
        </label>
        <div className={`flex items-center border rounded-lg px-3 py-2 gap-2
          ${errors.email ? "border-red-500 bg-red-50" : "border-gray-300"}`}>
          <Mail size={18} className="text-gray-400 shrink-0" />
          <input
            type="email"
            placeholder="Tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-sm outline-none bg-transparent"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email}</p>
        )}
      </div>

      {/* CONTRASEÑA */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Contraseña
        </label>
        <div className={`flex items-center border rounded-lg px-3 py-2 gap-2
          ${errors.password ? "border-red-500 bg-red-50" : "border-gray-300"}`}>
          <Lock size={18} className="text-gray-400 shrink-0" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-sm outline-none bg-transparent"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}
        {/* Indicador de fortaleza */}
        <PasswordStrength password={password} />
      </div>

      {/* CONFIRMAR CONTRASEÑA */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Confirmar contraseña
        </label>
        <div className={`flex items-center border rounded-lg px-3 py-2 gap-2
          ${errors.confirmPassword ? "border-red-500 bg-red-50" : "border-gray-300"}`}>
          <CheckSquare size={18} className="text-gray-400 shrink-0" />
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full text-sm outline-none bg-transparent"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="text-gray-400 hover:text-gray-600"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
        )}
      </div>

      {/* BOTÓN SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg
          hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {loading ? "Creando cuenta..." : "Ingresar a la plataforma"}
      </button>

      {/* LINK A LOGIN */}
      <p className="text-center text-sm text-gray-500">
        ¿Ya tenés una cuenta?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-gray-800 font-semibold hover:underline"
        >
          Iniciar sesión
        </button>
      </p>

    </form>
  );
}