import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Plus, Compass, ArrowLeft, Info } from 'lucide-react';
import { templesData } from '../data/templesData';
import Pushpanjali from '../components/Pushpanjali';
import { useAuth } from '../context/AuthContext';
import { usePlanner } from '../context/PlannerContext';

const TempleDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { openPlanner } = usePlanner();

    const temple = templesData.find(t => t.id === Number(id));

    if (!temple) return (
        <div className="h-screen grid place-items-center bg-marble">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-serif text-saffron">Divine Path Lost</h2>
                <Link to="/temples" className="text-gold hover:underline flex items-center justify-center gap-2">
                    <ArrowLeft size={18} /> Return to Vrindavan
                </Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-marble text-gray-800 pb-20 selection:bg-saffron/30">
            {/* Header / Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 px-4 md:px-8 py-4 flex items-center justify-between">
                <Link to="/temples" className="group flex items-center gap-2 text-saffron-dark font-medium transition-all hover:gap-3">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-serif tracking-widest uppercase text-sm">Back to Darshan</span>
                </Link>
                <div className="hidden md:block">
                    <span className="text-gold-dark font-devanagari text-xl tracking-widest">|| श्री राधे ||</span>
                </div>
            </nav>

            {/* Top Title Section */}
            <section className="pt-32 pb-12 px-4 text-center overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-2 relative inline-block"
                >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-saffron-dark drop-shadow-sm uppercase tracking-tighter">
                        {temple.name}
                    </h1>
                    <p className="text-gold-dark font-devanagari text-2xl opacity-80 tracking-[0.2em]">{temple.location}</p>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
                </motion.div>
            </section>

            {/* Main Visual Section (Based on Sketch) */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Description & Spiritual Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="lg:col-span-4 space-y-8 order-3 lg:order-1"
                    >
                        <div className="bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-gold/20 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Info size={64} className="text-saffron" />
                            </div>
                            <h3 className="text-2xl font-serif text-saffron-dark mb-4 flex items-center gap-2">
                                <Compass size={24} /> Spiritual Significance
                            </h3>
                            <p className="text-gray-700 leading-relaxed font-light text-lg italic">
                                "{temple.description}"
                            </p>
                            <div className="mt-8 pt-6 border-t border-gold/20 flex items-center gap-4 text-sm font-medium text-gold-dark">
                                <Clock size={20} className="text-saffron" />
                                <div>
                                    <p className="uppercase tracking-widest text-xs opacity-60">Darshan Timings</p>
                                    <p>{temple.timings}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Mid: Arched Window with Diety Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="lg:col-span-4 flex justify-center order-1 lg:order-2"
                    >
                        <div className="relative w-full max-w-[350px] aspect-[3/4] rounded-t-full border-[12px] border-gold-dark/30 shadow-[0_0_50px_rgba(255,153,51,0.2)] overflow-hidden group">
                            {/* The Arch Frame */}
                            <div className="absolute inset-0 border-[2px] border-gold z-10 rounded-t-full pointer-events-none"></div>

                            {/* The Image */}
                            <img
                                src={temple.deityImage}
                                alt={`Deity of ${temple.name}`}
                                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                            />

                            {/* Inner Glow Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-saffron-dark/40 via-transparent to-transparent z-1"></div>

                            {/* Decorative Label at bottom */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-gold/30">
                                <span className="text-saffron-dark font-serif tracking-widest uppercase text-xs">Divine Presence</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Square Box with Temple Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="lg:col-span-4 order-2 lg:order-3"
                    >
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform lg:rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img
                                src={temple.image}
                                alt={temple.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                <p className="text-xs uppercase tracking-[0.3em] opacity-80">Architecture</p>
                                <p className="font-serif text-xl">The Holy Precincts</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Bottom Part: Map and Address */}
            <section className="bg-saffron/5 border-y border-gold/10 py-20 px-4 md:px-8 mt-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Map Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white h-[400px] relative"
                        >
                            <iframe
                                title="Temple Location"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'REPLACE_WITH_ACTUAL_API_KEY'}&q=${temple.mapQuery}`}
                                allowFullScreen
                            ></iframe>
                            {/* Generic Fallback iframe for demo if key is missing */}
                            <div className="absolute inset-0 pointer-events-none border-t-8 border-saffron/20"></div>
                            <iframe
                                title="Temple Location Generic"
                                width="100%"
                                height="100%"
                                src={`https://maps.google.com/maps?q=${temple.mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                frameBorder="0"
                                scrolling="no"
                                marginHeight={0}
                                marginWidth={0}
                                className="w-full h-full"
                            ></iframe>
                        </motion.div>

                        {/* Address and Directions */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <h4 className="text-saffron-dark font-serif text-3xl">Pavitra Sthan</h4>
                                <div className="w-20 h-1 bg-gold rounded-full"></div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="p-3 bg-saffron/20 rounded-full">
                                    <MapPin className="text-saffron-dark" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs uppercase tracking-widest text-gold-dark font-bold">Address</p>
                                    <p className="text-xl text-gray-700 leading-snug">{temple.fullAddress}</p>
                                </div>
                            </div>

                            <button
                                className="group px-8 py-4 bg-gradient-to-r from-saffron to-saffron-dark text-white font-bold rounded-2xl shadow-xl hover:shadow-saffron/40 transition-all flex items-center gap-3 active:scale-95"
                                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${temple.mapQuery}`, '_blank')}
                            >
                                <Compass className="group-hover:rotate-45 transition-transform" />
                                Open Navigation
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Interactive Offering */}
            <div className="fixed bottom-10 right-10 z-50 flex flex-col gap-4">
                {user && temple && (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => openPlanner({ id: temple.id, name: temple.name })}
                        className="p-4 bg-saffron-dark text-white rounded-full shadow-2xl border-2 border-white/20 hover:bg-saffron transition-colors group relative"
                    >
                        <Plus size={24} />
                        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Add to Journey
                        </span>
                    </motion.button>
                )}
                <Pushpanjali />
            </div>

        </div>
    );
};

export default TempleDetails;
