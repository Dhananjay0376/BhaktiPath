import { db } from '../firebase/config';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const templesData = [
    {
        name: "Banke Bihari Temple",
        location: "Vrindavan",
        description: "The most popular temple in Vrindavan, dedicated to Lord Krishna.",
        timings: "07:45 AM - 12:00 PM",
        image: "https://images.unsplash.com/photo-1572978335967-4fd77bc95452?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Prem Mandir",
        location: "Vrindavan",
        description: "A massive white marble temple managed by Kripalu Maharaj's trust.",
        timings: "05:30 AM - 12:00 PM",
        image: "https://images.unsplash.com/photo-1596707323719-216cb8442fa6?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Krishna Janmabhoomi",
        location: "Mathura",
        description: "The birthplace of Lord Krishna. A site of great historical significance.",
        timings: "05:00 AM - 12:00 PM",
        image: "https://images.unsplash.com/photo-1622306778486-da641017e884?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Shri Radha Rani Temple",
        location: "Barsana",
        description: "The majestic temple dedicated to Goddess Radha, situated on the Bhanugarh hills.",
        timings: "05:00 AM - 02:00 PM",
        image: "https://images.unsplash.com/photo-1676203926573-066531952e46?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "ISKCON Temple",
        location: "Vrindavan",
        description: "Sri Krishna Balaram Mandir, known for its beautiful architecture and spiritual vibrancy.",
        timings: "04:10 AM - 08:30 PM",
        image: "https://images.unsplash.com/photo-1544131566-6b240167c69d?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Char Dham Temple",
        location: "Vrindavan",
        description: "A unique temple complex housing replicas of the four sacred Dhams of India.",
        timings: "06:00 AM - 08:00 PM",
        image: "https://images.unsplash.com/photo-1574577457474-05d544062a4d?auto=format&fit=crop&w=800&q=80"
    }
];

export const seedTemples = async () => {
    try {
        const templesRef = collection(db, 'temples');
        // Check if data already exists to prevent duplicates
        const snapshot = await getDocs(templesRef);

        if (snapshot.size === 0) {
            console.log("Seeding temples data...");
            for (const temple of templesData) {
                await addDoc(templesRef, temple);
            }
            console.log("Temples data seeded successfully!");
            alert("Temples seeded successfully!");
        } else {
            console.log("Temples collection already has data. Skipping seed.");
            alert("Data already exists in Firestore.");
        }
    } catch (error) {
        console.error("Error seeding temples:", error);
        alert("Error seeding data: " + error);
    }
};
