"use client";

import { useState } from "react";

type Message = {
  text: string;
  sender: "me" | "you";
};

export default function Week6() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sender, setSender] = useState<"me" | "you">("me");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender }]);
    setInput("");
  };

  return (
    <>
      <h1>Chat</h1>
      <div className="flex flex-col mx-auto">
        {/* Chat container */}
        <div className="overflow-y-auto p-4 space-y-2 h-[80vh] max-w-[400px] bg-gray-100 rounded-t-xl">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  msg.sender === "me"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        {/* Input and user select */}
        <div className="p-4 bg-white border-t flex gap-2 rounded-b-xl">
          <select
            value={sender}
            onChange={(e) => setSender(e.target.value as "me" | "you")}
            className="p-2 border rounded-lg text-background"
          >
            <option value="me">Me</option>
            <option value="you">You</option>
          </select>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="flex-1 p-2 border rounded-lg text-gray-900"
            placeholder="Escribe un mensaje..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
