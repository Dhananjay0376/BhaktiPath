import { useState } from 'react';
import { motion } from 'framer-motion';
import { accommodationData, type Accommodation } from '../data/accommodationData';
import { MapPin, Phone, CheckCircle } from 'lucide-react';
import RevealText from '../components/RevealText';
import HexagonGallery from '../components/HexagonGallery';
import { templesData } from '../data/templesData';

const Hotels = () => {
    const [filter, setFilter] = useState<"All" | "Vrindavan" | "Mathura" | "Govardhan">("All");

    const filteredHotels = filter === "All"
        ? accommodationData
        : accommodationData.filter(item => item.location === filter);

    const displayImages = templesData.map(t => t.image).sort(() => Math.random() - 0.5).slice(0, 15);

    return (
        <div className="min-h-screen pb-20 bg-[#fbfbf9]">
            {/* Header Gallery */}
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
                        Divine Stays in Braj
                    </motion.h1>
                    <div className="text-xl font-light leading-relaxed max-w-2xl mx-auto text-gray-700 italic">
                        <RevealText text="Find a peaceful abode to rest your body and rejuvenate your spirit during your pilgrimage." />
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

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredHotels.map((item, index) => (
                        <HotelCard key={item.id} item={item} index={index} />
                    ))}
                </div>

                {filteredHotels.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No stays found for this location yet.
                    </div>
                )}
            </div>
        </div>
    );
};

const HotelCard = ({ item, index }: { item: Accommodation; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
        >
            {/* Image Placeholder */}
            <div className="h-48 overflow-hidden relative bg-gray-100">
                <div className="absolute inset-0 bg-gradient-to-bl from-blue-50 to-indigo-50 flex items-center justify-center text-saffron/20">
                    <span className="text-6xl">🏠</span>
                </div>

                {/* Type Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-saffron-dark shadow-sm uppercase tracking-wider border border-saffron/20">
                    {item.type}
                </div>
                {/* Price Badge */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white shadow-sm">
                    {item.priceRange}
                </div>
            </div>

            {/* Content */}
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
                <div className="space-y-4 text-sm">
                    <div>
                        <span className="font-bold text-gray-700 block mb-2">Amenities:</span>
                        <div className="flex flex-wrap gap-2">
                            {item.amenities.slice(0, 3).map((amenity, i) => (
                                <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs flex items-center">
                                    <CheckCircle size={10} className="mr-1 text-green-500" /> {amenity}
                                </span>
                            ))}
                            {item.amenities.length > 3 && (
                                <span className="px-2 py-1 bg-gray-50 text-gray-400 rounded text-xs">+{item.amenities.length - 3} more</span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center pt-2">
                        <Phone size={16} className="text-saffron mt-0 mr-2 flex-shrink-0" />
                        <span className="text-gray-800 font-medium">{item.contact}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Hotels;
