import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import RevealText from '../components/RevealText';

// Import Team Images
import anmolImg from '../assets/team/anmol.jpg';
import dhananjayImg from '../assets/team/dhananjay.jpg';
import srishtiImg from '../assets/team/srishti.jpg';
import jayImg from '../assets/team/jai.jpg'; // Filename is 'jai.jpg'

const teamMembers = [
    {
        id: 1,
        name: "Anmol Gola",
        role: "Project Lead",
        description: "Guiding the vision of BhaktiPath with devotion and technical expertise.",
        image: anmolImg,
        socials: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
        id: 2,
        name: "Dhananjay Narula",
        role: "Lead Developer",
        description: "Crafting the digital architecture to serve the pilgrims of Braj.",
        image: dhananjayImg,
        socials: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
        id: 3,
        name: "Srishti Upadhyay",
        role: "UI/UX Designer",
        description: "Weaving spiritual aesthetics into a seamless user experience.",
        image: srishtiImg,
        socials: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
        id: 4,
        name: "Jay Kumar Vidhani",
        role: "Content Strategist",
        description: "Curating the stories and history of the holy dham.",
        image: jayImg,
        socials: { twitter: "#", linkedin: "#", github: "#" }
    }
];

const Team = () => {
    return (
        <div className="min-h-screen bg-marble pb-12 pt-20 px-4 md:px-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto text-center mb-12 md:mb-20 space-y-4 md:space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-3xl md:text-7xl font-serif text-saffron-dark mb-4 drop-shadow-sm">
                        The Sevaks
                    </h1>
                    <div className="w-16 h-1 md:w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full"></div>
                </motion.div>

                <div className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 font-light italic leading-relaxed">
                    <RevealText text="Meet the dedicated souls working behind the scenes to bring the divine experience of Braj directly to you." />
                </div>
            </div>

            {/* Team Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {teamMembers.map((member, index) => (
                    <TeamMemberCard key={member.id} member={member} index={index} />
                ))}
            </div>

            {/* Bottom Quote */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-24 text-gold-dark font-serif opacity-60"
            >
                <p>"Serving the holy dham is the highest privilege."</p>
            </motion.div>
        </div>
    );
};

const TeamMemberCard = ({ member, index }: { member: any, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="group relative"
        >
            <div className="h-full bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-6 shadow-xl hover:shadow-saffron/20 transition-all duration-500 flex flex-col items-center text-center overflow-hidden">

                {/* Decorative Background Blur */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-saffron/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

                {/* Avatar */}
                <div className="relative w-32 h-32 mb-6 rounded-full p-1 bg-gradient-to-tr from-saffron via-gold to-saffron-dark shadow-lg group-hover:scale-105 transition-transform duration-500">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden relative">
                        {member.image ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                            <>
                                {/* Fallback pattern */}
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                <span className="text-4xl text-saffron-dark/20 font-serif">
                                    {member.name.charAt(0)}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Info */}
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-1 group-hover:text-saffron-dark transition-colors">
                    {member.name}
                </h3>
                <p className="text-saffron font-medium text-sm tracking-uppercase mb-4 uppercase tracking-widest text-[10px]">
                    {member.role}
                </p>

                <p className="text-gray-600 text-sm leading-relaxed mb-8 min-h-[60px]">
                    {member.description}
                </p>

                {/* Social Links */}
                <div className="flex gap-4 mt-auto opacity-60 group-hover:opacity-100 transition-opacity">
                    <a href={member.socials.github} className="p-2 hover:bg-saffron/10 rounded-full hover:text-saffron-dark transition-colors">
                        <Github size={18} />
                    </a>
                    <a href={member.socials.linkedin} className="p-2 hover:bg-saffron/10 rounded-full hover:text-saffron-dark transition-colors">
                        <Linkedin size={18} />
                    </a>
                    <a href={member.socials.twitter} className="p-2 hover:bg-saffron/10 rounded-full hover:text-saffron-dark transition-colors">
                        <Twitter size={18} />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default Team;
