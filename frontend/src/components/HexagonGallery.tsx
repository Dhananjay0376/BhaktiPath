import React from 'react';
import { motion } from 'framer-motion';

interface HexagonGalleryProps {
    images: string[];
}

const HexagonGallery: React.FC<HexagonGalleryProps> = ({ images }) => {
    // Ensure sufficient images for a full 3-row layout (approx 60 for full width at w-52 size)
    // We want a dense "web" that covers the screen edge-to-edge.
    const TARGET_COUNT = 60;
    const uniqueId = Math.random().toString(36).substr(2, 9);
    let duplicates = [...images];

    // Safety check to avoid infinite loop if images is empty
    if (duplicates.length === 0) return null;

    while (duplicates.length < TARGET_COUNT) {
        duplicates = [...duplicates, ...images];
    }

    // Trim strictly to what we need or keep slightly more, but ensure we have enough to slice
    // Better to have excess than shortage.

    // Desktop Layout Slicing - Adjusted for w-52 size (needs approx 20 per row)
    const row1 = duplicates.slice(0, 20);
    const row2 = duplicates.slice(20, 39); // One less for interlocking
    const row3 = duplicates.slice(39, 59);

    const HexagonItem = ({ img, index }: { img: string; index: number }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02, duration: 0.5 }}
            className="relative w-32 h-32 md:w-52 md:h-52 shrink-0 hexagon-shell group cursor-pointer"
        >
            {/* White border/gap simulation via padding container */}
            <div className="absolute inset-0 bg-transparent p-[3.5px] hexagon-clip">
                {/* Inner Content */}
                <div className="w-full h-full relative overflow-hidden bg-white hexagon-clip shadow-md transition-transform duration-300 group-hover:scale-105">
                    <img
                        src={img}
                        alt="Gallery"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="w-full overflow-hidden relative mb-12 -mt-28 pb-4">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9E6]/30 to-transparent pointer-events-none" />

            {/* Slightly reduced negative margin to match new tighter gaps */}
            <div className="flex flex-col items-center justify-center -space-y-[1.95rem] md:-space-y-[3.1rem]">

                {/* Row 1 */}
                <div className="flex justify-center gap-[0.15rem] md:gap-[0.35rem] relative z-10 pl-0">
                    {row1.map((img, i) => (
                        <HexagonItem key={`r1-${i}-${uniqueId}`} img={img} index={i} />
                    ))}
                </div>

                {/* Row 2 - Interlocked (Shifted) */}
                <div className="flex justify-center gap-[0.15rem] md:gap-[0.35rem] relative z-20">
                    {/* The row itself is naturally centered by flex, so having 1 item less perfectly interlocks it under the gaps of Row 1 */}
                    {row2.map((img, i) => (
                        <HexagonItem key={`r2-${i}-${uniqueId}`} img={img} index={i + 20} />
                    ))}
                </div>

                {/* Row 3 - Aligned with Row 1 */}
                <div className="flex justify-center gap-[0.15rem] md:gap-[0.35rem] relative z-30">
                    {row3.map((img, i) => (
                        <HexagonItem key={`r3-${i}-${uniqueId}`} img={img} index={i + 39} />
                    ))}
                </div>

            </div>

            <style>{`
                .hexagon-clip {
                    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
                }
            `}</style>
        </div>
    );
};

export default HexagonGallery;
