import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface RevealTextProps {
    text: string;
    className?: string;
}

const RevealText: React.FC<RevealTextProps> = ({ text, className = "" }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [0.3, 1, 0.3]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
    const color = useTransform(scrollYProgress, [0, 0.5, 1], ["#9CA3AF", "#D4AF37", "#9CA3AF"]); // Gray -> Gold -> Gray

    return (
        <motion.span
            ref={ref}
            style={{ opacity, scale, color }}
            className={`inline-block transition-colors duration-500 ${className}`}
        >
            {text}
        </motion.span>
    );
};

export default RevealText;
