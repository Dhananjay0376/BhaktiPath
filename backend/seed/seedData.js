const mongoose = require('mongoose');
const Temple = require('../models/Temple');
require('dotenv').config({ path: '../.env' });

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bhaktipath')
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => console.error(err));

const temples = [
    {
        name: "Banke Bihari Temple",
        location: "Vrindavan",
        description: "The holiest and most famous temple of Lord Krishna in the world. The idol of Banke Bihari Ji is said to be the one granted to Swami Haridas by the Lord himself. The eyes of the deity are so powerful that a curtain is pulled shut every few minutes to prevent devotees from being overwhelmed by the divine gaze.",
        history: "Established by Swami Haridas, the guru of Tansen. The deity was originally worshipped at Nidhivan.",
        timings: "07:45 AM - 12:00 PM, 05:30 PM - 09:30 PM",
        aartiTimings: "Shringar: 08:00 AM, Rajbhog: 12:00 PM, Shayan: 09:30 PM",
        entryRules: "No photography inside.",
        bestTime: "Holi, Janmashtami",
        festivals: ["Holi", "Janmashtami", "Jhulan Yatra"],
        images: [
            "https://images.unsplash.com/photo-1678615967980-60b6b23af41a?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1688626578051-7f92025ed9f3?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1579970928043-4f938ad7427b?q=80&w=2069&auto=format&fit=crop"
        ],
        latitude: 27.5802,
        longitude: 77.7032
    },
    {
        name: "Prem Mandir",
        location: "Vrindavan",
        description: "A monument of divine love, Prem Mandir is a massive temple made of white marble. It features intricate carvings depicting the pastimes of Radha Krishna and Sita Ram. at night, the temple lights up in spectacular changing colors.",
        history: "Construction began in 2001 and completed in 2012 by Jagadguru Kripalu Maharaj.",
        timings: "05:30 AM - 12:00 PM, 04:30 PM - 08:30 PM",
        aartiTimings: "Morning: 05:30 AM, Evening: 04:30 PM",
        entryRules: "Free entry.",
        bestTime: "Evening for light show",
        festivals: ["Radhashtami", "Janmashtami"],
        images: [
            "https://images.unsplash.com/photo-1598877292276-88223652875b?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1563721345647-73d8cc38d02c?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1582555694295-8868ce8877f0?q=80&w=2070&auto=format&fit=crop"
        ],
        latitude: 27.5724,
        longitude: 77.6749
    },
    {
        name: "Shri Krishna Janmabhoomi",
        location: "Mathura",
        description: "The sacred birthplace of Lord Krishna. The main temple is built around the prison cell where Lord Krishna was born to Devaki and Vasudev. It is the spiritual heart of Mathura.",
        history: "The temple has been destroyed and rebuilt multiple times throughout history.",
        timings: "05:00 AM - 12:00 PM, 04:00 PM - 09:30 PM",
        aartiTimings: "Mangala: 05:30 AM",
        entryRules: "Strict security check. No mobiles.",
        bestTime: "Janmashtami",
        festivals: ["Janmashtami"],
        images: [
            "https://images.unsplash.com/photo-1572909476906-8c502da8392f?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1604516335198-4dba568903b7?q=80&w=2070&auto=format&fit=crop"
        ],
        latitude: 27.5050,
        longitude: 77.6690
    },
    {
        name: "ISKCON Vrindavan",
        location: "Vrindavan",
        description: "Also known as Sri Sri Krishna Balaram Mandir, this is one of the major ISKCON temples in the world. The temple complex is a center of spiritual learning and Kirtan that continues 24 hours a day.",
        history: "Inaugurated in 1975 by A.C. Bhaktivedanta Swami Prabhupada.",
        timings: "04:10 AM - 12:45 PM, 04:30 PM - 08:30 PM",
        aartiTimings: "Mangala: 04:10 AM",
        entryRules: "Modest dress required.",
        bestTime: "Kartik Month",
        festivals: ["Janmashtami", "Radhashtami", "Gaura Purnima"],
        images: [
            "https://images.unsplash.com/photo-1626248694038-028a27d2c34c?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1566831498363-27eb84852c5c?q=80&w=2070&auto=format&fit=crop"
        ],
        latitude: 27.5746,
        longitude: 77.6746
    },
    {
        name: "Radha Raman Temple",
        location: "Vrindavan",
        description: "Radha Raman means 'One who gives pleasure to Radha'. This temple is unique because the deity of Krishna self-manifested from a Saligram Shila.",
        history: "Established by Gopal Bhatta Goswami in 1542.",
        timings: "08:00 AM - 12:30 PM, 06:00 PM - 08:00 PM",
        aartiTimings: "Mangala: 04:00 AM (Winters)",
        entryRules: "Traditional attire preferred.",
        bestTime: "Radhashtami",
        festivals: ["Radhashtami", "Janmashtami"],
        images: [
            "https://images.unsplash.com/photo-1583084793263-dcde6b1d4484?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1655110826978-687f8279430c?q=80&w=2070&auto=format&fit=crop"
        ],
        latitude: 27.5815,
        longitude: 77.7055
    },
    {
        name: "Dwarkadhish Temple",
        location: "Mathura",
        description: "A beautiful temple dedicated to Lord Krishna as the King of Dwarka. It is known for its intricate architecture and paintings along the Yamuna ghats.",
        history: "Built in 1814 by Seth Gokul Das Parikh, the treasurer of the Gwalior Estate.",
        timings: "06:30 AM - 10:30 AM, 04:00 PM - 07:00 PM",
        aartiTimings: "Mangala: 06:30 AM",
        entryRules: "No photography inside.",
        bestTime: "Hindola Festival (Shravan month)",
        festivals: ["Hindola", "Janmashtami"],
        images: [
            "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1623943340058-d99ac1055745?q=80&w=2071&auto=format&fit=crop"
        ],
        latitude: 27.5028,
        longitude: 77.6835
    }
];

const seedDB = async () => {
    try {
        await Temple.deleteMany({});
        await Temple.insertMany(temples);
        console.log('Temples Seeded');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
