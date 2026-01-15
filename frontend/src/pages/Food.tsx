import { useState } from 'react';
import { motion } from 'framer-motion';
import { foodData, type FoodSpot } from '../data/foodData';
import { MapPin, Clock, Star } from 'lucide-react';
import RevealText from '../components/RevealText';
import HexagonGallery from '../components/HexagonGallery'; // Reusing for visual consistency
import { templesData } from '../data/templesData'; // For background images

const Food = () => {
    const [filter, setFilter] = useState<"All" | "Vrindavan" | "Mathura" | "Govardhan">("All");

    const filteredFood = filter === "All"
        ? foodData
        : foodData.filter(item => item.location === filter);

    // Reuse temple images for the top gallery to keep the 'Braj' vibe
    const displayImages = templesData.map(t => t.image).sort(() => Math.random() - 0.5).slice(0, 15);

    return (
        <div className="min-h-screen pb-20 bg-[#fbfbf9]">
            {/* Visual Header using Hexagon Gallery (reuse for aesthetic consistency) */}
            <div className="w-full mb-8 opacity-80 hover:opacity-100 transition-opacity duration-700">
                <HexagonGallery images={displayImages} />
            </div>

            <div className="px-4 md:px-8 max-w-7xl mx-auto z-10 relative">

                {/* Header Section */}
                <div className="text-center mb-12 space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif text-saffron-dark mb-2 drop-shadow-sm"
                    >
                        Sacred Flavors of Braj
                    </motion.h1>
                    <div className="text-xl font-light leading-relaxed max-w-2xl mx-auto text-gray-700 italic">
                        <RevealText text="Nourish your soul with the divine Prasadam and pure Sattvic delicacies offered to the Lord." />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {["All", "Vrindavan", "Mathura", "Govardhan"].map((loc) => (
                        <button
                            key={loc}
                            onClick={() => setFilter(loc as any)}
                            className={`px-6 py-2 rounded-full text-sm uppercase tracking-widest transition-all duration-300 border ${filter === loc
                                ? 'bg-saffron text-white border-saffron shadow-lg scale-105'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-saffron hover:text-saffron'
                                }`}
                        >
                            {loc}
                        </button>
                    ))}
                </div>

                {/* Food Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredFood.map((item, index) => (
                        <FoodCard key={item.id} item={item} index={index} />
                    ))}
                </div>

                {filteredFood.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No culinary gems found for this location yet.
                    </div>
                )}
            </div>
        </div>
    );
};

// Sub-component for individual food cards
const FoodCard = ({ item, index }: { item: FoodSpot; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
        >
            {/* Image Section */}
            <div className="h-48 overflow-hidden relative bg-gray-100">
                {/* We might not have real images for all, use a nice gradient placeholder if image fails/is missing or generic */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-yellow-50 flex items-center justify-center text-saffron/20">
                    <span className="text-6xl">🍲</span>
                </div>
                {/* If we had real images: <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /> */}

                {/* Type Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-saffron-dark shadow-sm uppercase tracking-wider border border-saffron/20">
                    {item.type}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-2 group-hover:text-saffron-dark transition-colors">
                    {item.name}
                </h3>

                <div className="flex items-center text-sm text-gray-500 mb-4 font-medium">
                    <MapPin size={16} className="text-saffron mr-1" />
                    {item.location}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow border-b border-gray-100 pb-4">
                    {item.description}
                </p>

                {/* Details */}
                <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                        <Star size={16} className="text-yellow-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" />
                        <div>
                            <span className="font-bold text-gray-700 block">Must Try:</span>
                            <span className="text-gray-600">{item.mustTry}</span>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <Clock size={16} className="text-gray-400 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-500 italic">{item.timings}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Food;
