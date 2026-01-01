import HeroSection from '../components/HeroSection';
import TempleCard from '../components/TempleCard';
import RevealText from '../components/RevealText';
import { templesData } from '../data/templesData';

const Home = () => {
    return (
        <div className="pb-20">
            <HeroSection />

            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl font-serif text-saffron-dark mb-4">Sacred Destinations</h2>
                    <div className="text-2xl font-light leading-relaxed max-w-3xl mx-auto">
                        <RevealText text="Explore the most revered temples and ghats in the ancient holy land of Braj, where every stone tells a story of devotion." />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {templesData.map((temple) => (
                        <TempleCard
                            key={temple.id}
                            id={temple.id}
                            name={temple.name}
                            location={temple.location}
                            description={temple.description}
                            timings={temple.timings}
                            image={temple.image}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
