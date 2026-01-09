import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    const navLinks = [
        { name: 'Temples', path: '/temples' },
        { name: 'To-Do', path: '/todo' },
        { name: 'Food', path: '/food' },
        { name: 'Hotels', path: '/hotels' },
        { name: 'Map', path: '/map' },
    ];

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-gradient-to-r from-[#E65100]/90 via-[#FF9933]/90 via-[#FFD700]/90 to-[#FFFFFF]/90 backdrop-blur-md border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-3xl font-serif font-bold text-white drop-shadow-lg filter">BhaktiPath</span>
                    </Link>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link to="/" className="text-[#AE3708] hover:text-white transition-colors font-medium">Home</Link>
                            <Link to="/temples" className="text-[#AE3708] hover:text-white transition-colors font-medium">Temples</Link>
                            <a href="#" className="text-[#AE3708] hover:text-white transition-colors font-medium">Darshan</a>

                            {user ? (
                                <button onClick={logout} className="text-[#AE3708] hover:text-white transition-colors font-medium">Logout</button>
                            ) : (
                                <Link to="/login" className="px-4 py-2 bg-[#AE3708] text-white rounded-full hover:bg-[#AE3708]/90 transition-all font-medium">Login</Link>
                            )}
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-[#AE3708]">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 backdrop-blur-xl overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-[#AE3708] hover:text-saffron block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
