import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import footerBg from '../assets/Shri Radha.jpeg';

const Footer = () => {
    return (
        <footer className="relative bg-white pt-12 pb-6 md:pt-20 md:pb-8 overflow-hidden z-10 w-full shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-[#f0f0f0]">
            {/* Background Image - Clean, no gradient mask per request */}
            <div className="absolute inset-0 z-0">
                <img
                    src={footerBg}
                    alt="Footer Background"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 md:mb-12 items-start text-center md:text-left">
                    {/* Brand - Left Group (2 cols) */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col items-center md:items-start">
                        <h2 className="text-3xl font-serif font-bold text-saffron-dark mb-4 drop-shadow-sm">BhaktiPath</h2>
                        <p className="text-gray-800 mb-6 font-medium max-w-sm mx-auto md:mx-0">
                            Your digital gateway to the divine lands of Braj using modern technology to serve ancient spirituality.
                        </p>
                        <div className="flex space-x-4 justify-center md:justify-start">
                            <a href="#" className="text-gray-900 hover:text-saffron-dark transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-900 hover:text-saffron-dark transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-900 hover:text-saffron-dark transition-colors"><Instagram size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links - Left Group (Hybrid pos: 2 cols + padding to sit between col 2 & 3) */}
                    <div className="col-span-1 md:col-span-3 lg:col-span-2 md:pl-12">
                        <h3 className="text-lg font-bold mb-4 inline-block text-gray-900">Quick Links</h3>
                        <ul className="space-y-2 text-gray-800 font-medium">
                            <li><Link to="/temples" className="hover:text-saffron-dark transition-colors">Temples</Link></li>
                            <li><Link to="/food" className="hover:text-saffron-dark transition-colors">Prasadam & Food</Link></li>
                            <li><Link to="/hotels" className="hover:text-saffron-dark transition-colors">Dharamshalas</Link></li>
                            <li><Link to="/map" className="hover:text-saffron-dark transition-colors">Yatra Map</Link></li>
                        </ul>
                    </div>

                    {/* Spacer Column - Adjusted to 4 to balance */}
                    <div className="hidden md:block md:col-span-1 lg:col-span-4"></div>

                    {/* Support - Right Group */}
                    <div className="col-span-1 md:col-span-3 lg:col-span-2">
                        <h3 className="text-lg font-bold mb-4 inline-block text-gray-900">Support</h3>
                        <ul className="space-y-2 text-gray-800 font-medium">
                            <li><Link to="/team" className="hover:text-saffron-dark transition-colors">Team</Link></li>
                            <li><Link to="/guidelines" className="hover:text-saffron-dark transition-colors">Yatra Guidelines</Link></li>
                            <li><Link to="/feedbacks" className="hover:text-saffron-dark transition-colors">Pilgrim Voices</Link></li>
                        </ul>
                    </div>

                    {/* Contact - Right Group */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-bold mb-4 inline-block text-gray-900">Contact</h3>
                        <ul className="space-y-4 text-gray-800 font-medium w-fit md:w-auto">
                            <li className="flex items-start gap-3 text-left">
                                <MapPin size={20} className="text-saffron-dark mt-1 flex-shrink-0" />
                                <span>Mathura, Uttar Pradesh,<br />India - 281001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={20} className="text-saffron-dark flex-shrink-0" />
                                <span>+91 7351257315</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={20} className="text-saffron-dark flex-shrink-0" />
                                <span>bhaktipath.info@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm font-medium">
                    <p>© 2025 BhaktiPath. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
