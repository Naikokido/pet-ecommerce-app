"use client";

import Footer from "@/components/ui/Footer";
import LoginNav from "@/components/ui/LoginNav";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
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
        setErrors(["Error al iniciar sesión"]);
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
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Iniciar sesión
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
              ¿No tienes cuenta?{" "}
              <Link
                href="/register"
                className="text-purple-600 hover:underline font-medium"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
