import { motion } from 'framer-motion';
import { Compass, Map, Search, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';
import RevealText from '../components/RevealText';
import discoverImg from '../assets/radha_krishna_deity.png';

const YatraGuidelines = () => {
    const steps = [
        {
            id: 1,
            title: "Discover the Divine",
            description: "Explore our comprehensive directory of temples. Filter by region (Mathura, Vrindavan, Govardhan) or deity to find exactly what your soul seeks.",
            icon: <Search className="w-8 h-8 text-saffron" />,
            link: "/temples",
            linkText: "Explore Temples",
            image: discoverImg
        },
        {
            id: 2,
            title: "Plan Your Journey",
            description: "Create a personalized itinerary using our 'Plan Journey' feature. Add temples to your list, and let our AI optimize the route for you.",
            icon: <Compass className="w-8 h-8 text-saffron" />,
            link: "/plan-trip",
            linkText: "Start Planning",
            image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=1887&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Essentials for the Yatra",
            description: "Find the best places for Sattvic Prasadam and comfortable Dharamshalas. We've curated lists to ensure your body is nourished and rested.",
            icon: <UtensilsCrossed className="w-8 h-8 text-saffron" />,
            link: "/food",
            linkText: "Find Food & Stays",
            image: "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?q=80&w=1770&auto=format&fit=crop"
        },
        {
            id: 4,
            title: "Navigate with Ease",
            description: "Use our Interactive Map to see all sacred spots at a glance. Get directions and visual context for your parikrama.",
            icon: <Map className="w-8 h-8 text-saffron" />,
            link: "/map",
            linkText: "Open Map",
            image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1774&auto=format&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen bg-marble pb-12 pt-20 md:pb-20 md:pt-28 px-4 md:px-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-12 md:mb-20 space-y-4 md:space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-3xl md:text-6xl font-serif text-saffron-dark mb-4 drop-shadow-sm">
                        How to Use BhaktiPath
                    </h1>
                    <div className="w-16 h-1 md:w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full"></div>
                </motion.div>

                <div className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 font-light italic leading-relaxed">
                    <RevealText text="Your step-by-step guide to navigating the digital gateway of Braj Dham." />
                </div>
            </div>

            {/* Steps Section */}
            <div className="max-w-6xl mx-auto space-y-12 md:space-y-24">
                {steps.map((step, index) => (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Image Side */}
                        <div className="w-full md:w-1/2 relative group">
                            <div className="absolute inset-0 bg-saffron-dark/10 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-video md:aspect-[4/3]">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                                <img src={step.image} alt={step.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg">
                                    {step.icon}
                                </div>
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="w-full md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left">
                            <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-saffron/10 text-saffron-dark font-bold text-xs md:text-sm tracking-widest uppercase">
                                Step 0{step.id}
                            </div>
                            <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-800">
                                {step.title}
                            </h2>
                            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                {step.description}
                            </p>
                            <Link to={step.link}>
                                <button className="mt-4 px-6 py-2.5 md:px-8 md:py-3 bg-saffron text-white rounded-full font-medium text-sm md:text-base hover:bg-saffron-dark transition-all duration-300 shadow-lg hover:shadow-saffron/30 hover:-translate-y-1">
                                    {step.linkText}
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Final CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-32 space-y-8"
            >
                <h3 className="text-3xl font-serif font-bold text-gray-800">
                    Ready to begin your Yatra?
                </h3>
                <Link to="/temples">
                    <button className="px-10 py-4 bg-gradient-to-r from-saffron to-saffron-dark text-white text-lg rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        Start Exploring Now
                    </button>
                </Link>
            </motion.div>
        </div>
    );
};

export default YatraGuidelines;
