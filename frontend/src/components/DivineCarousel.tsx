import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { regionsData } from '../data/regionsData';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const DivineCarousel: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % regionsData.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + regionsData.length) % regionsData.length);
    };

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    // Touch and Wheel Logic
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Minimum swipe distance (in px) 
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null); // Reset
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextSlide();
        } else if (isRightSwipe) {
            prevSlide();
        }
    };

    // Debounce wheel scroll
    const [lastScrollTime, setLastScrollTime] = useState(0);
    const handleWheel = (e: React.WheelEvent) => {
        const now = Date.now();
        if (now - lastScrollTime < 500) return; // 500ms debounce

        if (e.deltaX > 20 || e.deltaY > 20) {
            nextSlide();
            setLastScrollTime(now);
        } else if (e.deltaX < -20 || e.deltaY < -20) {
            prevSlide();
            setLastScrollTime(now);
        }
    };

    return (
        <section
            id="divine-carousel"
            className="relative py-12 min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#fbfbf9]"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onWheel={handleWheel}
        >
            {/* Background Pattern for Light Mode */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, #332d24 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 w-full flex flex-col items-center justify-center h-full">

                <div className="text-center mb-4 md:mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="mb-8 relative"
                    >
                        {/* Glowing backdrop blur for depth */}
                        <div className="absolute inset-0 bg-[#d4af37]/20 blur-3xl rounded-full opacity-30 animate-pulse" />

                        <motion.h2
                            // Floating Animation
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative text-2xl md:text-5xl text-center flex flex-col gap-3 md:gap-6"
                            style={{ fontFamily: '"Yatra One", serif' }}
                        >
                            {/* Solid Gold Text for maximum visibility */}
                            <span className="text-[#d4af37] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                                हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे
                            </span>

                            <span className="text-[#d4af37] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                                हरे राम हरे राम राम राम हरे हरे
                            </span>
                        </motion.h2>
                    </motion.div>
                </div>

                {/* 3D Circular Carousel Stage - Wide Container */}
                <div className="relative w-full max-w-[95vw] h-[400px] md:h-[600px] flex items-center justify-center perspective-[1000px]">

                    {/* Navigation Arrows (Side) - Now inside relative container for perfect centering */}
                    {/* Previous Button */}
                    <motion.button
                        onClick={prevSlide}
                        initial={{ y: "-50%" }}
                        whileHover={{ scale: 1.1, x: -5, y: "-50%" }}
                        whileTap={{ scale: 0.95, y: "-50%" }}
                        className="absolute left-1 md:left-4 top-1/2 z-[60] w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center border border-[#d4af37]/30 bg-white/80 backdrop-blur-sm transition-all hover:border-[#d4af37] hover:bg-[#fff9e6] shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                        aria-label="Previous Location"
                    >
                        <ArrowLeft className="w-4 h-4 md:w-6 md:h-6 text-[#332d24] group-hover:text-[#d4af37] transition-colors" />
                    </motion.button>

                    {/* Next Button */}
                    <motion.button
                        onClick={nextSlide}
                        initial={{ y: "-50%" }}
                        whileHover={{ scale: 1.1, x: 5, y: "-50%" }}
                        whileTap={{ scale: 0.95, y: "-50%" }}
                        className="absolute right-1 md:right-4 top-1/2 z-[60] w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center border border-[#d4af37]/30 bg-white/80 backdrop-blur-sm transition-all hover:border-[#d4af37] hover:bg-[#fff9e6] shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                        aria-label="Next Location"
                    >
                        <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-[#332d24] group-hover:text-[#d4af37] transition-colors" />
                    </motion.button>
                    {regionsData.map((region, index) => {
                        const length = regionsData.length;

                        // Calculate offset from active index
                        let offset = (index - activeIndex + length) % length;

                        // Adjust offset to be centered around 0 (e.g., -2, -1, 0, 1, 2)
                        // If length is 6, we get: 0, 1, 2, 3, 4, 5. 
                        // We want: 0, 1, 2, 3/-3, -2, -1.
                        if (offset > length / 2) offset -= length;

                        const absOffset = Math.abs(offset);

                        // logic for "Visible on sides at back"
                        // Center (0): x=0, z=0, scale=1.3
                        // +/- 1: x= +/- 350, z=-100
                        // +/- 2: x= +/- 650, z=-200

                        // Spacing constant
                        const xSpacing = 320; // Wide enough so they don't overlap the center too much
                        const zStep = -150;   // How far back they go

                        let x = offset * xSpacing;
                        let z = absOffset * zStep;
                        let scale = 1.3 - (absOffset * 0.25);
                        let opacity = 1 - (absOffset * 0.2);
                        let zIndex = 50 - absOffset; // Ensure center is on top

                        // Special case for the "back" item in a circle of 6
                        // It might overlap with the center if we just strictly follow linear logic
                        // But with z-index, it should be fine behind.
                        if (absOffset > 2) {
                            // Hide or fade out distant ones to avoid clutter if too many
                            opacity = 0;
                        }

                        // Responsive settings
                        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                            // Tablet/Mobile
                            const xSpacingMob = 160;
                            // Reduce spacing even more for very small screens if needed, but this is okay for now.
                            x = offset * xSpacingMob;
                            scale = 1.2 - (absOffset * 0.3);
                        }

                        const isCenter = offset === 0;

                        return (
                            <motion.div
                                key={region.id}
                                initial={false}
                                animate={{
                                    x,
                                    z,
                                    scale,
                                    opacity,
                                    zIndex
                                }}
                                transition={{ duration: 0.8, type: "spring", stiffness: 120, damping: 20 }}
                                // Mobile: Reduced size to 260px to fit better. Desktop: 400px.
                                className="absolute w-[260px] h-[260px] md:w-[400px] md:h-[400px] rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] cursor-pointer border-[4px] md:border-[8px] border-white bg-white"
                                onClick={() => {
                                    if (offset !== 0) {
                                        // Jump to clicked
                                        setActiveIndex((prev) => (prev + offset + length) % length);
                                    } else {
                                        // Navigate if clicking the center active item
                                        navigate(`/temples?location=${region.name}`);
                                    }
                                }}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* The Portal Window */}
                                <div className="relative w-full h-full rounded-full overflow-hidden">
                                    <img
                                        src={region.image}
                                        alt={region.name}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Overlay - Only for Center */}
                                    <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8 text-center transition-all duration-500 ${isCenter ? 'opacity-100' : 'opacity-0'}`}>
                                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1/2 bg-radial-gradient from-black/40 to-transparent blur-xl pointer-events-none" />

                                        <div className="relative z-10">
                                            <h2 className="text-2xl md:text-5xl font-serif text-white mb-2 md:mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-tighter">
                                                {region.name}
                                            </h2>
                                            <p className="text-white text-[10px] md:text-sm font-medium max-w-[160px] md:max-w-[200px] mx-auto mb-4 md:mb-6 leading-relaxed drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                                {region.tagline}
                                            </p>
                                            <Link
                                                to={`/temples?location=${region.name}`}
                                                className="inline-block px-4 py-1.5 md:px-6 md:py-2 bg-[#d4af37] text-black font-bold uppercase tracking-widest text-[9px] md:text-[10px] rounded-full hover:bg-white transition-colors shadow-lg pointer-events-auto"
                                            >
                                                Explore {region.name}
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Ring - Center Only */}
                                {isCenter && (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute -inset-2 md:-inset-6 border border-dashed border-[#d4af37]/40 rounded-full pointer-events-none"
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section >
    );
};

export default DivineCarousel;
