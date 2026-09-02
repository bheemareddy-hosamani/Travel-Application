import { useState, useRef, useEffect } from 'react';
import { generateAIResponse } from '../services/aiService';
import { Send, Bot, User, AlertCircle, RefreshCw } from 'lucide-react';
import './Chatbot.css';

const Chatbot = ({ destination }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      content: `Hi! I'm your AI travel assistant for ${destination.name}. How can I help you plan your trip?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    
    const newUserMsg = { id: Date.now(), role: 'user', content: userMessage };
    setMessages(prev => [...prev, newUserMsg]);
    setLoading(true);

    try {
      // Build conversation history for context
      const historyContext = messages.map(m => `${m.role === 'ai' ? 'Assistant' : 'User'}: ${m.content}`).join('\n');
      const prompt = `Context: The user is asking about traveling to ${destination.name}, ${destination.country}.\nConversation history:\n${historyContext}\nUser: ${userMessage}\nAssistant:`;
      const systemInstruction = `You are a helpful and knowledgeable travel assistant. Provide concise, accurate, and engaging answers.`;
      
      const response = await generateAIResponse(prompt, systemInstruction);
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        content: response
      }]);
    } catch (err) {
      setError(err.message || 'Failed to get a response.');
      // Remove the user message so they can try again, or leave it and show error.
      // Better to leave it and let user retry.
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    // Retry last user message
    const lastUserMessage = messages.slice().reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      setInput(lastUserMessage.content);
      // Remove it from history to resend cleanly
      setMessages(prev => prev.filter(m => m.id !== lastUserMessage.id));
      setError(null);
    }
  };

  const suggestedQuestions = [
    "What should I see?",
    "When is the best time to visit?",
    "What food should I try?"
  ];

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <Bot size={20} />
        <h4>Ask your travel assistant</h4>
      </div>
      
      <div className="chatbot-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.role}`}>
            <div className="message-avatar">
              {msg.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className="message-bubble">
              {msg.content}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="message-wrapper ai">
            <div className="message-avatar"><Bot size={16} /></div>
            <div className="message-bubble typing">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}

        {error && (
          <div className="chatbot-error">
            <AlertCircle size={16} />
            <span>{error}</span>
            <button onClick={handleRetry} className="retry-text-btn">
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && !loading && (
        <div className="suggested-questions">
          {suggestedQuestions.map(q => (
            <button 
              key={q} 
              className="suggestion-btn"
              onClick={() => setInput(q)}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSend} className="chatbot-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask anything about ${destination.name}...`}
          disabled={loading}
          className="chat-input"
        />
        <button type="submit" disabled={!input.trim() || loading} className="chat-send-btn">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
