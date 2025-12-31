import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower } from 'lucide-react';

const FlowerParticle = ({ id, x, onComplete }: { id: number; x: number; onComplete: (id: number) => void }) => {
    return (
        <motion.div
            initial={{ y: -50, x: x, rotate: 0, opacity: 1 }}
            animate={{
                y: window.innerHeight + 50,
                rotate: 360,
                x: x + (Math.random() * 100 - 50)
            }}
            exit={{ opacity: 0 }}
            transition={{
                duration: Math.random() * 2 + 2,
                ease: "linear"
            }}
            onAnimationComplete={() => onComplete(id)}
            className="fixed z-[60] pointer-events-none text-saffron drop-shadow-md"
        >
            <Flower size={Math.random() * 20 + 20} fill="#FF9933" className="text-saffron-dark opactiy-80" />
        </motion.div>
    );
};

const Pushpanjali = () => {
    const [flowers, setFlowers] = useState<{ id: number; x: number }[]>([]);

    const triggerOffering = () => {
        const newFlowers = Array.from({ length: 15 }).map((_, i) => ({
            id: Date.now() + i,
            x: Math.random() * window.innerWidth
        }));
        setFlowers(prev => [...prev, ...newFlowers]);
    };

    const removeFlower = useCallback((id: number) => {
        setFlowers(prev => prev.filter(f => f.id !== id));
    }, []);

    return (
        <>
            <AnimatePresence>
                {flowers.map(flower => (
                    <FlowerParticle key={flower.id} id={flower.id} x={flower.x} onComplete={removeFlower} />
                ))}
            </AnimatePresence>

            <button
                onClick={triggerOffering}
                className="fixed bottom-8 right-8 z-50 bg-saffron hover:bg-saffron-dark text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 group"
                title="Offer Pushpanjali"
            >
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                >
                    <Flower size={32} />
                </motion.div>
                <span className="absolute -top-12 right-0 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Offer Flowers
                </span>
            </button>
        </>
    );
};

export default Pushpanjali;
