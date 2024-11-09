"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "support";
};

export default function ChatSupport() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "سلام! چطور می‌تونم کمکتون کنم؟", sender: "support" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");

      // Simulate support response
      setTimeout(() => {
        const supportResponse: Message = {
          id: messages.length + 2,
          text: "ممنون از پیامتون تیم پشتیبانی به زودی پاسخ خواهد داد",
          sender: "support",
        };
        setMessages((prevMessages) => [...prevMessages, supportResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        direction: "rtl",
      }}
    >
      {!isOpen && (
        <button
          onClick={handleToggleChat}
          style={{
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            backgroundImage: "url(/operator.png)",
            backgroundSize: "cover",
            border: "none",
            cursor: "pointer",
          }}
        />
      )}

      {isOpen && (
        <div className="flex flex-col h-[600px] w-[380px] mx-auto border rounded-lg shadow-lg bg-white overflow-hidden">
          <div className="p-2 bg-gray-100 border-b border-gray-300 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-teal-500"></span>
              </span>
              پشتیبانی آنلاین
            </h2>
            <button
              onClick={handleToggleChat}
              className="text-2xl text-gray-500 hover:bg-gray-300 rounded w-8 h-8 flex justify-center items-center duration-200"
            >
              ×
            </button>
          </div>
          <ScrollArea
            className="flex-grow p-4 overflow-y-auto"
            ref={scrollAreaRef}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`flex items-start ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className="w-8 h-8 border">
                    <AvatarImage
                      src={
                        message.sender === "user"
                          ? "/placeholder.png"
                          : "/operator1.jpg"
                      }
                    />
                    <AvatarFallback>
                      {message.sender === "user" ? "کاربر" : "پشتیبان"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`mx-2 p-2 text-right rounded-lg text-sm ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    style={{ maxWidth: "300px", wordWrap: "break-word" }}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="p-4 border-t bg-gray-100">
            <div className="flex items-center gap-3">
              <Input
                type="text"
                placeholder="پیام خود را بنویسید..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition duration-150 ease-in-out"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
