import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

import yamunaBg from '../assets/yamuna_bg.png';

const HeroSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Image with Parallax */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 z-0"
            >
                <img
                    src={yamunaBg}
                    alt="Vrindavan Yamuna Background"
                    className="w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>
            </motion.div>

            {/* Content with Text Masking effect */}
            <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="relative z-10 text-center px-4 max-w-5xl mx-auto"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#E65100] via-[#FF9933] via-[#FFD700] to-[#FFFFFF] mb-8 drop-shadow-lg leading-tight py-2"
                >
                    Spiritual Heart <br /> of Mathura
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="text-4xl md:text-6xl text-gold-light mb-12 font-devanagari max-w-4xl mx-auto tracking-wide drop-shadow-lg"
                >
                    || अतिथि देवो भवः ||
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                    <button className="group px-10 py-5 bg-gradient-to-r from-saffron to-saffron-dark text-white font-bold rounded-full text-xl transition-all transform hover:scale-105 shadow-xl hover:shadow-saffron/50 flex items-center justify-center gap-3 relative overflow-hidden">
                        <span className="relative z-10">Start Darshan</span>
                        <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform relative z-10" />
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                    </button>

                    <Link to="/plan-trip">
                        <button className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/30 text-white font-bold rounded-full text-xl transition-all hover:bg-white/10 hover:border-gold shadow-lg">
                            Plan Journey
                        </button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50"
            >
                <span className="text-xs tracking-[0.3em] uppercase mb-2 block text-center">Scroll</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent mx-auto"></div>
            </motion.div>
        </div>
    );
};

export default HeroSection;
