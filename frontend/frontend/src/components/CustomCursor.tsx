import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const PeacockFeather = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
        <path d="M12 2C12 2 13.5 6 16 8C18.5 10 21 11 21 14C21 18 17 21 12 21C7 21 3 18 3 14C3 11 5.5 10 8 8C10.5 6 12 2 12 2Z" fill="url(#featherGradient)" />
        <circle cx="12" cy="14" r="3.5" fill="#1A237E" stroke="#FFD700" strokeWidth="1" />
        <circle cx="12" cy="14" r="1.5" fill="#00E5FF" />
        <defs>
            <linearGradient id="featherGradient" x1="12" y1="2" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4CAF50" />
                <stop offset="50%" stopColor="#009688" />
                <stop offset="100%" stopColor="#1A237E" />
            </linearGradient>
        </defs>
    </svg>
);

const CustomCursor = () => {
    // useMotionValue for direct, high-performance updates (bypassing React render cycle)
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring physics for that "flexible" but instant feel
    const springConfig = { damping: 20, stiffness: 400, mass: 0.1 }; // Snappy but smooth
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

    useEffect(() => {
        let sparkleId = 0;
        const colors = ['#00E5FF', '#76FF03', '#FFD700', '#FF4081'];

        const handleMouseMove = (e: MouseEvent) => {
            // Update MotionValues directly - No React Re-render!
            cursorX.set(e.clientX - 4);
            cursorY.set(e.clientY - 4);

            // Add sparkle occasionally
            if (Math.random() > 0.8) { // Slightly reduced frequency for performance
                setSparkles(prev => [
                    ...prev.slice(-10),
                    {
                        id: sparkleId++,
                        x: e.clientX + (Math.random() * 10 - 5),
                        y: e.clientY + (Math.random() * 10 - 5),
                        color: colors[Math.floor(Math.random() * colors.length)]
                    }
                ]);
            }

            // Interactive check (still needs state, but less frequent updates usually)
            const target = e.target as HTMLElement;
            const isClickable = target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('cursor-pointer') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [cursorX, cursorY]);

    // Cleanup sparkles
    useEffect(() => {
        const cleanup = setInterval(() => {
            setSparkles(prev => prev.slice(1));
        }, 100);
        return () => clearInterval(cleanup);
    }, []);

    return (
        <>
            {/* Sparkle Trail */}
            <AnimatePresence>
                {sparkles.map((sparkle) => (
                    <motion.div
                        key={sparkle.id}
                        initial={{ opacity: 1, scale: 0.5 }}
                        animate={{ opacity: 0, scale: 0, y: 10 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: 'fixed',
                            left: sparkle.x,
                            top: sparkle.y,
                            width: 3,
                            height: 3,
                            borderRadius: '50%',
                            backgroundColor: sparkle.color,
                            pointerEvents: 'none',
                            zIndex: 99,
                            boxShadow: `0 0 4px ${sparkle.color}`
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Main Feather Cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[100]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    rotate: isHovering ? 15 : 0
                }}
                transition={{ duration: 0.2 }} // Only for scale/rotate
            >
                <div className="-rotate-45 transform origin-top-left">
                    <PeacockFeather />
                </div>
            </motion.div>
        </>
    );
};

export default CustomCursor;
