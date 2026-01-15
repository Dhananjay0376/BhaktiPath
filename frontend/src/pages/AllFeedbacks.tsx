import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Star, Quote, Heart, Loader } from 'lucide-react';

interface Feedback {
    id: string;
    name: string;
    location: string;
    message: string;
    rating: number;
    timestamp: Timestamp;
}

const AllFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "feedbacks"), orderBy("timestamp", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedFeedbacks = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Feedback[];
            setFeedbacks(fetchedFeedbacks);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching feedbacks:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="min-h-screen bg-[#fbfbf9] pt-28 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block p-4 rounded-full bg-white shadow-md mb-4"
                    >
                        <Heart className="w-8 h-8 text-[#d4af37] fill-current" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif text-[#332d24]"
                    >
                        Pilgrim Voices
                    </motion.h1>
                    <p className="text-gray-600 font-light max-w-2xl mx-auto text-lg">
                        "Real experiences from devotees who have walked the path of love."
                    </p>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader className="animate-spin text-[#d4af37]" size={40} />
                    </div>
                ) : feedbacks.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-[#d4af37]/20">
                        <p className="text-xl text-gray-500 font-serif">No echoes yet. Be the first to share your journey!</p>
                        <a href="/temples" className="inline-block mt-6 text-[#AE3708] font-bold hover:underline">Share Experience</a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {feedbacks.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white p-8 rounded-2xl border border-[#d4af37]/10 hover:border-[#d4af37]/30 hover:shadow-lg transition-all relative flex flex-col"
                            >
                                <Quote className="w-8 h-8 text-[#d4af37]/20 mb-4 absolute top-6 right-6" />

                                <div className="flex items-center gap-1 mb-6 text-[#d4af37]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill={i < item.rating ? "currentColor" : "none"}
                                            className={i < item.rating ? "" : "text-gray-300"}
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-700 leading-relaxed font-light mb-8 flex-grow">
                                    "{item.message}"
                                </p>

                                <div className="border-t border-gray-100 pt-4 mt-auto">
                                    <h4 className="font-serif font-bold text-[#332d24] text-lg">{item.name}</h4>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-xs text-[#AE3708] uppercase tracking-wider">{item.location || 'Pilgrim'}</p>
                                        {item.timestamp && (
                                            <span className="text-xs text-gray-400">
                                                {new Date(item.timestamp.seconds * 1000).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllFeedbacks;
