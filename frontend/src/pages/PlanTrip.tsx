import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { MapPin, Calendar, Trash2, ChevronRight, Loader2, Map as MapIcon, Clock, GripVertical, Compass } from 'lucide-react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Check } from 'lucide-react';

const PlanTrip = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [tripName, setTripName] = useState('');
    const [trips, setTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState<any>(null);
    const [deletingTrip, setDeletingTrip] = useState<string | null>(null);

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    // Fetch User's Trips
    useEffect(() => {
        if (user) {
            const fetchTrips = async () => {
                const q = query(collection(db, 'trips'), where('userId', '==', user.uid));
                const querySnapshot = await getDocs(q);
                const userTrips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setTrips(userTrips);
            };
            fetchTrips();
        }
    }, [user]);

    const handleCreateTrip = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tripName) return;

        setLoading(true);
        try {
            const newTrip = {
                name: tripName,
                userId: user.uid,
                createdAt: new Date(),
                status: 'Draft',
                temples: []
            };
            const docRef = await addDoc(collection(db, 'trips'), newTrip);
            setTripName('');
            setTrips([{ id: docRef.id, ...newTrip }, ...trips]);
        } catch (error) {
            console.error("Error creating trip:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTrip = async (e: React.MouseEvent, tripId: string) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this itinerary?")) return;

        setDeletingTrip(tripId);
        try {
            await deleteDoc(doc(db, 'trips', tripId));
            setTrips(trips.filter(t => t.id !== tripId));
            if (selectedTrip?.id === tripId) setSelectedTrip(null);
        } catch (error) {
            console.error("Error deleting trip:", error);
        } finally {
            setDeletingTrip(null);
        }
    };
    const handleReorder = async (newTemples: any[]) => {
        if (!selectedTrip) return;

        // Update local state immediately for snappy feel
        const updatedTrip = { ...selectedTrip, temples: newTemples };
        setSelectedTrip(updatedTrip);
        setTrips(trips.map(t => t.id === selectedTrip.id ? updatedTrip : t));

        try {
            const tripRef = doc(db, 'trips', selectedTrip.id);
            await updateDoc(tripRef, {
                temples: newTemples
            });
        } catch (error) {
            console.error("Error updating temple order:", error);
        }
    };

    const handleRemoveTemple = async (templeId: string) => {
        if (!selectedTrip || !window.confirm("Remove this temple from your journey?")) return;

        const newTemples = selectedTrip.temples.filter((t: any) => t.id !== templeId);
        handleReorder(newTemples);
    };

    const handleUpdateTime = async (templeId: string, time: string) => {
        if (!selectedTrip) return;
        const newTemples = selectedTrip.temples.map((t: any) =>
            t.id === templeId ? { ...t, darshanTime: time } : t
        );
        handleReorder(newTemples);
    };

    const handleToggleVisited = async (templeId: string) => {
        if (!selectedTrip) return;
        const newTemples = selectedTrip.temples.map((t: any) =>
            t.id === templeId ? { ...t, visited: !t.visited } : t
        );
        handleReorder(newTemples);
    };

    const handleUpdateNotes = async (templeId: string, notes: string) => {
        if (!selectedTrip) return;
        const newTemples = selectedTrip.temples.map((t: any) =>
            t.id === templeId ? { ...t, notes: notes } : t
        );
        handleReorder(newTemples);
    };

    const generateRouteUrl = () => {
        if (!selectedTrip || !selectedTrip.temples || selectedTrip.temples.length === 0) return "";

        const temples = selectedTrip.temples;
        const origin = encodeURIComponent(temples[0].name + ", Vrindavan");
        const destination = encodeURIComponent(temples[temples.length - 1].name + ", Vrindavan");

        let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;

        if (temples.length > 2) {
            const waypoints = temples.slice(1, -1)
                .map((t: any) => encodeURIComponent(t.name + ", Vrindavan"))
                .join('|');
            url += `&waypoints=${waypoints}`;
        }

        return url;
    };

    if (!user) return null;

    return (
        <div className="min-h-screen pt-28 px-4 max-w-6xl mx-auto pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Sidebar: Trips List */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-4 space-y-6"
                >
                    <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
                        <h1 className="text-3xl font-serif text-saffron-dark mb-6">Plan Journey</h1>

                        <form onSubmit={handleCreateTrip} className="mb-8">
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={tripName}
                                    onChange={(e) => setTripName(e.target.value)}
                                    placeholder="Trip Name (e.g., Vrindavan Visit)"
                                    className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron/50 text-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-2 bg-gradient-to-r from-saffron to-saffron-dark text-white font-bold rounded-lg shadow-md hover:shadow-saffron/20 transition-all disabled:opacity-50 text-sm"
                                >
                                    {loading ? 'Creating...' : 'Create New Journey'}
                                </button>
                            </div>
                        </form>

                        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Calendar size={18} className="text-saffron" /> Your Itineraries
                        </h2>

                        <div className="space-y-3">
                            {trips.length === 0 ? (
                                <p className="text-gray-500 italic text-sm">No journeys planned yet.</p>
                            ) : (
                                trips.map((trip) => (
                                    <div
                                        key={trip.id}
                                        onClick={() => setSelectedTrip(trip)}
                                        className={`p-4 rounded-xl border transition-all cursor-pointer group flex justify-between items-center ${selectedTrip?.id === trip.id
                                            ? 'bg-saffron/10 border-saffron shadow-sm'
                                            : 'bg-white/40 border-white/30 hover:bg-white/60'
                                            }`}
                                    >
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-gray-800 truncate">{trip.name}</h3>
                                            <p className="text-xs text-gray-500">{trip.temples?.length || 0} stops</p>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => handleDeleteTrip(e, trip.id)}
                                                className="p-1 hover:text-red-500 transition-colors"
                                                disabled={deletingTrip === trip.id}
                                            >
                                                {deletingTrip === trip.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                            </button>
                                            <ChevronRight size={16} className="text-gray-400" />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Right Content: Trip Details / Itinerary */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-8"
                >
                    <AnimatePresence mode="wait">
                        {selectedTrip ? (
                            <motion.div
                                key={selectedTrip.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/40 min-h-[500px]"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h2 className="text-4xl font-serif text-gray-800 mb-2">{selectedTrip.name}</h2>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1"><Calendar size={14} /> Created {new Date(selectedTrip.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                                            <span className="px-2 py-0.5 bg-saffron/20 text-saffron-dark rounded-full text-xs font-bold uppercase">{selectedTrip.status}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => window.open(generateRouteUrl(), '_blank')}
                                            disabled={!selectedTrip.temples?.length}
                                            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-saffron to-saffron-dark text-white rounded-full text-sm font-bold hover:shadow-lg transition-all shadow-md active:scale-95 disabled:opacity-50"
                                        >
                                            <Compass size={16} /> View Divine Route
                                        </button>
                                        <button
                                            onClick={() => navigate(`/temples`)}
                                            className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium hover:border-saffron hover:text-saffron transition-all shadow-sm"
                                        >
                                            <MapIcon size={16} /> Add More Temples
                                        </button>
                                    </div>
                                </div>

                                {/* Itinerary Timeline */}
                                <div className="space-y-4 relative">
                                    {selectedTrip.temples?.length > 0 && (
                                        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-saffron via-saffron/20 to-transparent lg:left-8"></div>
                                    )}

                                    {selectedTrip.temples?.length === 0 ? (
                                        <div className="text-center py-20 bg-saffron/5 rounded-3xl border-2 border-dashed border-saffron/20">
                                            <MapPin size={48} className="mx-auto text-saffron/30 mb-4" />
                                            <h3 className="text-xl font-serif text-gray-700">Your path is empty</h3>
                                            <p className="text-gray-500 max-w-xs mx-auto mt-2">Start adding temples from the darshan list to build your spiritual route.</p>
                                        </div>
                                    ) : (
                                        <Reorder.Group axis="y" values={selectedTrip.temples} onReorder={handleReorder} className="space-y-4">
                                            {selectedTrip.temples.map((temple: any, index: number) => (
                                                <Reorder.Item
                                                    key={temple.id + temple.addedAt?.seconds}
                                                    value={temple}
                                                    className="relative flex items-center gap-6 group"
                                                >
                                                    {/* Stop Number Icon */}
                                                    <div className="relative z-10 w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-white shadow-xl border-2 border-saffron/20 flex items-center justify-center text-saffron-dark font-serif text-xl lg:text-2xl group-hover:scale-110 transition-transform">
                                                        {index + 1}
                                                    </div>

                                                    <div className="flex-1 bg-white/80 p-5 rounded-2xl shadow-lg border border-white hover:border-saffron/30 transition-all flex items-center gap-4">
                                                        <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-saffron transition-colors">
                                                            <GripVertical size={20} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <div className="flex items-center gap-2">
                                                                        <h4 className={`text-xl font-serif text-gray-800 truncate ${temple.visited ? 'line-through opacity-50' : ''}`}>{temple.name}</h4>
                                                                        {temple.visited && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">VISITED</span>}
                                                                    </div>
                                                                    <div className="flex items-center gap-4 mt-2 text-[10px] text-gray-500 uppercase tracking-widest">
                                                                        <div className="flex items-center gap-2 bg-white border border-gray-100 px-2 py-1 rounded-md">
                                                                            <Clock size={10} className="text-saffron" />
                                                                            <input
                                                                                type="time"
                                                                                value={temple.darshanTime || ""}
                                                                                onChange={(e) => handleUpdateTime(temple.id, e.target.value)}
                                                                                className="bg-transparent outline-none focus:text-saffron-dark transition-colors"
                                                                            />
                                                                        </div>
                                                                        <span className="flex items-center gap-1"><MapPin size={10} /> Vrindavan</span>
                                                                    </div>
                                                                    <div className="mt-3">
                                                                        <textarea
                                                                            placeholder="Spiritual notes or Seva plans..."
                                                                            value={temple.notes || ""}
                                                                            onChange={(e) => handleUpdateNotes(temple.id, e.target.value)}
                                                                            className="w-full bg-white/50 border border-gray-100 rounded-xl p-2 text-[11px] outline-none focus:border-saffron/30 transition-all resize-none h-16"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <button
                                                                        onClick={() => handleToggleVisited(temple.id)}
                                                                        className={`p-2 rounded-lg transition-all ${temple.visited ? 'bg-green-100 text-green-600' : 'bg-gray-50 text-gray-400 hover:bg-saffron/10 hover:text-saffron'}`}
                                                                        title={temple.visited ? "Mark as Unvisited" : "Mark as Visited"}
                                                                    >
                                                                        <Check size={14} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => navigate(`/temples/${temple.id}`)}
                                                                        className="text-saffron opacity-0 group-hover:opacity-100 transition-opacity font-bold text-[10px] uppercase tracking-wider"
                                                                    >
                                                                        Details
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleRemoveTemple(temple.id)}
                                                                        className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                    >
                                                                        <Trash2 size={14} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Reorder.Item>
                                            ))}
                                        </Reorder.Group>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white/20 backdrop-blur-sm rounded-3xl border-2 border-dashed border-white/40">
                                <div className="w-24 h-24 bg-saffron/10 rounded-full flex items-center justify-center mb-6">
                                    <MapIcon size={40} className="text-saffron" />
                                </div>
                                <h2 className="text-3xl font-serif text-gray-800 mb-4">Your Spiritual Journey</h2>
                                <p className="text-gray-600 max-w-md">Select an itinerary from the sidebar or create a new one to start planning your divine path through the sacred temples of Vrindavan.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default PlanTrip;
