import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { motion } from 'framer-motion';

const PlanTrip = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [tripName, setTripName] = useState('');
    const [trips, setTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

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
            await addDoc(collection(db, 'trips'), {
                name: tripName,
                userId: user.uid,
                createdAt: new Date(),
                status: 'Draft'
            });
            setTripName('');
            // Refresh trips
            const q = query(collection(db, 'trips'), where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const userTrips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTrips(userTrips);
        } catch (error) {
            console.error("Error creating trip:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen pt-20 px-4 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 mt-10"
            >
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-serif text-saffron-dark">Plan Your Divine Journey</h1>
                    <div className="text-gray-600">Welcome, {user.email}</div>
                </div>

                <form onSubmit={handleCreateTrip} className="mb-12">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={tripName}
                            onChange={(e) => setTripName(e.target.value)}
                            placeholder="Enter Trip Name (e.g., 'Vrindavan Weekend')"
                            className="flex-1 px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron/50"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 bg-gradient-to-r from-saffron to-saffron-dark text-white font-bold rounded-lg shadow-lg hover:shadow-saffron/30 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Trip'}
                        </button>
                    </div>
                </form>

                <h2 className="text-2xl font-serif text-gray-800 mb-6">Your Itineraries</h2>
                <div className="grid gap-4">
                    {trips.length === 0 ? (
                        <p className="text-gray-500 italic">No trips planned yet. Start a new journey above!</p>
                    ) : (
                        trips.map((trip) => (
                            <div key={trip.id} className="bg-white/40 p-6 rounded-xl border border-white/30 flex justify-between items-center hover:bg-white/60 transition-all">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{trip.name}</h3>
                                    <p className="text-sm text-gray-500">Status: {trip.status}</p>
                                </div>
                                <button className="text-saffron-dark font-medium hover:underline">View Details</button>
                            </div>
                        ))
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default PlanTrip;
