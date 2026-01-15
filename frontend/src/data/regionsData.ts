
import janambhoomiImg from '../assets/janambhoomi.jpeg';
import shreeJiImg from '../assets/Shree ji.jpeg';


export interface Region {
    id: string;
    name: string;
    tagline: string;
    description: string;
    image: string;
    rowSpan: number;
    colSpan: number;
}

export const regionsData: Region[] = [
    {
        id: "vrindavan",
        name: "Vrindavan",
        tagline: "The City of 5000 Temples",
        description: "The playful playground of Shri Krishna, where every street resonates with 'Radhe Radhe'.",
        image: "https://www.theindia.co.in/blog/wp-content/uploads/2020/08/Vrindavan-temple.jpg",
        rowSpan: 2,
        colSpan: 2,
    },
    {
        id: "mathura",
        name: "Mathura",
        tagline: "The Sacred Birthplace",
        description: "One of the oldest living cities in the world and the birthplace of the Lord.",
        image: janambhoomiImg,
        rowSpan: 1,
        colSpan: 1,
    },
    {
        id: "barsana",
        name: "Barsana",
        tagline: "Home of Shri Radha",
        description: "The hilltop town dedicated to the Queen of Braj, Shri Radha Rani.",
        image: shreeJiImg,
        rowSpan: 1,
        colSpan: 1,
    },
    {
        id: "nandgaon",
        name: "Nandgaon",
        tagline: "Village of Nand Baba",
        description: "The place where Krishna spent his childhood days under the care of Nand Baba.",
        image: "https://www.radhekrishn.com/images/nand-bhagwan-nandgaon.jpg",
        rowSpan: 1,
        colSpan: 1,
    },
    {
        id: "gokul",
        name: "Gokul",
        tagline: "The Cradle of Krishna",
        description: "Where Vasudev secretly brought infant Krishna to protect him from Kansa.",
        image: "https://www.mathuracabs.com/packages/2-night-3-days-gokul-mathura-vrindavan-tour.webp",
        rowSpan: 1,
        colSpan: 1,
    },
    {
        id: "goverdhan",
        name: "Govardhan",
        tagline: "The Sacred Hill",
        description: "The holy hill lifted by Krishna on his little finger to protect his people.",
        image: "https://www.tusktravel.com/images/mathura/mathura-tusktravel-02.jpg",
        rowSpan: 1,
        colSpan: 2,
    }
];
