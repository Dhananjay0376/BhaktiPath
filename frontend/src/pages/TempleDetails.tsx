import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowLeft } from 'lucide-react';
import RevealText from '../components/RevealText';
import Pushpanjali from '../components/Pushpanjali';

interface Temple {
    _id: string;
    name: string;
    description: string;
    location: string;
    images: string[];
    timings: {
        opening: string;
        closing: string;
    };
}

const TempleDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [temple, setTemple] = useState<Temple | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemple = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/temples/${id}`);
                if (!response.ok) throw new Error('Temple not found');
                const data = await response.json();
                setTemple(data);
            } catch (error) {
                console.error('Error fetching temple:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTemple();
    }, [id]);

    if (loading) return <div className="h-screen grid place-items-center text-saffron font-serif">Loading Divine Details...</div>;
    if (!temple) return <div className="h-screen grid place-items-center text-red-500 font-serif">Temple Not Found</div>;

    return (
        <div className="min-h-screen bg-marble text-gray-800 pb-20">
            {/* Hero Image */}
            <div className="relative h-[60vh] overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={temple.images[0] || 'https://images.unsplash.com/photo-1561585851-9337eb132d73?auto=format&fit=crop&w=1920&q=80'}
                    alt={temple.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                <Link to="/temples" className="absolute top-24 left-8 text-white flex items-center gap-2 hover:text-saffron transition-colors z-20">
                    <ArrowLeft size={20} /> Back
                </Link>

                <div className="absolute bottom-10 left-8 md:left-16 text-white max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl md:text-7xl font-serif font-bold mb-4 drop-shadow-lg"
                    >
                        {temple.name}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-6 text-sm md:text-base"
                    >
                        <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                            <MapPin size={16} className="text-saffron" /> {temple.location}
                        </span>
                        <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                            <Clock size={16} className="text-saffron" /> {temple.timings.opening} - {temple.timings.closing}
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="prose prose-lg prose-headings:font-serif prose-headings:text-saffron-dark text-gray-700 leading-loose mb-16">
                    <RevealText text={temple.description} />
                </div>

                {/* Divine Glimpses Gallery */}
                {temple.images.length > 1 && (
                    <div className="mb-16">
                        <h2 className="text-3xl font-serif text-saffron-dark mb-8 text-center">Divine Glimpses</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {temple.images.map((img, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="rounded-xl overflow-hidden h-64 shadow-lg group"
                                >
                                    <img
                                        src={img}
                                        alt={`${temple.name} - ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Interactive Offering */}
            <div className="fixed bottom-10 right-10">
                <Pushpanjali />
            </div>
        </div>
    );
};

export default TempleDetails;
