import React, { useState, useEffect } from 'react';
import { authFetch } from '../../utils/authfetch';

const Chatbot = () => {
  const [chatLog, setChatLog] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch chat history on mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/chatbot`);
        const data = await res.json();
        setChatLog(data);
      } catch (err) {
        console.error('Error fetching chat history:', err);
      }
    };

    fetchChatHistory();
  }, []);

  // Handle user input submit
  const handleSend = async (e) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    const newUserMessage = { sender: 'user', message: userInput };
    setChatLog((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const res = await authFetch(`${import.meta.env.VITE_API_BASE_URL}/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();
      const botMessage = { sender: 'bot', message: data.message };

      setChatLog((prev) => [...prev, botMessage]);
      setUserInput('');
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = async () => {
    try {
      await authFetch(`${import.meta.env.VITE_API_BASE_URL}/chatbot`, {
        method: 'DELETE',
      });
      setChatLog([]);
    } catch (err) {
      console.error('Error clearing chat:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f24] text-white px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">SmartEdge AI Assistant</h1>
      <div className="bg-[#11182f] rounded-lg p-4 h-[60vh] overflow-y-auto mb-4 shadow">
        {chatLog.length === 0 ? (
          <p className="text-gray-400">No messages yet.</p>
        ) : (
          chatLog.map((entry, index) => (
            <div key={index} className={`mb-3 ${entry.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span
                className={`inline-block px-3 py-2 rounded-lg ${
                  entry.sender === 'user' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-white'
                }`}
              >
                {entry.message}
              </span>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-1 bg-[#11182f] border border-gray-700 rounded px-4 py-2 text-white focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-white font-semibold"
        >
          {isLoading ? 'Thinking...' : 'Send'}
        </button>
        <button
          type="button"
          onClick={handleClearChat}
          className="ml-2 bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded text-white"
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
