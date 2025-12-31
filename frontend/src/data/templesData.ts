import bankeyBihariImg from '../assets/bankey bihari.jpeg';
import premMandirImg from '../assets/prem mandir.jpg';
import janambhoomiImg from '../assets/janambhoomi.jpeg';
import shreeJiImg from '../assets/Shree ji.jpeg';
import iskonImg from '../assets/iskon.jpeg';
import charDhamImg from '../assets/char dham.jpeg';

export interface Temple {
    id: number;
    name: string;
    location: string;
    description: string;
    timings: string;
    image: string;
}

export const templesData: Temple[] = [
    {
        id: 1,
        name: "Banke Bihari Temple",
        location: "Vrindavan",
        description: "The most popular temple in Vrindavan, dedicated to Lord Krishna.",
        timings: "07:45 AM - 12:00 PM",
        image: bankeyBihariImg
    },
    {
        id: 2,
        name: "Prem Mandir",
        location: "Vrindavan",
        description: "A massive white marble temple managed by Kripalu Maharaj's trust.",
        timings: "05:30 AM - 12:00 PM",
        image: premMandirImg
    },
    {
        id: 3,
        name: "Krishna Janmabhoomi",
        location: "Mathura",
        description: "The birthplace of Lord Krishna. A site of great historical significance.",
        timings: "05:00 AM - 12:00 PM",
        image: janambhoomiImg
    },
    {
        id: 4,
        name: "Shri Radha Rani Temple",
        location: "Barsana",
        description: "The majestic temple dedicated to Goddess Radha, situated on the Bhanugarh hills.",
        timings: "05:00 AM - 02:00 PM",
        image: shreeJiImg
    },
    {
        id: 5,
        name: "ISKCON Temple",
        location: "Vrindavan",
        description: "Sri Krishna Balaram Mandir, known for its beautiful architecture and spiritual vibrancy.",
        timings: "04:10 AM - 08:30 PM",
        image: iskonImg
    },
    {
        id: 6,
        name: "Char Dham Temple",
        location: "Vrindavan",
        description: "A unique temple complex housing replicas of the four sacred Dhams of India.",
        timings: "06:00 AM - 08:00 PM",
        image: charDhamImg
    }
];
