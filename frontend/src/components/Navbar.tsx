import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { regionsData } from '../data/regionsData';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isBrajDropdownOpen, setIsBrajDropdownOpen] = useState(false);
    const { user, logout } = useAuth();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsBrajDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Journey', path: '/plan-trip' },
        { name: 'To-Do', path: '/todo' },
        { name: 'Food', path: '/food' },
        { name: 'Hotels', path: '/hotels' },
        { name: 'Map', path: '/map' },
    ];

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-gradient-to-r from-[#E65100]/90 via-[#FF9933]/90 via-[#FFD700]/90 to-[#FFFFFF]/90 backdrop-blur-md border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-lg filter">BhaktiPath</span>
                    </Link>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link to="/" className="text-[#AE3708] hover:text-white transition-colors font-medium">Home</Link>

                            <Link to="/plan-trip" className="text-[#AE3708] hover:text-white transition-colors font-medium">Journey</Link>

                            {/* Braj Darshan Mega Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    className={`flex items-center gap-1 hover:text-white transition-colors font-medium focus:outline-none tracking-wide ${isBrajDropdownOpen ? 'text-white' : 'text-[#AE3708]'}`}
                                    onClick={() => setIsBrajDropdownOpen(!isBrajDropdownOpen)}
                                >
                                    Braj Darshan
                                </button>

                                <AnimatePresence>
                                    {isBrajDropdownOpen && (
                                        <>
                                            {/* Invisible backdrop to close on click outside if needed, though simpler to just toggle */}

                                            <motion.div
                                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                                className="absolute top-full right-0 mt-4 w-96 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-[#d4af37]/30 overflow-hidden py-4 z-50 ring-1 ring-black/5 origin-top-right"
                                            >
                                                {/* Decorative Top Arrow */}
                                                <div className="absolute -top-1 right-8 w-4 h-4 bg-white rotate-45 border-l border-t border-[#d4af37]/30" />

                                                <div className="px-3 space-y-2 relative z-10">
                                                    {regionsData.map((region, index) => (
                                                        <motion.div
                                                            key={region.id}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.05 }}
                                                            onClick={() => {
                                                                setIsBrajDropdownOpen(false);
                                                                navigate(`/temples?location=${region.name}`);
                                                            }}
                                                            className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#fff9e6] hover:to-transparent cursor-pointer transition-all"
                                                        >
                                                            {/* Thumbnail */}
                                                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#d4af37]/20 shadow-md shrink-0 group-hover:scale-105 group-hover:border-[#d4af37]/50 transition-all duration-300">
                                                                <img src={region.image} alt={region.name} className="w-full h-full object-cover" />
                                                            </div>

                                                            {/* Text */}
                                                            <div className="flex-1">
                                                                <span className="block text-gray-800 font-serif text-lg font-bold group-hover:text-[#AE3708] transition-colors">
                                                                    {region.name}
                                                                </span>
                                                            </div>

                                                            {/* Icon */}
                                                            <ArrowRight size={18} className="text-[#AE3708] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>



                            {user ? (
                                <div className="flex flex-col items-center gap-1">
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full border-2 border-[#AE3708] object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-[#AE3708]/10 flex items-center justify-center border-2 border-[#AE3708]">
                                            <UserIcon size={18} className="text-[#AE3708]" />
                                        </div>
                                    )}
                                    <button
                                        onClick={logout}
                                        className="text-xs text-[#AE3708] hover:text-white transition-colors font-medium hover:underline"
                                    >
                                        Logout
                                    </button>
                                </div>
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
                </div >
            </div >

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
        </nav >
    );
};

export default Navbar;
// Force refresh
