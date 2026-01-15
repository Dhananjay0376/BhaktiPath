import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { regionsData, type Region } from '../data/regionsData';
import { Link } from 'react-router-dom';

const AccordionPanel: React.FC<{
    region: Region;
    index: number;
    isHovered: boolean;
    onHover: (index: number | null) => void
}> = ({ region, index, isHovered, onHover }) => {
    return (
        <motion.div
            layout
            onHoverStart={() => onHover(index)}
            onHoverEnd={() => onHover(null)}
            className={`relative h-[700px] overflow-hidden cursor-pointer transition-all duration-700 ease-[0.23, 1, 0.32, 1]
                ${isHovered ? 'flex-[4]' : 'flex-[1]'} border-r border-[#332d24]/5 last:border-0 group`}
        >
            <Link to="/temples" className="block w-full h-full relative">
                {/* Background Image */}
                <motion.div
                    layout
                    className="absolute inset-0 w-full h-full overflow-hidden"
                >
                    <motion.img
                        src={region.image}
                        alt={region.name}
                        initial={false}
                        animate={{
                            scale: isHovered ? 1.05 : 1.1,
                            filter: isHovered ? 'brightness(0.6) saturate(1.2)' : 'brightness(0.5) grayscale(1)'
                        }}
                        transition={{ duration: 1.2 }}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Overlays */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-700 ${isHovered ? 'opacity-80' : 'opacity-40'}`} />

                {/* Vertical Label (Collapsed State) */}
                <AnimatePresence>
                    {!isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <span className="[writing-mode:vertical-lr] rotate-180 text-2xl font-serif text-white tracking-[0.4em] uppercase whitespace-nowrap drop-shadow-lg">
                                {region.name}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Expanded Content */}
                <div className={`absolute inset-0 p-12 flex flex-col justify-end transition-all duration-700 delay-100 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 font-bold'}`}>
                    <motion.div
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="space-y-4"
                    >
                        <span className="text-xs tracking-[0.6em] text-white uppercase font-serif block drop-shadow-md">{region.tagline}</span>
                        <h3 className="text-5xl md:text-7xl font-serif text-white tracking-tighter leading-none mb-4 drop-shadow-xl">{region.name}</h3>
                        <p className="max-w-md text-white text-lg font-light leading-relaxed mb-8 drop-shadow-md">
                            {region.description}
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#332d24", color: "#ffffff" }}
                            className="px-8 py-3 rounded-full border border-white/50 text-white text-sm tracking-widest uppercase font-serif backdrop-blur-md transition-all duration-300 bg-white/10"
                        >
                            Enter Realm
                        </motion.button>
                    </motion.div>
                </div>

                {/* Index Indicator */}
                <div className="absolute top-8 left-8 text-white/30 text-2xl font-serif italic select-none">
                    0{index + 1}
                </div>
            </Link>
        </motion.div>
    );
};

const DivineAccordion: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="w-full max-w-[1600px] mx-auto py-20 px-4">
            <div className="flex w-full gap-2 rounded-[3.5rem] overflow-hidden bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-[#332d24]/5">
                {regionsData.map((region, index) => (
                    <AccordionPanel
                        key={region.id}
                        region={region}
                        index={index}
                        isHovered={hoveredIndex === index}
                        onHover={setHoveredIndex}
                    />
                ))}
            </div>

            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] transition-all duration-1000 opacity-30
                    ${hoveredIndex !== null ? 'bg-[#8c8273]/10' : 'bg-transparent'}`}
                />
            </div>
        </section>
    );
};

export default DivineAccordion;
