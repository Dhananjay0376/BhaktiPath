import TempleCard from '../components/TempleCard';
import RevealText from '../components/RevealText';
import { motion } from 'framer-motion';
import { templesData } from '../data/templesData';
import { useSearchParams } from 'react-router-dom';
import HexagonGallery from '../components/HexagonGallery';
import FeedbackForm from '../components/FeedbackForm';

const Temples = () => {
    const [searchParams] = useSearchParams();
    const locationFilter = searchParams.get('location');

    const filteredTemples = locationFilter
        ? templesData.filter(temple => {
            console.log(`Checking temple: ${temple.name}, Location: ${temple.location}, Filter: ${locationFilter}`);
            return temple.location.trim().toLowerCase() === locationFilter.trim().toLowerCase();
        })
        : templesData;

    const title = locationFilter ? `Temples of ${locationFilter}` : 'Temples of Braj';

    // Collect all images for the gallery (structures + deities + extras) for variety
    const baseImages = filteredTemples.flatMap(t => [t.image, t.deityImage, ...(t.galleryImages || [])]).filter(Boolean);

    // Shuffle the images to prevent repetitive patterns
    // HexagonGallery handles filling the count, we just provide the source.
    const displayImages = baseImages.sort(() => Math.random() - 0.5);

    return (
        <div className="min-h-screen pb-20">
            {/* Full Width Gallery */}
            <div className="w-full mb-8">
                <HexagonGallery images={displayImages} />
            </div>

            {/* Constrained Content */}
            <div className="px-4 md:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-serif text-saffron-dark mb-4 drop-shadow-sm"
                    >
                        {title}
                    </motion.h1>
                    <div className="text-xl font-light leading-relaxed max-w-3xl mx-auto text-gray-700">
                        <RevealText text="Discover the eternal abodes of divinity, where every stone echoes with the chants of Radhe Radhe." />
                    </div>
                </div>

                {filteredTemples.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredTemples.map((temple) => (
                            <TempleCard
                                key={temple.id}
                                id={temple.id}
                                name={temple.name}
                                description={temple.description}
                                image={temple.image}
                                location={temple.location}
                                timings={temple.timings}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-2xl text-gray-500 font-serif">No temples found for {locationFilter}.</p>
                        <p className="text-gray-400 mt-2">More divine destinations coming soon.</p>
                    </div>
                )}
            </div>
            {/* Feedback Section */}
            <div className="mt-20">
                <FeedbackForm />
            </div>
        </div>
    );
};

export default Temples;
