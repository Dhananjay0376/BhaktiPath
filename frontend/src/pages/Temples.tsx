import { Link } from 'react-router-dom';
import TempleCard from '../components/TempleCard';
import RevealText from '../components/RevealText';
import { motion } from 'framer-motion';
import { templesData } from '../data/templesData';

const Temples = () => {
    return (
        <div className="min-h-screen pt-28 px-4 md:px-8 max-w-7xl mx-auto pb-20">
            <div className="text-center mb-16 space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-serif text-saffron-dark mb-4 drop-shadow-sm"
                >
                    Temples of Braj
                </motion.h1>
                <div className="text-xl font-light leading-relaxed max-w-3xl mx-auto text-gray-700">
                    <RevealText text="Discover the eternal abodes of divinity, where every stone echoes with the chants of Radhe Radhe." />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {templesData.map((temple) => (
                    <Link to={`/temples/${temple.id}`} key={temple.id} className="h-96 block group">
                        {/* Wrapping in div to ensure height constraint for 3D card */}
                        <TempleCard
                            name={temple.name}
                            description={temple.description}
                            image={temple.image}
                            location={temple.location}
                            timings={temple.timings}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Temples;
