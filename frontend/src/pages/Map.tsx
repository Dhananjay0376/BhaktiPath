import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { templesData } from '../data/templesData';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, Map as MapIcon } from 'lucide-react';

// Fix for default marker icon in Leaflet + React
const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper to center map
const MapUpdater = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
};

const Map = () => {
    const defaultCenter: [number, number] = [27.5706, 77.6908]; // Mathura/Vrindavan center
    const [activeLocation, setActiveLocation] = useState<[number, number]>(defaultCenter);
    const [selectedTempleId, setSelectedTempleId] = useState<number | null>(null);

    return (
        <div className="h-screen w-full relative bg-marble">
            {/* Header Overlay */}
            <div className="absolute top-0 left-0 w-full z-[1000] pointer-events-none p-4 md:p-6">
                <nav className="flex items-center justify-between pointer-events-auto">
                    <Link to="/" className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-saffron/20 group hover:shadow-saffron/40 transition-all">
                        <ArrowLeft size={18} className="text-saffron-dark group-hover:-translate-x-1 transition-transform" />
                        <span className="text-saffron-dark font-serif font-bold tracking-wide">Return</span>
                    </Link>

                    <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-saffron/20 hidden md:flex items-center gap-2">
                        <MapIcon size={18} className="text-saffron" />
                        <span className="text-gray-800 font-serif font-medium">Braj Yatra Navigation</span>
                    </div>
                </nav>
            </div>

            {/* The Interactive Map */}
            <MapContainer
                center={defaultCenter}
                zoom={12}
                scrollWheelZoom={true}
                className="h-full w-full z-10"
                style={{ height: '100vh', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapUpdater center={activeLocation} />

                {templesData.map((temple) => (
                    temple.coordinates && (
                        <Marker
                            key={temple.id}
                            position={temple.coordinates}
                            eventHandlers={{
                                click: () => {
                                    setActiveLocation(temple.coordinates!);
                                    setSelectedTempleId(temple.id);
                                },
                            }}
                        >
                            <Popup className="custom-popup">
                                <div className="text-center min-w-[200px] p-2">
                                    {temple.image && (
                                        <img src={temple.image} alt={temple.name} className="w-full h-24 object-cover rounded-md mb-2" />
                                    )}
                                    <h3 className="font-serif text-lg font-bold text-saffron-dark mb-1">{temple.name}</h3>
                                    <p className="text-xs text-gray-500 mb-3">{temple.location}</p>
                                    <Link
                                        to={`/temples/${temple.id}`}
                                        className="inline-block px-4 py-1.5 bg-saffron text-white text-xs font-bold rounded-full hover:bg-saffron-dark transition-colors"
                                    >
                                        View Darshan
                                    </Link>
                                </div>
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>

            {/* Sidebar / Overlay for List View (Desktop) */}
            <div className={`absolute top-24 right-4 md:right-6 bottom-8 w-80 bg-white/95 backdrop-blur-xl z-[1000] rounded-3xl shadow-2xl border border-white/40 flex flex-col overflow-hidden transition-transform duration-500 ${selectedTempleId ? 'translate-x-[120%] lg:translate-x-0' : 'translate-x-[120%] lg:translate-x-0'}`}>
                {/* This sidebar is hidden on mobile by default context, simplified for now: */}
                <div className="p-4 border-b border-gray-100 bg-saffron/5">
                    <h2 className="font-serif text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Compass size={18} className="text-saffron" />
                        Destinations
                    </h2>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {templesData.map(temple => (
                        <div
                            key={temple.id}
                            onClick={() => {
                                if (temple.coordinates) {
                                    setActiveLocation(temple.coordinates);
                                    setSelectedTempleId(temple.id);
                                }
                            }}
                            className={`p-3 rounded-xl cursor-pointer transition-all border ${selectedTempleId === temple.id ? 'bg-saffron/10 border-saffron/50 shadow-sm' : 'hover:bg-gray-50 border-transparent'}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                    <img src={temple.image} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className={`text-sm font-medium ${selectedTempleId === temple.id ? 'text-saffron-dark' : 'text-gray-700'}`}>{temple.name}</h4>
                                    <p className="text-xs text-gray-400">{temple.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Bottom Legend */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white px-6 py-2 rounded-full z-[1000] text-xs font-medium md:hidden pointer-events-none">
                Tap markers to explore
            </div>
        </div>
    );
};

export default Map;
