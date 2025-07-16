import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../authentications/authContext";
import { FaComments, FaTimes } from "react-icons/fa";

const Chatbot = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch previous chat history if logged in
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!user) return;

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chatbot`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.messages) {
          setMessages(data.messages);
        }
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
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();
      setMessages([...newMessages, { sender: "bot", text: data.reply }]);
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

  // Clear chat (with confirmation)
  const handleClearChat = async () => {
    const confirmClear = window.confirm("Are you sure you want to delete all chat messages?");
    if (!confirmClear) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chatbot`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setMessages([]);
      } else {
        alert("Failed to clear chat.");
      }
    } catch (err) {
      console.error("Error clearing chat:", err);
      alert("Something went wrong.");
    }
  };

  // Toggle chatbot visibility
  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
        title="Chat with Smart Edge"
      >
        {isOpen ? <FaTimes /> : <FaComments />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 mt-3 bg-white border rounded-lg shadow-lg flex flex-col max-h-[480px]">
          <div className="bg-blue-600 text-white px-4 py-2 font-semibold rounded-t-md">
            💬 Smart Edge Chatbot
          </div>

          <div className="flex-1 px-3 py-2 overflow-y-auto space-y-2" style={{ maxHeight: "300px" }}>
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
              </>
            )}
          </div>

          {/* Clear Button */}
          {user && messages.length > 0 && (
            <button
              onClick={handleClearChat}
              className="text-sm text-red-600 hover:underline px-3 py-1 text-left"
            >
              🗑️ Clear Chat
            </button>
          )}

          {/* Input */}
          {user && (
            <div className="flex items-center p-2 border-t">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 px-2 py-1 border rounded text-sm"
              />
              <button
                onClick={handleSend}
                className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
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
