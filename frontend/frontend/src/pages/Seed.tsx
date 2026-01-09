import { useEffect, useState } from 'react';
import { seedTemples } from '../utils/seedTemples';

const Seed = () => {
    const [status, setStatus] = useState('Initializing...');

    useEffect(() => {
        const runSeed = async () => {
            setStatus('Seeding data...');
            await seedTemples();
            setStatus('Seeding complete! Check console for details.');
        };
        runSeed();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-saffron-dark">
            {status}
        </div>
    );
};

export default Seed;
