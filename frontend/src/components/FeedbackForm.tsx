import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, Heart } from 'lucide-react';

import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const FeedbackForm = () => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Create a timeout promise to prevent infinite loading
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Request timed out. Please check your internet connection or try again later.")), 10000)
            );

            // Race the addDoc against the timeout
            await Promise.race([
                addDoc(collection(db, "feedbacks"), {
                    name,
                    message,
                    rating,
                    location: "Vrindavan Pilgrim",
                    timestamp: serverTimestamp(),
                    approved: true
                }),
                timeoutPromise
            ]);

            setIsSubmitted(true);
        } catch (error: any) {
            console.error("Error adding feedback: ", error);
            // Show a more friendly error message
            let errorMessage = "Failed to submit feedback. ";
            if (error.code === 'permission-denied') {
                errorMessage += "You may not have permission to perform this action. Ensure you are online.";
            } else if (error.code === 'unavailable') {
                errorMessage += "Service is temporarily unavailable.";
            } else if (error.message) {
                errorMessage += error.message;
            } else {
                errorMessage += "Please try again.";
            }
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <section className="relative py-20 px-4">
                <div className="max-w-xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-12 rounded-3xl shadow-xl border border-[#d4af37]/20"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600"
                        >
                            <Heart size={40} fill="currentColor" />
                        </motion.div>
                        <h2 className="text-3xl font-serif text-[#332d24] mb-4">Jai Shree Krishna!</h2>
                        <p className="text-gray-600 mb-8 italic">"Your offering has been received with love. May your devotion continue to grow."</p>
                        <button
                            onClick={() => {
                                setIsSubmitted(false);
                                setRating(0);
                                setName('');
                                setMessage('');
                            }}
                            className="text-[#AE3708] hover:text-[#d4af37] font-bold text-sm uppercase tracking-widest transition-colors"
                        >
                            Submit Another
                        </button>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative py-20 px-4">
            {/* Background with decorative elements */}
            <div className="absolute inset-0 bg-[#fbfbf9]/50 -z-10" />

            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-[#d4af37]/20 relative"
                >
                    {/* Golden accent line */}
                    <div className="h-1.5 bg-gradient-to-r from-[#d4af37] via-[#f7e7ce] to-[#d4af37]" />

                    <div className="p-8 md:p-12 relative z-10">
                        <div className="text-center mb-10">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="w-16 h-16 bg-[#fff9e6] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#d4af37]/30"
                            >
                                <Heart className="text-[#d4af37] w-8 h-8 fill-current" />
                            </motion.div>
                            <h2 className="text-3xl md:text-4xl font-serif text-[#332d24] mb-3">Share Your Divine Experience</h2>
                            <p className="text-gray-500 font-light italic">"Your words illuminate the path for others."</p>
                        </div>

                        <form className="space-y-8" onSubmit={handleSubmit}>
                            {/* Star Rating */}
                            <div className="flex flex-col items-center gap-4">
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#AE3708]">Rate your Journey</span>
                                <div className="flex gap-2 p-2 rounded-full cursor-pointer hover:bg-gray-50 transition-colors">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            className="transition-transform hover:scale-110 focus:outline-none"
                                        >
                                            <Star
                                                size={32}
                                                className={`transition-colors duration-200 ${star <= (hoveredRating || rating)
                                                    ? "fill-[#d4af37] text-[#d4af37]"
                                                    : "fill-transparent text-gray-300"
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Hari Bhakt"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full px-6 py-4 bg-[#f8f8f8] rounded-xl border-none ring-1 ring-transparent focus:ring-[#d4af37]/50 focus:bg-white transition-all placeholder:text-gray-400 text-gray-800"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Your Message</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Share your feelings, moments of peace, or suggestions..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        className="w-full px-6 py-4 bg-[#f8f8f8] rounded-xl border-none ring-1 ring-transparent focus:ring-[#d4af37]/50 focus:bg-white transition-all placeholder:text-gray-400 text-gray-800 resize-none"
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#bfa030] text-[#332d24] font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:bg-[#d4af37] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                disabled={!name || !message || rating === 0 || isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Send size={20} />
                                )}
                                Submit My Offering
                            </motion.button>
                        </form>
                    </div>

                    {/* Decorative Background for Card */}
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-[#fff9e6] to-transparent rounded-tl-[100%] z-0 pointer-events-none opacity-60" />
                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#fff9e6] to-transparent rounded-br-[100%] z-0 pointer-events-none opacity-60" />
                </motion.div>
            </div>
        </section>
    );
};

export default FeedbackForm;
