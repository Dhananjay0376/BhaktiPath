import HeroSection from '../components/HeroSection';
import DivineCarousel from '../components/DivineCarousel';
import FeedbackDisplay from '../components/FeedbackDisplay';


const Home = () => {
    // DEPLOY_VERIFY: 2026-01-08T21:50:00
    return (
        <div className="relative pb-40 bg-[#fbfbf9] min-h-screen selection:bg-[#332d24] selection:text-white overflow-x-hidden">
            <HeroSection />

            {/* Note: Removed the standard text section Intro as the Carousel has its own header/dark mode vibe */}

            <DivineCarousel />

            <FeedbackDisplay />

            {/* Minimal Footer Element */}
            <div className="mt-20 flex flex-col items-center gap-8 opacity-40">
                <div className="w-[1px] h-32 bg-gradient-to-b from-[#332d24] to-transparent" />
                <span className="text-[11px] tracking-[0.8em] font-serif uppercase text-[#332d24] font-bold">The Pulse of Devotion</span>
            </div>

        </div>
    );
};

export default Home;
