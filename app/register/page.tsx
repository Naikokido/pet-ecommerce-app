"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, fullName }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Error al registrarse");
      return;
    }

    router.refresh(); // recarga estado de la UI
    router.push("/");
  };

  return (
    <main className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="border px-3 py-2 rounded"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border px-3 py-2 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Register
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </main>
  );
}
