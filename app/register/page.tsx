"use client";

import Footer from "@/components/ui/Footer";
import LoginNav from "@/components/ui/LoginNav";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, fullName }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (Array.isArray(data.message)) {
        setErrors(data.message);
      } else if (typeof data.message === "string") {
        setErrors(
          data.message
            .split(/(?=[A-ZÁÉÍÓÚ])/g)
            .map((e: string) => e.trim())
            .filter(Boolean)
        );
      } else {
        setErrors(["Error al registrarse"]);
      }
      return;
    }

    localStorage.setItem("pet_user", JSON.stringify(data.user));
    router.refresh();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LoginNav />

      <main className="flex-1 flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md p-6 bg-white shadow rounded">
          <h1 className="text-2xl font-bold mb-4 text-center">Registro</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nombre completo"
              className="border px-3 py-2 rounded"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border px-3 py-2 rounded"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border px-3 py-2 rounded w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                tabIndex={-1}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Ver contraseña"
                }
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Registrarse
            </button>
            {errors.length > 0 && (
              <ul className="text-red-600 text-sm list-disc pl-5">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            )}
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/login"
                className="text-purple-600 hover:underline font-medium"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
