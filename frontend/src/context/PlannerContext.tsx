import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from './AuthContext';

interface PlannerContextType {
    openPlanner: (temple: { id: number; name: string }) => void;
    closePlanner: () => void;
    activeTemple: { id: number; name: string } | null;
    isPlannerOpen: boolean;
    activeTripId: string | null;
    activeTripName: string | null;
    setActiveTrip: (tripId: string, tripName: string) => void;
    trips: any[];
    loadingTrips: boolean;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

export const PlannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [isPlannerOpen, setIsPlannerOpen] = useState(false);
    const [activeTemple, setActiveTemple] = useState<{ id: number; name: string } | null>(null);
    const [activeTripId, setActiveTripId] = useState<string | null>(null);
    const [activeTripName, setActiveTripName] = useState<string | null>(null);
    const [trips, setTrips] = useState<any[]>([]);
    const [loadingTrips, setLoadingTrips] = useState(true);

    useEffect(() => {
        if (!user) {
            setTrips([]);
            setLoadingTrips(false);
            return;
        }

        setLoadingTrips(true);
        const q = query(collection(db, 'trips'), where('userId', '==', user.uid));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const userTrips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const sortedTrips = userTrips.sort((a: any, b: any) =>
                (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
            );
            setTrips(sortedTrips);
            setLoadingTrips(false);
        }, (error) => {
            console.error("Error listening to global trips:", error);
            setLoadingTrips(false);
        });

        return () => unsubscribe();
    }, [user]);

    const openPlanner = (temple: { id: number; name: string }) => {
        setActiveTemple(temple);
        setIsPlannerOpen(true);
    };

    const closePlanner = () => {
        setIsPlannerOpen(false);
        setActiveTemple(null);
    };

    const setActiveTrip = (tripId: string, tripName: string) => {
        setActiveTripId(tripId);
        setActiveTripName(tripName);
    };

    return (
        <PlannerContext.Provider value={{
            openPlanner,
            closePlanner,
            activeTemple,
            isPlannerOpen,
            activeTripId,
            activeTripName,
            setActiveTrip,
            trips,
            loadingTrips
        }}>
            {children}
        </PlannerContext.Provider>
    );
};

export const usePlanner = () => {
    const context = useContext(PlannerContext);
    if (context === undefined) {
        throw new Error('usePlanner must be used within a PlannerProvider');
    }
    return context;
};
