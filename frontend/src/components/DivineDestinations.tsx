import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { regionsData, type Region } from '../data/regionsData';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const ROTATION_RANGE = 25; // Degrees
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const TiltCard: React.FC<{ region: Region; index: number }> = ({ region, index }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE / width - HALF_ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE / height - HALF_ROTATION_RANGE;

        const rX = mouseY * -1;
        const rY = mouseX;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="relative w-full aspect-[3/4.5] rounded-t-[140px] rounded-b-[20px] mb-12 sm:mb-0"
        >
            <Link to="/temples" className="block w-full h-full relative group">
                {/* 3D Depth Layers */}
                <div
                    style={{ transform: "translateZ(75px)" }}
                    className="absolute inset-4 rounded-t-[125px] rounded-b-[10px] border border-[#ffd700]/30 z-20 pointer-events-none group-hover:border-[#ffd700]/60 transition-colors duration-500"
                />

                <div className="absolute inset-0 rounded-t-[140px] rounded-b-[20px] overflow-hidden bg-[#1a1712] shadow-2xl">
                    {/* Image */}
                    <motion.div
                        className="absolute inset-0 w-full h-full"
                        style={{ transform: "translateZ(0px) scale(1.2)" }}
                    >
                        <img
                            src={region.image}
                            alt={region.name}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            style={{ filter: "brightness(0.8) contrast(1.1)" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80" />
                    </motion.div>

                    {/* Spotlight Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay bg-gradient-to-tr from-transparent via-white/20 to-transparent" />

                    {/* Floating Content */}
                    <div
                        style={{ transform: "translateZ(50px)" }}
                        className="absolute inset-0 p-8 flex flex-col justify-end z-30 pointer-events-none"
                    >
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles size={14} className="text-[#ffd700]" />
                                <span className="text-[#ffd700] text-xs font-serif tracking-[0.2em] uppercase">
                                    {region.tagline}
                                </span>
                            </div>

                            <h3 className="text-4xl lg:text-5xl font-serif text-white leading-none mb-4 drop-shadow-lg">
                                {region.name}
                            </h3>

                            <p className="text-white/80 text-sm font-light leading-relaxed line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                {region.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Floating Button */}
                <div
                    style={{ transform: "translateZ(100px)" }}
                    className="absolute bottom-6 right-6 z-40"
                >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-full bg-[#ffd700] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-[#ffd700]/20"
                    >
                        <ArrowUpRight size={20} />
                    </motion.div>
                </div>
            </Link>
        </motion.div>
    );
};

const DivineDestinations: React.FC = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yMiddle = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const yOuter = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    // Split data into 3 columns
    const col1 = [regionsData[0], regionsData[3]];
    const col2 = [regionsData[1], regionsData[4]];
    const col3 = [regionsData[2], regionsData[5]];

    return (
        <section ref={containerRef} className="relative py-40 px-4 md:px-8 bg-[#fbfbf9] overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#f4f4f0] to-transparent" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(#332d24 1px, transparent 1px), linear-gradient(90deg, #332d24 1px, transparent 1px)`,
                    backgroundSize: '100px 100px'
                }}
            />

            <div className="max-w-[1400px] mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-32"
                >
                    <div className="inline-flex items-center gap-4 mb-6">
                        <div className="h-px w-12 bg-[#332d24]/20" />
                        <span className="text-[#8c8273] font-serif tracking-[0.4em] text-sm uppercase">Sacred Geography</span>
                        <div className="h-px w-12 bg-[#332d24]/20" />
                    </div>
                    <h2 className="text-6xl md:text-8xl font-serif text-[#332d24] tracking-tight">
                        Realms of <span className="italic text-[#d4af37] font-light">Grace</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">
                    {/* Column 1 */}
                    <motion.div style={{ y: yOuter }} className="space-y-16 pt-12">
                        {col1.map((region, i) => (
                            <TiltCard key={region.id} region={region} index={i} />
                        ))}
                    </motion.div>

                    {/* Column 2 - Offset & Reverse Parallax */}
                    <motion.div style={{ y: yMiddle }} className="space-y-16">
                        {col2.map((region, i) => (
                            <TiltCard key={region.id} region={region} index={i + 2} />
                        ))}
                    </motion.div>

                    {/* Column 3 */}
                    <motion.div style={{ y: yOuter }} className="space-y-16 pt-24">
                        {col3.map((region, i) => (
                            <TiltCard key={region.id} region={region} index={i + 4} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DivineDestinations;
