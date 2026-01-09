import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import footerBg from '../assets/Shri Radha.jpeg';

const Footer = () => {
    return (
        <footer className="relative text-gray-900 pt-16 pb-8 border-t border-black/10 overflow-hidden">
            {/* Background Image with Light Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={footerBg}
                    alt="Footer Background"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-3xl font-serif font-bold text-saffron-dark mb-4 drop-shadow-sm">BhaktiPath</h2>
                        <p className="text-gray-800 mb-6 font-medium">
                            Your digital gateway to the divine lands of Braj using modern technology to serve ancient spirituality.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-900 hover:text-saffron-dark transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-900 hover:text-saffron-dark transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-900 hover:text-saffron-dark transition-colors"><Instagram size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 border-b border-saffron-dark/30 pb-2 inline-block text-gray-900">Quick Links</h3>
                        <ul className="space-y-2 text-gray-800 font-medium">
                            <li><a href="/temples" className="hover:text-saffron-dark transition-colors">Temples</a></li>
                            <li><a href="/food" className="hover:text-saffron-dark transition-colors">Prasadam & Food</a></li>
                            <li><a href="/hotels" className="hover:text-saffron-dark transition-colors">Dharamshalas</a></li>
                            <li><a href="/map" className="hover:text-saffron-dark transition-colors">Yatra Map</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 border-b border-saffron-dark/30 pb-2 inline-block text-gray-900">Support</h3>
                        <ul className="space-y-2 text-gray-800 font-medium">
                            <li><a href="#" className="hover:text-saffron-dark transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-saffron-dark transition-colors">Yatra Guidelines</a></li>
                            <li><a href="#" className="hover:text-saffron-dark transition-colors">Weather Info</a></li>
                            <li><a href="#" className="hover:text-saffron-dark transition-colors">Emergency Numbers</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 border-b border-saffron-dark/30 pb-2 inline-block text-gray-900">Contact</h3>
                        <ul className="space-y-4 text-gray-800 font-medium">
                            <li className="flex items-start gap-3">
                                <MapPin size={20} className="text-saffron-dark mt-1" />
                                <span>Mathura, Uttar Pradesh,<br />India - 281001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={20} className="text-saffron-dark" />
                                <span>+91 7351257315</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={20} className="text-saffron-dark" />
                                <span>info@bhaktipath.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm font-medium">
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
