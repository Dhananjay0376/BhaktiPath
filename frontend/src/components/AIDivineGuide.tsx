import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Sparkles, Calendar, MapPin, Loader2, X, ChevronRight, CheckCircle2, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyA_-2SV4Amm2L0TobBGa8GI_svCEJdKv5M";
const genAI = new GoogleGenerativeAI(API_KEY);

interface AIDivineGuideProps {
    temples: any[];
    onClose: () => void;
}

const AIDivineGuide = ({ temples, onClose }: AIDivineGuideProps) => {
    const [step, setStep] = useState(1);
    const [days, setDays] = useState('');
    const [origin, setOrigin] = useState('');
    // removed unused loading state relying on step 3 instead
    const [isDownloading, setIsDownloading] = useState(false);
    const [itinerary, setItinerary] = useState('');
    const itineraryRef = useRef<HTMLDivElement>(null);

    const generateItinerary = async () => {
        if (!days || !origin) return;
        setStep(3); // Loading step

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const templeNames = temples.map(t => t.name).join(", ");

            const prompt = `
                You are an expert spiritual travel guide for Braj (Vrindavan/Mathura).
                User details:
                - Coming from: ${origin}
                - Duration: ${days} days
                - Temples to visit: ${templeNames}

                Please create a detailed day-by-day itinerary.
                - Organize the order logically to minimize travel time.
                - Suggest best timings for darshan.
                - Structure the output clearly with "Day 1", "Day 2" as headers.
                - IMPORTANT: Use the following format for specific details:
                  - Start tips with "💡 **Pro Tip:**"
                  - Start spiritual insights with "🕉️ **Spiritual Insight:**"
                  - Start the greeting with "🙏"
                
                Keep the tone warm, devotional, and practical.
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            setItinerary(text);
            setStep(4); // Result step
        } catch (error) {
            console.error("Error generating itinerary:", error);
            setItinerary("Forgive me, I could not connect to the divine network. Please try again later. (Error: API Connection Failed)");
            setStep(4);
        }
    };

    const downloadPDF = async () => {
        if (!itineraryRef.current) return;
        setIsDownloading(true);

        try {
            // Create a clone of the element
            const originalElement = itineraryRef.current;
            const clone = originalElement.cloneNode(true) as HTMLElement;

            // Style the clone to be fully visible (no scroll)
            clone.style.height = 'auto';
            clone.style.maxHeight = 'none';
            clone.style.overflow = 'visible';
            clone.style.position = 'absolute';
            clone.style.top = '-9999px';
            clone.style.left = '-9999px';
            clone.style.width = `${originalElement.offsetWidth}px`; // Maintain width
            clone.style.padding = '40px'; // Add padding for the PDF look

            // Add Branding Header to the clone
            const headerDiv = document.createElement('div');
            headerDiv.style.display = 'flex';
            headerDiv.style.justifyContent = 'space-between';
            headerDiv.style.alignItems = 'center';
            headerDiv.style.marginBottom = '30px';
            headerDiv.style.borderBottom = '2px solid #eab308'; // saffron-500
            headerDiv.style.paddingBottom = '20px';

            headerDiv.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="background: #eab308; padding: 10px; border-radius: 50%;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                        </svg>
                    </div>
                    <div>
                        <h1 style="color: #ea580c; font-size: 28px; font-weight: bold; margin: 0; font-family: serif;">BhaktiPath</h1>
                        <p style="color: #6b7280; margin: 0; font-size: 14px;">Your Divine Journey Guide</p>
                    </div>
                </div>
                <div style="text-align: right;">
                    <p style="color: #4b5563; margin: 0; font-weight: bold;">Divine Itinerary</p>
                    <p style="color: #9ca3af; margin: 0; font-size: 12px;">Generated on ${new Date().toLocaleDateString()}</p>
                </div>
            `;

            clone.insertBefore(headerDiv, clone.firstChild);

            document.body.appendChild(clone);

            const canvas = await html2canvas(clone, {
                scale: 2, // Higher quality
                backgroundColor: '#ffffff',
                windowHeight: clone.scrollHeight
            });

            document.body.removeChild(clone); // Clean up

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            pdf.save('Divine_Journey_Itinerary.pdf');
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    // Helper function to format text with bold parsing
    const formatText = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-saffron to-saffron-dark p-6 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-serif font-bold">Divine Advisor</h2>
                            <p className="text-xs opacity-80 uppercase tracking-wider">AI Powered Itinerary Planner</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-serif text-gray-800 mb-2">Plan Your Sacred Journey</h3>
                                    <p className="text-gray-500">To create the perfect path for you, I need a few details.</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                            <Calendar size={16} className="text-saffron" />
                                            How many days is your trip?
                                        </label>
                                        <input
                                            type="number"
                                            value={days}
                                            onChange={(e) => setDays(e.target.value)}
                                            placeholder="e.g. 2"
                                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                            <MapPin size={16} className="text-saffron" />
                                            Where are you starting from?
                                        </label>
                                        <input
                                            type="text"
                                            value={origin}
                                            onChange={(e) => setOrigin(e.target.value)}
                                            placeholder="e.g. Delhi, Mathura Station, Nidhivan hotel..."
                                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    disabled={!days || !origin}
                                    className="w-full py-4 bg-saffron text-white font-bold rounded-xl shadow-lg shadow-saffron/30 hover:shadow-xl hover:bg-saffron-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none mt-4"
                                >
                                    Next Step <ChevronRight size={20} />
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-serif text-gray-800 mb-2">Confirm Your Pilgrimage</h3>
                                    <p className="text-gray-500">I will plan a route for:</p>
                                </div>

                                <div className="bg-saffron/5 p-6 rounded-2xl border border-saffron/20 space-y-4">
                                    <div className="flex justify-between items-center border-b border-saffron/10 pb-3">
                                        <span className="text-gray-600">Duration</span>
                                        <span className="font-bold text-gray-800">{days} Days</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-saffron/10 pb-3">
                                        <span className="text-gray-600">Starting Point</span>
                                        <span className="font-bold text-gray-800">{origin}</span>
                                    </div>
                                    <div className="flex justify-between items-start pt-1">
                                        <span className="text-gray-600">Temples</span>
                                        <span className="font-bold text-gray-800 text-right max-w-[60%]">{temples.length} Stops</span>
                                    </div>
                                </div>

                                <button
                                    onClick={generateItinerary}
                                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <Sparkles size={20} /> Generate Divine Itinerary
                                </button>
                                <button
                                    onClick={() => setStep(1)}
                                    className="w-full py-3 text-gray-500 hover:text-gray-700 font-medium"
                                >
                                    Back to Details
                                </button>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center h-64 text-center space-y-4"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-saffron/20 rounded-full blur-xl animate-pulse"></div>
                                    <Loader2 size={48} className="text-saffron animate-spin relative z-10" />
                                </div>
                                <h3 className="text-xl font-serif text-gray-800">Consulting the stars...</h3>
                                <p className="text-gray-500 max-w-xs">Creating the most auspicious path for your journey.</p>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3 text-green-600 mb-4 bg-green-50 p-4 rounded-xl border border-green-100">
                                    <CheckCircle2 size={24} />
                                    <span className="font-bold">Your Itinerary is Ready!</span>
                                </div>

                                <div
                                    ref={itineraryRef}
                                    className="prose prose-saffron max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-100 font-sans text-gray-700 leading-relaxed max-h-[50vh] overflow-y-auto custom-scrollbar"
                                >
                                    {itinerary.split('\n').map((line, index) => {
                                        const cleanLine = line.trim();
                                        if (!cleanLine) return <div key={index} className="h-2"></div>;

                                        // Headers (Day 1, Day 2, or ##)
                                        if (cleanLine.startsWith('##') || cleanLine.match(/^Day\s+\d+/i)) {
                                            return (
                                                <h3 key={index} className="text-xl font-serif text-saffron-dark font-bold mt-6 mb-3 border-b border-saffron/20 pb-1 flex items-center gap-2">
                                                    <Calendar size={20} />
                                                    {cleanLine.replace(/#/g, '').replace(/\*\*/g, '').trim()}
                                                </h3>
                                            );
                                        }

                                        // Specific Block: Pro Tip
                                        // Matches: 💡 **Pro Tip:** text... OR * **Pro Tip:** text...
                                        if (cleanLine.toLowerCase().includes('pro tip')) {
                                            // Strip out the label and common markers to get just the content
                                            const content = cleanLine
                                                .replace(/💡/g, '')
                                                .replace(/\*\*/g, '')
                                                .replace(/^\*\s*/, '') // remove leading bullet
                                                .replace(/Pro Tip:/i, '')
                                                .trim();

                                            return (
                                                <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-2 text-sm text-yellow-900 rounded-r-md">
                                                    <strong className="block font-bold mb-1">💡 Pro Tip:</strong>
                                                    {formatText(content)}
                                                </div>
                                            );
                                        }

                                        // Specific Block: Spiritual Insight
                                        if (cleanLine.toLowerCase().includes('spiritual insight')) {
                                            const content = cleanLine
                                                .replace(/🕉️/g, '')
                                                .replace(/\*\*/g, '')
                                                .replace(/^\*\s*/, '') // remove leading bullet
                                                .replace(/Spiritual Insight:/i, '')
                                                .trim();

                                            return (
                                                <div key={index} className="bg-purple-50 border-l-4 border-purple-400 p-3 my-2 text-sm text-purple-900 rounded-r-md">
                                                    <strong className="block font-bold mb-1">🕉️ Spiritual Insight:</strong>
                                                    <span className="italic">{formatText(content)}</span>
                                                </div>
                                            );
                                        }

                                        // List Items
                                        if (cleanLine.startsWith('- ') || cleanLine.startsWith('* ')) {
                                            return (
                                                <div key={index} className="flex gap-3 ml-2 mb-2">
                                                    <span className="text-saffron font-bold text-lg leading-none mt-1">•</span>
                                                    <span>{formatText(cleanLine.replace(/^[-*]\s/, ''))}</span>
                                                </div>
                                            );
                                        }

                                        // Greeting
                                        if (cleanLine.startsWith('🙏')) {
                                            return (
                                                <p key={index} className="text-center italic text-gray-500 mb-6 text-lg">
                                                    {formatText(cleanLine)}
                                                </p>
                                            );
                                        }

                                        // Fallback Paragraph
                                        return <p key={index} className="mb-2">{formatText(cleanLine)}</p>;
                                    })}
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={downloadPDF}
                                        disabled={isDownloading}
                                        className="flex-1 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2 border border-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isDownloading ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" /> Preparing PDF...
                                            </>
                                        ) : (
                                            <>
                                                <Download size={20} /> Download PDF
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(itinerary);
                                            alert("Itinerary copied to clipboard!");
                                        }}
                                        className="flex-1 py-3 bg-saffron text-white font-bold rounded-xl hover:bg-saffron-dark transition-colors"
                                    >
                                        Copy Text
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default AIDivineGuide;
