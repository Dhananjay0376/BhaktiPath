import bankeyBihariImg from '../assets/bankey bihari.jpeg';
import premMandirImg from '../assets/prem mandir.jpg';
import janambhoomiImg from '../assets/janambhoomi.jpeg';
import shreeJiImg from '../assets/Shree ji.jpeg';
import iskonImg from '../assets/iskon.jpeg';
import charDhamImg from '../assets/char dham.jpeg';

import bankeBihariDeity from '../assets/banke_bihari_deity.png';
import radhaKrishnaDeity from '../assets/radha_krishna_deity.png';
import radhaRaniDeity from '../assets/radha_rani_deity.png';
import krishnaBalaramDeity from '../assets/krishna_balaram_deity.png';
import krishnaJanmabhoomiDeity from '../assets/krishna_janmabhoomi_deity.png';
import charDhamDeity from '../assets/char_dham_deity.png';

export interface Temple {
    id: number;
    name: string;
    location: string;
    description: string;
    timings: string;
    image: string;
    deityImage: string;
    fullAddress: string;
    mapQuery: string;
}

export const templesData: Temple[] = [
    {
        id: 1,
        name: "Banke Bihari Temple",
        location: "Vrindavan",
        description: "The most popular temple in Vrindavan, dedicated to Lord Krishna in his 'Banke' (bent in three places) posture. Known for its 'jhanki' (glimpse) style darshan, it is the heart of Vrindavan's devotion.",
        timings: "07:45 AM - 12:00 PM, 05:30 PM - 09:30 PM",
        image: bankeyBihariImg,
        deityImage: bankeBihariDeity,
        fullAddress: "Godowalia, Vrindavan, Uttar Pradesh 281121",
        mapQuery: "Bankey+Bihari+Temple+Vrindavan"
    },
    {
        id: 2,
        name: "Prem Mandir",
        location: "Vrindavan",
        description: "A divine monument of love made of pure white Italian marble. The temple complex showcases intricate carvings depicting the pastimes of Shri Radha Krishna and Shri Sita Ram.",
        timings: "05:30 AM - 12:00 PM, 04:30 PM - 08:30 PM",
        image: premMandirImg,
        deityImage: radhaKrishnaDeity,
        fullAddress: "Chattikara, Road, Raman Reti, Vrindavan, Uttar Pradesh 281121",
        mapQuery: "Prem+Mandir+Vrindavan"
    },
    {
        id: 3,
        name: "Krishna Janmabhoomi",
        location: "Mathura",
        description: "The most sacred site in Mathura, believed to be the exact birthplace of Lord Krishna. The complex includes the Keshavdeva Temple and the site of the ancient prison cell.",
        timings: "05:00 AM - 12:00 PM, 04:00 PM - 09:30 PM",
        image: janambhoomiImg,
        deityImage: krishnaJanmabhoomiDeity,
        fullAddress: "Janam Bhoomi, Mathura, Uttar Pradesh 281001",
        mapQuery: "Shree+Krishna+Janmasthan+Temple+Complex"
    },
    {
        id: 4,
        name: "Shri Radha Rani Temple",
        location: "Barsana",
        description: "Perched atop the Bhanugarh hill, this temple is dedicated to Shri Radha Rani, the queen of Barsana. It offers a panoramic view of the holy town and is the center of Lathmar Holi celebrations.",
        timings: "05:00 AM - 02:00 PM, 05:00 PM - 09:00 PM",
        image: shreeJiImg,
        deityImage: radhaRaniDeity,
        fullAddress: "Bhanugarh, Barsana, Uttar Pradesh 281405",
        mapQuery: "Shri+Radha+Rani+Temple+Barsana"
    },
    {
        id: 5,
        name: "ISKCON Temple",
        location: "Vrindavan",
        description: "Also known as Sri Krishna Balaram Mandir, it is one of the most vibrant ISKCON temples globally. It is famous for its beautiful architecture and soulful kirtans.",
        timings: "04:10 AM - 01:00 PM, 04:30 PM - 08:30 PM",
        image: iskonImg,
        deityImage: krishnaBalaramDeity,
        fullAddress: "Bhakti Vedant Swami Marg, Raman Reti, Vrindavan, Uttar Pradesh 281121",
        mapQuery: "ISKCON+Vrindavan"
    },
    {
        id: 6,
        name: "Char Dham Temple",
        location: "Vrindavan",
        description: "A unique spiritual park that houses replicas of the four major Hindu pilgrimage sites—Badrinath, Dwarka, Puri, and Rameshwaram—allowing devotees to experience Char Dham in one place.",
        timings: "06:00 AM - 08:00 PM",
        image: charDhamImg,
        deityImage: charDhamDeity,
        fullAddress: "Mathura-Vrindavan Road, Vrindavan, Uttar Pradesh 281121",
        mapQuery: "Char+Dham+Temple+Vrindavan"
    }
];
