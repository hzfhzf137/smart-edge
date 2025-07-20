import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../authentications/authContext";
import { FaComments, FaTimes } from "react-icons/fa";
import { authFetch } from "../../utils/authFetch";

const Chatbot = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null); // 👈 Ref for auto-scroll

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  // Fetch previous chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!user) return;

      try {
        const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/chatbot`);
        const data = await res.json();
        setMessages(Array.isArray(data.messages) ? data.messages : []);
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    };

    fetchChatHistory();
  }, [user]);

  // Send message
  const handleSend = async () => {
    if (!userInput.trim() || !user) return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setLoading(true);
    setUserInput("");

    try {
      const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();
      setMessages([
        ...newMessages,
        { sender: "bot", text: data.reply || "No response." },
      ]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Could not get a response from the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Clear chat
  const handleClearChat = async () => {
    if (!window.confirm("Are you sure you want to delete all chat messages?")) return;

    try {
      const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/chatbot`, {
        method: "DELETE",
      });
      if (res.ok) setMessages([]);
      else alert("Failed to clear chat.");
    } catch (err) {
      console.error("Error clearing chat:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
        title="Chat with Smart Edge"
      >
        {isOpen ? <FaTimes /> : <FaComments />}
      </button>

      {isOpen && (
        <div className="w-80 mt-3 bg-white border rounded-lg shadow-lg flex flex-col max-h-[480px]">
          <div className="bg-blue-600 text-white px-4 py-2 font-semibold rounded-t-md">
            💬 Smart Edge Chatbot
          </div>

          <div
            className="flex-1 px-3 py-2 overflow-y-auto space-y-2"
            style={{ maxHeight: "300px" }}
          >
            {!user ? (
              <div className="text-center text-gray-500 py-10">
                Please <span className="font-medium text-blue-600">log in</span> to use the chatbot.
              </div>
            ) : (
              <>
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`text-sm max-w-[80%] px-3 py-2 rounded ${
                      m.sender === "user"
                        ? "ml-auto bg-blue-100 text-right"
                        : "bg-gray-100 text-left"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
                {loading && <div className="text-gray-500 text-sm">Bot is typing...</div>}
                <div ref={messagesEndRef} /> {/* 👈 Auto-scroll target */}
              </>
            )}
          </div>

          {user && messages.length > 0 && (
            <button
              onClick={handleClearChat}
              className="text-sm text-red-600 hover:underline px-3 py-1 text-left"
            >
              🗑️ Clear Chat
            </button>
          )}

          {user && (
            <div className="flex items-center p-2 border-t">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 px-2 py-2 border rounded text-[16px] sm:text-sm" // 👈 Prevent zoom
                style={{ fontSize: "16px" }} // 👈 Force minimum font size on mobile
              />
              <button
                onClick={handleSend}
                className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
                style={{ fontSize: "16px" }} // 👈 Prevent zoom on button
              >
                Send
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
