import React, { useState, useRef, useEffect } from 'react';
import { MicrophoneIcon, SendIcon, SpinnerIcon } from './ui/Icons';
import * as api from '../services/api';

interface Message {
  id: number;
  author: 'user' | 'ai';
  text: string;
  citations?: { id: number; text: string }[];
}

const SemanticSearch: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting from AI
    setIsAiTyping(true);
    api.getInitialGreeting().then(initialMessage => {
      setMessages([initialMessage]);
      setIsAiTyping(false);
    });
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isAiTyping) return;

    const newUserMessage: Message = {
      id: Date.now(),
      author: 'user',
      text: input,
    };
    setMessages(prev => [...prev, newUserMessage]);
    const currentInput = input;
    setInput('');
    setIsAiTyping(true);

    try {
      const aiResponseMessage = await api.getSemanticSearchResult(currentInput);
      setMessages(prev => [...prev, aiResponseMessage]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        author: 'ai',
        text: "I'm sorry, but I encountered an error while processing your request. Please try again.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAiTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Semantic Search</h1>
        <p className="text-nasa-medium-gray mt-2">Your AI-powered research assistant for space biology.</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-4 -mr-4 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-4 ${msg.author === 'user' ? 'justify-end' : ''}`}>
            {msg.author === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-nasa-dark-soft flex items-center justify-center border border-nasa-border flex-shrink-0">
                <img src="https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg" alt="NASA Bio-AI" className="w-6 h-6" />
              </div>
            )}
            <div className={`flex flex-col ${msg.author === 'user' ? 'items-end' : 'items-start'}`}>
              <p className="font-semibold text-sm mb-1">{msg.author === 'ai' ? 'NASA Bio-AI' : 'Dr. Emily Carter'}</p>
              <div className={`max-w-xl p-4 rounded-lg ${msg.author === 'ai' ? 'bg-nasa-dark-soft' : 'bg-nasa-blue text-white'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {msg.citations && (
                  <div className="mt-4 pt-4 border-t border-nasa-border/50 text-xs text-nasa-medium-gray space-y-2">
                    {msg.citations.map(c => (
                      <p key={c.id}>[{c.id}] {c.text}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {msg.author === 'user' && (
              <img src="https://picsum.photos/id/1027/200/200" alt="Dr. Emily Carter" className="w-8 h-8 rounded-full flex-shrink-0" />
            )}
          </div>
        ))}
         {isAiTyping && (
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-nasa-dark-soft flex items-center justify-center border border-nasa-border flex-shrink-0">
              <img src="https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg" alt="NASA Bio-AI" className="w-6 h-6" />
            </div>
            <div className="flex flex-col items-start">
              <p className="font-semibold text-sm mb-1">NASA Bio-AI</p>
              <div className="max-w-xl p-4 rounded-lg bg-nasa-dark-soft">
                <div className="flex items-center space-x-2 text-nasa-medium-gray">
                  <SpinnerIcon className="h-4 w-4" />
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="mt-6">
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a follow-up question or enter a new query..."
            className="w-full bg-nasa-dark-soft border border-nasa-border rounded-lg py-3 pl-5 pr-32 text-white focus:outline-none focus:ring-2 focus:ring-nasa-blue transition-shadow"
            aria-label="Chat input"
            disabled={isAiTyping}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
             <button type="button" className="text-nasa-medium-gray hover:text-white transition-colors" aria-label="Use microphone">
                <MicrophoneIcon />
            </button>
            <button
              type="submit"
              className="bg-nasa-blue hover:bg-nasa-blue-hover text-white font-semibold py-2 px-4 rounded-md flex items-center ml-2 transition-colors disabled:opacity-50"
              disabled={input.trim() === '' || isAiTyping}
              aria-label="Send message"
            >
              Send
              <SendIcon className="ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SemanticSearch;