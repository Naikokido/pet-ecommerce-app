// app/components/ui/FloatingChat.tsx
"use client";

import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export const FloatingChat = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { text: string; isError?: boolean }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setOpen(!open);

  const getChatResponse = async (prompt: string) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chatbot/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
          signal: AbortSignal.timeout(10000), //tiempo maximo de espera
        }
      );

      const data = await response.json();

      if (response.status === 429) {
        setMessages((prev) => [
          ...prev,
          {
            text: "Has llegado al límite de mensajes diarios que puedes hacer. Por favor explore el catálogo disponible.",
            isError: true,
          },
        ]);
      } else if (response.ok) {
        setMessages((prev) => [...prev, { text: data.answer }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "Ocurrió un error inesperado.", isError: true },
        ]);
      }
    } catch (err) {
      console.error("Error en fetch:", err);
      setMessages((prev) => [
        ...prev,
        { text: "Error de red o del servidor.", isError: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input }]);
    await getChatResponse(input);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={toggleChat}
        className="rounded-full h-14 w-14 p-0 shadow-lg"
        variant="secondary"
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </Button>

      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            layout
            key="chat-box"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="w-80 h-96 bg-white shadow-2xl rounded-2xl absolute bottom-20 right-0 flex flex-col overflow-hidden border"
          >
            <div className="flex-1 p-4 space-y-3 overflow-auto text-sm">
              <div className="text-gray-600 bg-gray-100 p-3 rounded-xl w-fit">
                ¡Hola! ¿En qué puedo ayudarte hoy? 🐾
              </div>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl w-fit ${
                    msg.isError
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-gray-700"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="Escribe tu mensaje..."
              />
              <Button
                type="submit"
                size="sm"
                className="px-4"
                disabled={loading}
              >
                {loading ? "..." : "Enviar"}
              </Button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
