import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TempleProps {
    id: number;
    name: string;
    description: string;
    image: string;
    location: string;
    timings: string;
}

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TempleCard: React.FC<TempleProps> = ({ id, name, description, image, location, timings }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <Link to={`/temples/${id}`} className="block h-96 w-full">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transformStyle: "preserve-3d",
                    transform,
                }}
                className="relative h-full w-full rounded-xl bg-gradient-to-br from-white/10 to-white/0 cursor-pointer perspectiva-1000"
            >
                <div
                    style={{
                        transform: "translateZ(75px)",
                        transformStyle: "preserve-3d",
                    }}
                    className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-2xl overflow-hidden glass-card group"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 flex flex-col h-full justify-end text-white"
                        style={{ transform: "translateZ(50px)" }}>
                        <span className="inline-flex items-center gap-1 w-fit bg-saffron/90 text-white text-xs px-2 py-1 rounded-full mb-2 backdrop-blur-sm shadow-lg">
                            <MapPin size={12} /> {location}
                        </span>
                        <h3 className="text-2xl font-bold font-serif mb-2 drop-shadow-md">{name}</h3>
                        <p className="text-gray-200 text-sm mb-4 line-clamp-2 drop-shadow-sm">{description}</p>

                        <div className="flex items-center text-gray-300 text-xs gap-2 border-t border-white/20 pt-3">
                            <Clock size={14} className="text-saffron" />
                            <span>{timings}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default TempleCard;
