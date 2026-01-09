import React, { createContext, useContext, useState } from 'react';

interface PlannerContextType {
    openPlanner: (temple: { id: number; name: string }) => void;
    closePlanner: () => void;
    activeTemple: { id: number; name: string } | null;
    isPlannerOpen: boolean;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

export const PlannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPlannerOpen, setIsPlannerOpen] = useState(false);
    const [activeTemple, setActiveTemple] = useState<{ id: number; name: string } | null>(null);

    const openPlanner = (temple: { id: number; name: string }) => {
        setActiveTemple(temple);
        setIsPlannerOpen(true);
    };

    const closePlanner = () => {
        setIsPlannerOpen(false);
        setActiveTemple(null);
    };

    return (
        <PlannerContext.Provider value={{ openPlanner, closePlanner, activeTemple, isPlannerOpen }}>
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
