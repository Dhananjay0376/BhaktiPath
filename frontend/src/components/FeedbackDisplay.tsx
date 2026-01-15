import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Aarav Sharma",
        location: "Mumbai",
        text: "The spiritual vibration of Vrindavan is unlike anything else. This platform guided me perfectly to the hidden gems I wouldn't have found otherwise.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
        id: 2,
        name: "Priya Patel",
        location: "Gujarat",
        text: "Barsana's energy is purely divine. The details provided here made my pilgrimage smooth and full of grace. Highly recommended for every devotee.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
        id: 3,
        name: "Rahul Verma",
        location: "Delhi",
        text: "I felt a deep connection at Banke Bihari ji. The timings and map query features were incredibly helpful for my family trip.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
];

const FeedbackDisplay = () => {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, #d4af37 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                }}
            />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block p-3 rounded-full bg-[#fff9e6] border border-[#d4af37]/20 mb-2"
                    >
                        <Quote className="w-6 h-6 text-[#d4af37]" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-serif text-[#332d24]"
                    >
                        Pilgrim Whispers
                    </motion.h2>
                    <p className="text-gray-500 font-light max-w-2xl mx-auto italic">
                        "Stories of grace and divinity from those who walked the path."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[#fbfbf9] p-8 rounded-2xl border border-[#d4af37]/10 hover:border-[#d4af37]/30 hover:shadow-lg transition-all group relative"
                        >
                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#fff9e6] to-transparent rounded-tr-2xl -z-0" />

                            <div className="flex items-center gap-1 mb-4 text-[#d4af37]">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" />
                                ))}
                            </div>

                            <p className="text-gray-700 leading-relaxed font-light mb-8 min-h-[80px]">
                                "{item.text}"
                            </p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-[#d4af37]/20">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-serif font-bold text-[#332d24]">{item.name}</h4>
                                    <p className="text-xs text-[#AE3708] uppercase tracking-wider">{item.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeedbackDisplay;
