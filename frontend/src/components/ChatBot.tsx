import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, Bot, Loader2, Sparkles, X } from 'lucide-react';
import { motion } from 'framer-motion';

// Initialize Gemini API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

interface ChatBotProps {
    templeName: string;
    templeLocation: string;
    templeDescription: string;
}

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}

const ChatBot = ({ templeName, templeLocation, templeDescription }: ChatBotProps) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: `Jay Shree Krishna! I am your guide for ${templeName}. Ask me anything about its history, timings, or significance.`, sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(true); // Default open for visibility, can make collapsible
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Use gemini-2.5-flash which was verified to work
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    useEffect(() => {
        // Custom scroll logic to manipulate the CONTAINER only, avoiding page scroll.
        if (!chatContainerRef.current) return;

        const container = chatContainerRef.current;
        const lastMessage = messages[messages.length - 1];

        // We want to scroll such that the NEW message is visible.
        // If it's the user's message (usually short), just scroll to bottom.
        // If it's the bot's message (potentially long), try to align top of message to top of container.

        // Timeout ensures DOM is updated before we calculate positions
        setTimeout(() => {
            if (lastMessage?.sender === 'user') {
                // For user messages, simple scroll to bottom is best
                container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
            } else if (lastMessage?.sender === 'bot') {
                // For bot messages, we find the specific element inside the container
                const msgElement = document.getElementById(`msg-${lastMessage.id}`);
                if (msgElement) {
                    // Calculate relative position inside scrolling container
                    // element.offsetTop is relative to offsetParent. 
                    // We simply want to scroll the container so this element is at the top (with a little padding)
                    const topPos = msgElement.offsetTop - container.offsetTop;

                    // But don't scroll past the bottom (handled automatically by browser usually, but good to know)
                    container.scrollTo({ top: Math.max(0, topPos - 20), behavior: 'smooth' });
                }
            }
        }, 100);

    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const prompt = `
                You are a knowledgeable and respectful spiritual guide for the ${templeName} in ${templeLocation}.
                Context about the temple: "${templeDescription}".
                
                The user asks: "${input}".
                
                Answer efficiently, politely, and with a devotional tone (using "Jay Shree Krishna" or similar greetings occasionally).
                Keep answers concise (under 3 sentences) unless asked for detailed history.
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const botMessage: Message = { id: (Date.now() + 1).toString(), text: text, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        } catch (error: any) {
            console.error("Gemini Error:", error);
            let errorMessageText = "Forgive me, I am having trouble connecting to the divine network right now. Please try again.";

            // Helpful debugging for development
            if (error.message?.includes('404')) {
                console.error("Model not found or API key invalid for this model.");
            } else if (error.message?.includes('403')) {
                console.error("API Key not valid or API not enabled.");
            } else if (error.message?.includes('429')) {
                console.error("Rate limit exceeded.");
                errorMessageText = "The divine network is busy with many prayers. Please wait a moment and try again.";
            }

            const errorMessage: Message = { id: (Date.now() + 1).toString(), text: errorMessageText, sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="w-full bg-gradient-to-r from-saffron to-saffron-dark text-white p-4 rounded-2xl shadow-lg flex items-center justify-between hover:shadow-xl transition-all"
            >
                <div className="flex items-center gap-2 font-serif font-bold">
                    <Sparkles size={20} />
                    <span>Ask Temple Guide</span>
                </div>
                <Bot size={24} />
            </button>
        );
    }

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden h-[500px] flex flex-col w-full mx-auto relative">
            {/* Header */}
            <div className="bg-gradient-to-r from-saffron to-saffron-dark p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                        <Bot size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold font-serif leading-tight">Temple Guide</h3>
                        <p className="text-[10px] opacity-80 uppercase tracking-wider">Powered by Dhananjay Narula</p>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                    <X size={18} />
                </button>
            </div>

            {/* Messages Area */}
            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/40 scroll-smooth"
            >
                {messages.map((msg) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={msg.id}
                        id={`msg-${msg.id}`}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                ? 'bg-saffron text-white rounded-br-none'
                                : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                                }`}
                        >
                            {msg.text}
                        </div>
                    </motion.div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex items-center gap-2 text-gray-400 text-xs">
                            <Bot size={14} />
                            <span className="italic">Consulting scriptures...</span>
                            <Loader2 size={12} className="animate-spin" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/60 border-t border-white/50 backdrop-blur-md">
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-inner focus-within:border-saffron focus-within:ring-1 focus-within:ring-saffron/30 transition-all">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask about history, prasad..."
                        className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="p-2 bg-saffron text-white rounded-full hover:bg-saffron-dark disabled:opacity-50 disabled:hover:bg-saffron transition-colors"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
