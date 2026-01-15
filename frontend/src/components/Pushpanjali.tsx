import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower } from 'lucide-react';

const FlowerParticle = ({ id, x, onComplete }: { id: number; x: number; onComplete: (id: number) => void }) => {
    return (
        <motion.div
            initial={{ y: -100, x: x, rotate: 0, opacity: 0 }}
            animate={{
                y: window.innerHeight + 100,
                rotate: 720,
                x: x + (Math.random() * 200 - 100),
                opacity: [0, 1, 1, 0]
            }}
            transition={{
                duration: Math.random() * 3 + 3,
                ease: "linear",
                times: [0, 0.1, 0.8, 1]
            }}
            onAnimationComplete={() => onComplete(id)}
            className="fixed z-[60] pointer-events-none text-saffron drop-shadow-lg"
        >
            <Flower size={Math.random() * 25 + 20} fill="#FF9933" className="text-saffron-dark" />
        </motion.div>
    );
};

const Pushpanjali = () => {
    const [flowers, setFlowers] = useState<{ id: number; x: number }[]>([]);

    const triggerOffering = useCallback((count = 25) => {
        const newFlowers = Array.from({ length: count }).map((_, i) => ({
            id: Date.now() + Math.random() + i,
            x: Math.random() * window.innerWidth
        }));
        setFlowers(prev => [...prev, ...newFlowers]);
    }, []);

    useEffect(() => {
        // Trigger flower shower once on site entrance
        const timer = setTimeout(() => {
            triggerOffering(40); // Initial large burst
        }, 1500); // Wait for initial site load/animations

        return () => clearTimeout(timer);
    }, [triggerOffering]);

    const removeFlower = useCallback((id: number) => {
        setFlowers(prev => prev.filter(f => f.id !== id));
    }, []);

    return (
        <AnimatePresence>
            {flowers.map(flower => (
                <FlowerParticle key={flower.id} id={flower.id} x={flower.x} onComplete={removeFlower} />
            ))}
        </AnimatePresence>
    );
};

export default Pushpanjali;
