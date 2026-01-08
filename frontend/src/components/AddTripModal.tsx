import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Loader2, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePlanner } from '../context/PlannerContext';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion, addDoc } from 'firebase/firestore';

const AddTripModal = () => {
    const { user } = useAuth();
    const { isPlannerOpen, closePlanner, activeTemple } = usePlanner();
    const [trips, setTrips] = useState<any[]>([]);
    const [loadingTrips, setLoadingTrips] = useState(false);
    const [addingToTrip, setAddingToTrip] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (user && isPlannerOpen) {
            fetchUserTrips();
        }
    }, [user, isPlannerOpen]);

    const fetchUserTrips = async () => {
        if (!user) return;
        setLoadingTrips(true);
        try {
            const q = query(collection(db, 'trips'), where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const userTrips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
            setTrips(userTrips);
        } catch (error) {
            console.error("Error fetching trips:", error);
        } finally {
            setLoadingTrips(false);
        }
    };

    const handleAddToTrip = async (tripId: string) => {
        if (!activeTemple) return;
        setAddingToTrip(tripId);
        try {
            const tripRef = doc(db, 'trips', tripId);
            await updateDoc(tripRef, {
                temples: arrayUnion({
                    id: activeTemple.id,
                    name: activeTemple.name,
                    addedAt: new Date(),
                    order: trips.find(t => t.id === tripId)?.temples?.length || 0
                })
            });
            setSuccessMessage('Added to your journey!');
            setTimeout(() => {
                setSuccessMessage('');
                closePlanner();
            }, 2000);
        } catch (error) {
            console.error("Error adding temple to trip:", error);
        } finally {
            setAddingToTrip(null);
        }
    };

    const handleCreateAndAdd = async () => {
        if (!user || !activeTemple) return;
        setAddingToTrip('new');
        try {
            const tripName = `My ${activeTemple.name} Trip`;
            await addDoc(collection(db, 'trips'), {
                name: tripName,
                userId: user.uid,
                createdAt: new Date(),
                status: 'Draft',
                temples: [{
                    id: activeTemple.id,
                    name: activeTemple.name,
                    addedAt: new Date(),
                    order: 0
                }]
            });
            setSuccessMessage('New trip created!');
            setTimeout(() => {
                setSuccessMessage('');
                closePlanner();
            }, 2000);
        } catch (error) {
            console.error("Error creating and adding trip:", error);
        } finally {
            setAddingToTrip(null);
        }
    };

    return (
        <AnimatePresence>
            {isPlannerOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePlanner}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-3xl w-full max-w-md overflow-hidden relative shadow-2xl border border-gold/20"
                    >
                        <button
                            onClick={closePlanner}
                            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-6 bg-gradient-to-br from-saffron to-saffron-dark text-white">
                            <h3 className="text-2xl font-serif">Add {activeTemple?.name} to Journey</h3>
                            <p className="text-white/80 text-sm">Select an itinerary or start a new one.</p>
                        </div>

                        <div className="p-6 max-h-[400px] overflow-y-auto">
                            {!user ? (
                                <div className="text-center py-8 space-y-4">
                                    <p className="text-gray-600">Please login to start planning your journey.</p>
                                    <button
                                        onClick={() => { closePlanner(); window.location.href = '/login'; }}
                                        className="px-8 py-3 bg-saffron text-white font-bold rounded-xl shadow-lg hover:bg-saffron-dark transition-all"
                                    >
                                        Log In
                                    </button>
                                </div>
                            ) : successMessage ? (
                                <div className="flex flex-col items-center justify-center py-8 text-saffron-dark space-y-4">
                                    <div className="p-4 bg-saffron/10 rounded-full">
                                        <Check size={48} />
                                    </div>
                                    <p className="font-bold text-xl">{successMessage}</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {loadingTrips ? (
                                        <div className="flex justify-center py-8">
                                            <Loader2 className="animate-spin text-saffron" size={32} />
                                        </div>
                                    ) : trips.length > 0 ? (
                                        <>
                                            {trips.map((trip) => (
                                                <button
                                                    key={trip.id}
                                                    onClick={() => handleAddToTrip(trip.id)}
                                                    disabled={addingToTrip !== null}
                                                    className="w-full p-4 rounded-xl border border-gray-100 hover:border-saffron hover:bg-saffron/5 transition-all text-left flex justify-between items-center group disabled:opacity-50"
                                                >
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-gray-800 truncate">{trip.name}</p>
                                                        <p className="text-xs text-gray-500">{trip.temples?.length || 0} temples planned</p>
                                                    </div>
                                                    {addingToTrip === trip.id ? (
                                                        <Loader2 size={18} className="animate-spin text-saffron" />
                                                    ) : (
                                                        <Plus size={18} className="text-gray-400 group-hover:text-saffron shrink-0" />
                                                    )}
                                                </button>
                                            ))}
                                            <div className="relative py-4">
                                                <div className="absolute inset-0 flex items-center">
                                                    <div className="w-full border-t border-gray-100"></div>
                                                </div>
                                                <div className="relative flex justify-center text-xs uppercase">
                                                    <span className="bg-white px-2 text-gray-400">Or</span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-center text-gray-500 italic py-4">No trips found. Let's create one!</p>
                                    )}

                                    <button
                                        onClick={handleCreateAndAdd}
                                        disabled={addingToTrip !== null}
                                        className="w-full p-4 rounded-xl border-2 border-dashed border-saffron/30 hover:border-saffron hover:bg-saffron/5 transition-all flex items-center justify-center gap-2 text-saffron-dark font-bold disabled:opacity-50"
                                    >
                                        {addingToTrip === 'new' ? (
                                            <Loader2 size={18} className="animate-spin" />
                                        ) : (
                                            <Plus size={18} />
                                        )}
                                        Create New Journey
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AddTripModal;
