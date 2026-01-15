import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { regionsData, type Region } from '../data/regionsData';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

interface CardProps {
    region: Region;
    isLeft: boolean;
}

const Card = ({ region, isLeft }: CardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`flex ${isLeft ? 'justify-end pr-12' : 'justify-start pl-12'} w-1/2 relative py-12`}
        >
            {/* Dot on the timeline */}
            <div className={`absolute top-1/2 ${isLeft ? '-right-[9px]' : '-left-[9px]'} w-4 h-4 rounded-full bg-[#d4af37] border-4 border-[#fff] z-20 shadow-[0_0_20px_rgba(212,175,55,0.5)]`} />

            {/* Connecting line to card */}
            <div className={`absolute top-1/2 ${isLeft ? 'right-0' : 'left-0'} w-12 h-px bg-[#d4af37]/30`} />

            <Link to="/temples" className="group relative w-full max-w-lg aspect-[16/10] overflow-hidden rounded-2xl">
                {/* Image */}
                <div className="absolute inset-0">
                    <motion.img
                        src={region.image}
                        alt={region.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <h3 className="text-3xl font-serif text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {region.name}
                    </h3>
                    <p className="text-white/80 text-sm line-clamp-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        {region.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[#d4af37] text-xs uppercase tracking-widest font-semibold translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                        <span>Enter Realm</span>
                        <ArrowRight size={14} />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const DivinePath: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth out the drawing
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} className="relative py-40 bg-[#fbfbf9] overflow-hidden">
            {/* Header */}
            <div className="relative z-10 text-center mb-32 px-4">
                <span className="text-[#8c8273] font-serif tracking-[0.3em] uppercase text-sm block mb-4">The Journey Begins</span>
                <h2 className="text-6xl md:text-7xl font-serif text-[#332d24]">
                    The <span className="text-[#d4af37] italic">Path</span> of Devotion
                </h2>
            </div>

            <div className="relative max-w-6xl mx-auto">
                {/* The Central Line (SVG Timeline) */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 h-full z-0">
                    {/* Background grey line */}
                    <div className="absolute inset-y-0 left-0 w-full bg-[#332d24]/10" />

                    {/* Filling Gold Line */}
                    <motion.div
                        style={{ scaleY: scaleY }}
                        className="absolute top-0 left-0 w-full bg-[#d4af37] origin-top shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                    />
                </div>

                <div className="relative z-10 flex flex-col items-center w-full">
                    {regionsData.map((region, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <div key={region.id} className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'} mb-24`}>
                                {/* Mobile: Stack? For now, we assume desktop-first logic in alignment, need mobile adjustment later */}
                                {/* Actually, the Card component is hardcoded to be 1/2 width either left or right. 
                                    We need a container that centers the items relative to the spine. */}

                                <Card region={region} isLeft={isLeft} />
                            </div>
                        );
                    })}

                    {/* End Node */}
                    <div className="relative z-20 mt-12 mb-32 p-4 bg-white border border-[#d4af37] rounded-full text-[#d4af37]">
                        <MapPin size={24} />
                    </div>
                </div>
            </div>

            {/* Floating Particles/Petals (CSS animation placeholder) */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-30">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#ff9933]/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>
        </section>
    );
};

export default DivinePath;
