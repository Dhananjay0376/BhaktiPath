import bankeyBihariImg from '../assets/bankey bihari.jpeg';
import premMandirImg from '../assets/prem mandir.jpg';
import janambhoomiImg from '../assets/janambhoomi.jpeg';
import shreeJiImg from '../assets/Shree ji.jpeg';
import iskonImg from '../assets/iskon.jpeg';
import charDhamImg from '../assets/char dham.jpeg';
import dwarkadhishImg from '../assets/dwarkadhish.png';
import gitaMandirImg from '../assets/gita_mandir.png';
import bhuteshwarImg from '../assets/bhuteshwar.png';
import radhaVallabhImg from '../assets/radha_vallabh.png';
import radhaRamanNewImg from '../assets/radha_raman_temple.jpg';
import govindDevNewImg from '../assets/govind_dev_temple.jpg';

// Extra Gallery Images - Batch 1
import galleryExtra01 from '../assets/gallery_extra_01.jpg';
import galleryExtra02 from '../assets/gallery_extra_02.jpg';
import galleryExtra03 from '../assets/gallery_extra_03.jpg';
import galleryExtra04 from '../assets/gallery_extra_04.jpg';
import galleryExtra05 from '../assets/gallery_extra_05.jpg';
import galleryExtra06 from '../assets/gallery_extra_06.jpg';
import galleryExtra07 from '../assets/gallery_extra_07.jpg';
import galleryExtra08 from '../assets/gallery_extra_08.jpg';
import galleryExtra09 from '../assets/gallery_extra_09.jpg';
import galleryExtra10 from '../assets/gallery_extra_10.jpg';
import galleryExtra11 from '../assets/gallery_extra_11.jpg';
// Extra Gallery Images - Batch 2
import galleryExtra12 from '../assets/gallery_extra_12.jpg';
import galleryExtra13 from '../assets/gallery_extra_13.jpg';
import galleryExtra14 from '../assets/gallery_extra_14.jpg';
import galleryExtra15 from '../assets/gallery_extra_15.jpg';
import galleryExtra16 from '../assets/gallery_extra_16.jpg';
import galleryExtra17 from '../assets/gallery_extra_17.jpg';
import galleryExtra18 from '../assets/gallery_extra_18.jpg';
import galleryExtra19 from '../assets/gallery_extra_19.jpg';
import galleryExtra20 from '../assets/gallery_extra_20.jpg';
import galleryExtra21 from '../assets/gallery_extra_21.jpg';
import galleryExtra22 from '../assets/gallery_extra_22.jpg';

// Generic Spiritual Images (Generated)
import galleryGeneric01 from '../assets/gallery_generic_01.png';
import galleryGeneric02 from '../assets/gallery_generic_02.png';
import galleryGeneric03 from '../assets/gallery_generic_03.png';
import galleryGeneric04 from '../assets/gallery_generic_04.png';
import galleryGeneric05 from '../assets/gallery_generic_05.png';
import galleryGeneric06 from '../assets/gallery_generic_06.png';
import galleryGeneric07 from '../assets/gallery_generic_07.png';
import galleryGeneric08 from '../assets/gallery_generic_08.png';
import galleryGeneric09 from '../assets/gallery_generic_09.png';
import galleryGeneric10 from '../assets/gallery_generic_10.png';
import galleryGeneric11 from '../assets/gallery_generic_11.png';
// Extra Gallery Images
import janambhoomiDetail from '../assets/mathura_janambhoomi_detail.png';
import dwarkadhishDetail from '../assets/mathura_dwarkadhish_detail.png';
import radhaRaniSteps from '../assets/barsana_radha_rani_steps.png';
import ramanRetiSand from '../assets/gokul_raman_reti_sand.png';
import nandBhavanView from '../assets/nandgaon_nand_bhavan_view.png';
import premMandirNight from '../assets/vrindavan_prem_mandir_night.png';
import nidhivanForest from '../assets/vrindavan_nidhivan_forest.png';
import kesiGhat from '../assets/vrindavan_kesi_ghat.png';
import iskconInterior from '../assets/vrindavan_iskcon_interior.png';
import kirtiMandirPeacock from '../assets/kirti_mandir_peacock.jpg';
import yamunaBg from '../assets/yamuna_bg.png';

// Govardhan Images
import govardhanHillView from '../assets/govardhan_hill_view.png';
import govardhanDanGhati from '../assets/govardhan_dan_ghati_temple.png';
import govardhanRadhaKund from '../assets/govardhan_radha_kund.png';
import govardhanKusumSarovar from '../assets/govardhan_kusum_sarovar_view.png';
import govardhanMansiGanga from '../assets/govardhan_mansi_ganga_view.png';
import govardhanGirirajShila from '../assets/govardhan_giriraj_shila.png';
import govardhanKrishnaRadha from '../assets/govardhan_krishna_radha_deity.png';
import govardhanMukharvind from '../assets/govardhan_mukharvind_shila.png';
import govardhanParikrama from '../assets/govardhan_parikrama_path.png';

import bankeBihariDeity from '../assets/banke_bihari_deity.png';
import radhaKrishnaDeity from '../assets/radha_krishna_deity.png';
import radhaRaniDeity from '../assets/radha_rani_deity.png';
import krishnaBalaramDeity from '../assets/krishna_balaram_deity.png';
import krishnaJanmabhoomiDeity from '../assets/krishna_janmabhoomi_deity.png';
import charDhamDeity from '../assets/char_dham_deity.png';

// --- IMAGE POOLS ---

const genericPool = [
    galleryGeneric01, galleryGeneric02, galleryGeneric03, galleryGeneric04, galleryGeneric05,
    galleryGeneric06, galleryGeneric07, galleryGeneric08, galleryGeneric09, galleryGeneric10,
    galleryExtra01, galleryExtra02, galleryExtra03, galleryExtra04, galleryExtra05,
    galleryExtra06, galleryExtra07, galleryExtra08, galleryExtra09, galleryExtra10
];

const vrindavanPool = [
    kesiGhat, nidhivanForest, iskconInterior, premMandirNight,
    galleryExtra11, galleryExtra12, galleryExtra13, galleryExtra14,
    galleryExtra05, galleryExtra06 // Overlap with generic is fine
];

const mathuraPool = [
    yamunaBg, vishramGhatImg, janambhoomiDetail, dwarkadhishDetail,
    galleryExtra15, galleryExtra16, galleryExtra17,
    galleryExtra01, galleryGeneric11
];

const barsanaPool = [
    radhaRaniSteps, kirtiMandirPeacock, maanMandirImg,
    galleryExtra18, galleryExtra19, galleryExtra20,
    galleryExtra10, galleryExtra11
];

const gokulPool = [
    ramanRetiSand, yamunaBg, chaurasiKhambaImg,
    galleryExtra21, galleryExtra22,
    galleryExtra03, galleryExtra04
];

const nandgaonPool = [
    nandBhavanView, pavanSarovarImg,
    galleryExtra18, galleryExtra19, galleryExtra20
];

const govardhanPool = [
    govardhanParikrama, govardhanGirirajShila, govardhanMukharvind,
    govardhanKrishnaRadha, govardhanHillView, govardhanKusumSarovar,
    galleryExtra07, galleryExtra08, galleryExtra09, // Borrowing some generic nature/temple shots
    galleryGeneric01, galleryGeneric02
];

// Helper to shuffle and combine
const createGallery = (specific: string[], pool: string[]) => {
    // Combine specific images + location pool + generic pool
    // Use Set to remove duplicates
    const combined = Array.from(new Set([...specific, ...pool, ...genericPool]));
    // We do not shuffle here to keep react render consistent, but the diversity is high.
    // If strict uniqueness in layout is needed, HexagonGallery handles slicing.
    return combined;
};

import vishramGhatImg from '../assets/vishram_ghat.jpg';
import kirtiMandirImg from '../assets/kirti_mandir.jpg';
import ramanRetiImg from '../assets/raman_reti_mandir.jpg';
import nandBhavanImg from '../assets/Nanda-Bhavan.jpg';
import brahmandGhatImg from '../assets/Brahmand-Ghat.jpg';
import nidhivanImg from '../assets/nidhivan_vrindavan.jpg';
import rangjiMandirImg from '../assets/rangji_mandir_vrindavan.jpg';
import maanMandirImg from '../assets/maan_mandir.jpg';
import pavanSarovarImg from '../assets/pavan_sarovar.jpg';
import rajaThakurImg from '../assets/Gokul_temple.jpg';
import chaurasiKhambaImg from '../assets/Chaurasi_Khamba.jpg';

export interface Temple {
    id: number;
    name: string;
    location: string;
    description: string;
    timings: string;
    image: string;
    deityImage: string;
    galleryImages?: string[];
    fullAddress: string;
    mapQuery: string;
    coordinates: [number, number]; // [Latitude, Longitude]
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
        galleryImages: createGallery([bankeBihariDeity, kesiGhat], vrindavanPool),
        fullAddress: "Godowalia, Vrindavan, Uttar Pradesh 281121",
        mapQuery: "Bankey+Bihari+Temple+Vrindavan",
        coordinates: [27.5815, 77.7006]
    },
    {
        id: 2,
        name: "Prem Mandir",
        location: "Vrindavan",
        description: "A divine monument of love made of pure white Italian marble. The temple complex showcases intricate carvings depicting the pastimes of Shri Radha Krishna and Shri Sita Ram.",
        timings: "05:30 AM - 12:00 PM, 04:30 PM - 08:30 PM",
        image: premMandirImg,
        deityImage: radhaKrishnaDeity,
        galleryImages: createGallery([premMandirNight, premMandirImg], vrindavanPool),
        fullAddress: "Chattikara, Road, Raman Reti, Vrindavan, Uttar Pradesh 281121",
        mapQuery: "Prem+Mandir+Vrindavan",
        coordinates: [27.5724, 77.6738]
    },
    {
        id: 3,
        name: "Krishna Janmabhoomi",
        location: "Mathura",
        description: "The most sacred site in Mathura, believed to be the exact birthplace of Lord Krishna. The complex includes the Keshavdeva Temple and the site of the ancient prison cell.",
        timings: "05:00 AM - 12:00 PM, 04:00 PM - 09:30 PM",
        image: janambhoomiImg,
        deityImage: krishnaJanmabhoomiDeity,
        galleryImages: createGallery([janambhoomiDetail, krishnaJanmabhoomiDeity, janambhoomiImg], mathuraPool),
        fullAddress: "Janam Bhoomi, Mathura, Uttar Pradesh 281001",
        mapQuery: "Shree+Krishna+Janmasthan+Temple+Complex",
        coordinates: [27.5050, 77.6690]
    },
    {
        id: 4,
        name: "Shri Radha Rani Temple",
        location: "Barsana",
        description: "Perched atop the Bhanugarh hill, this temple is dedicated to Shri Radha Rani, the queen of Barsana. It offers a panoramic view of the holy town and is the center of Lathmar Holi celebrations.",
        timings: "05:00 AM - 02:00 PM, 05:00 PM - 09:00 PM",
        image: shreeJiImg,
        deityImage: radhaRaniDeity,
        galleryImages: createGallery([radhaRaniSteps, radhaRaniDeity], barsanaPool),
        fullAddress: "Bhanugarh, Barsana, Uttar Pradesh 281405",
        mapQuery: "Shri+Radha+Rani+Temple+Barsana",
        coordinates: [27.7126, 77.3752]
    },
    {
        id: 5,
        name: "ISKCON Temple",
        location: "Vrindavan",
        description: "Also known as Sri Krishna Balaram Mandir, it is one of the most vibrant ISKCON temples globally. It is famous for its beautiful architecture and soulful kirtans.",
        timings: "04:10 AM - 01:00 PM, 04:30 PM - 08:30 PM",
        image: iskonImg,
        deityImage: krishnaBalaramDeity,
        galleryImages: createGallery([iskconInterior, krishnaBalaramDeity], vrindavanPool),
        fullAddress: "Bhakti Vedant Swami Marg, Raman Reti, Vrindavan, Uttar Pradesh 281121",
        mapQuery: "ISKCON+Vrindavan",
        coordinates: [27.5746, 77.6795]
    },
    {
        id: 6,
        name: "Char Dham Temple",
        location: "Vrindavan",
        description: "A unique spiritual park that houses replicas of the four major Hindu pilgrimage sites—Badrinath, Dwarka, Puri, and Rameshwaram—allowing devotees to experience Char Dham in one place.",
        timings: "06:00 AM - 08:00 PM",
        image: charDhamImg,
        deityImage: charDhamDeity,
        galleryImages: createGallery([charDhamDeity, charDhamImg], vrindavanPool),
        fullAddress: "Mathura-Vrindavan Road, Vrindavan, Uttar Pradesh 281121",
        mapQuery: "Char+Dham+Temple+Vrindavan",
        coordinates: [27.5670, 77.6700]
    },
    {
        id: 7,
        name: "Dwarkadhish Temple",
        location: "Mathura",
        description: "One of the oldest and largest temples in Mathura, known for its amazing architecture and paintings. It is dedicated to Lord Krishna in his form as the 'King of Dwarka'.",
        timings: "06:30 AM - 10:30 AM, 04:00 PM - 07:00 PM",
        image: dwarkadhishImg,
        deityImage: radhaKrishnaDeity,
        galleryImages: createGallery([dwarkadhishDetail, dwarkadhishImg], mathuraPool),
        fullAddress: "Chatta Bazar, Mathura, Uttar Pradesh 281001",
        mapQuery: "Dwarkadhish+Temple+Mathura",
        coordinates: [27.5065, 77.6845]
    },
    {
        id: 8,
        name: "Vishram Ghat",
        location: "Mathura",
        description: "The most sacred bathing ghat in Mathura on the banks of Yamuna. It is believed that Lord Krishna rested here after killing the tyrant Kansa.",
        timings: "Open 24 hours (Aarti: 07:00 PM)",
        image: vishramGhatImg,
        deityImage: radhaKrishnaDeity,
        galleryImages: createGallery([yamunaBg, vishramGhatImg], mathuraPool),
        fullAddress: "Vishram Bazar, Mathura, Uttar Pradesh 281001",
        mapQuery: "Vishram+Ghat+Mathura",
        coordinates: [27.5025, 77.6880]
    },
    {
        id: 9,
        name: "Gita Mandir",
        location: "Mathura",
        description: "Also known as Birla Mandir, this temple is famous for having the entire Bhagavad Gita inscribed on its walls. The architecture is a blend of traditional and modern styles.",
        timings: "06:00 AM - 12:00 PM, 04:00 PM - 08:00 PM",
        image: gitaMandirImg,
        deityImage: radhaKrishnaDeity,
        galleryImages: createGallery([gitaMandirImg], mathuraPool),
        fullAddress: "Vrindavan Road, Mathura, Uttar Pradesh 281003",
        mapQuery: "Gita+Mandir+Mathura",
        coordinates: [27.5250, 77.6600]
    },
    {
        id: 10,
        name: "Radha Vallabh Temple",
        location: "Vrindavan",
        description: "One of the oldest temples in Vrindavan, emphasizing the devotion to Radha Rani as the supreme power. The temple is unique for its architectural beauty and devotion-filled atmosphere.",
        timings: "05:00 AM - 12:00 PM, 06:00 PM - 09:00 PM",
        image: radhaVallabhImg,
        deityImage: radhaKrishnaDeity,
        galleryImages: createGallery([radhaKrishnaDeity, kesiGhat, nidhivanForest], vrindavanPool),
        fullAddress: "Gotam Nagar, Vrindavan, Uttar Pradesh 281121",
        mapQuery: "Radha+Vallabh+Temple+Vrindavan",
        coordinates: [27.5830, 77.7010]
    },
    {
        id: 11,
        name: "Radha Raman Temple",
        location: "Vrindavan",
        description: "Dedicated to Lord Krishna as Radha Ramana. The deity here is self-manifested from a Shaligram Shila and is known for its exquisite beauty.",
        timings: "08:00 AM - 12:30 PM, 06:00 PM - 08:00 PM",
        image: radhaRamanNewImg,
        deityImage: radhaKrishnaDeity,
        galleryImages: createGallery([radhaKrishnaDeity, kesiGhat, nidhivanForest, radhaRamanNewImg], vrindavanPool),
        fullAddress: "Pancayati Gaushala, Vrindavan, Uttar Pradesh 281121",
        mapQuery: "Radha+Raman+Temple+Vrindavan",
        coordinates: [27.5840, 77.7030]
    },
    {
        id: 12,
        name: "Kirti Mandir",
        location: "Barsana",
        description: "A beautiful temple dedicated to Kirti Maiya, the mother of Shri Radha Rani. Built with colorful stones, it is a masterpiece of modern craftsmanship.",
        timings: "05:30 AM - 12:00 PM, 04:30 PM - 08:30 PM",
        image: kirtiMandirImg,
        deityImage: radhaRaniDeity,
        galleryImages: createGallery([kirtiMandirPeacock, kirtiMandirImg], barsanaPool),
        fullAddress: "Barsana, Uttar Pradesh 281405",
        mapQuery: "Kirti+Mandir+Barsana",
        coordinates: [27.7100, 77.3780]
    },
    {
        id: 13,
        name: "Raman Reti",
        location: "Gokul",
        description: "A sacred place where Lord Krishna played in the sands during his childhood. Devotees often roll in the holy sands as a sign of their devotion.",
        timings: "05:00 AM - 09:00 PM",
        image: ramanRetiImg,
        deityImage: radhaKrishnaDeity,
        galleryImages: createGallery([ramanRetiSand, krishnaBalaramDeity, yamunaBg], gokulPool),
        fullAddress: "Gokul, Uttar Pradesh 281303",
        mapQuery: "Raman+Reti+Gokul",
        coordinates: [27.4350, 77.7020]
    },
    {
        id: 14,
        name: "Nand Bhavan",
        location: "Nandgaon",
        description: "The house where Nanda Baba, the foster father of Lord Krishna, lived. It is situated on the hills of Nandishwar and is the focal point of Nandgaon.",
        timings: "05:00 AM - 02:00 PM, 04:00 PM - 09:00 PM",
        image: nandBhavanImg,
        deityImage: radhaKrishnaDeity,
        galleryImages: createGallery([nandBhavanView, nandBhavanImg], nandgaonPool),
        fullAddress: "Nandgaon, Uttar Pradesh 281403",
        mapQuery: "Nand+Bhavan+Nandgaon",
        coordinates: [27.7150, 77.3850]
    },
    {
        id: 15,
        name: "Brahmand Ghat",
        location: "Gokul",
        description: "The spot where baby Krishna showed the entire universe in his mouth to his mother Yashoda. Situated on the banks of Yamuna.",
        timings: "Open 24 hours",
        image: brahmandGhatImg,
        deityImage: radhaKrishnaDeity,
        galleryImages: createGallery([brahmandGhatImg, yamunaBg], gokulPool),
        fullAddress: "Brahmand Ghat, Gokul, Uttar Pradesh 281303",
        mapQuery: "Brahmand+Ghat+Gokul",
        coordinates: [27.4300, 77.7050]
    },
    {
        id: 16,
        name: "Nidhivan",
        location: "Vrindavan",
        description: "A mysterious forest where it is believed Lord Krishna performs Raas Leela every night. The twisted basil (Tulsi) trees here are considered Gopis.",
        timings: "05:00 AM - 07:00 PM",
        image: nidhivanImg,
        deityImage: radhaKrishnaDeity,
        galleryImages: createGallery([nidhivanForest, nidhivanImg], vrindavanPool),
        fullAddress: "Gotam Nagar, Vrindavan, Uttar Pradesh 281121",
        mapQuery: "Nidhivan+Vrindavan",
        coordinates: [27.5800, 77.6980]
    },
    {
        id: 17,
        name: "Rangji Mandir",
        location: "Vrindavan",
        description: "The largest temple in Vrindavan, built in the South Indian Dravidian style. It is dedicated to Lord Ranganatha (Lord Vishnu) and is famous for its 50-feet high Dhwaja Stambha.",
        timings: "05:30 AM - 10:30 AM, 04:00 PM - 09:00 PM",
        image: rangjiMandirImg,
        deityImage: radhaKrishnaDeity,
        galleryImages: createGallery([rangjiMandirImg], vrindavanPool),
        fullAddress: "Godowalia, Vrindavan, Uttar Pradesh 281121",
        mapQuery: "Rangji+Temple+Vrindavan",
        coordinates: [27.5800, 77.6920]
    },
    {
        id: 18,
        name: "Govind Dev Temple",
        location: "Vrindavan",
        description: "A magnificent red sandstone structure that was once seven stories high. Built by Raja Man Singh of Jaipur in 1590, it is an architectural marvel.",
        timings: "08:00 AM - 12:30 PM, 04:30 PM - 08:30 PM",
        image: govindDevNewImg,
        deityImage: radhaKrishnaDeity,
        galleryImages: createGallery([govindDevNewImg, nidhivanForest], vrindavanPool),
        fullAddress: "Vrindavan, Uttar Pradesh 281121",
        mapQuery: "Govind+Dev+Temple+Vrindavan",
        coordinates: [27.5825, 77.6950]
    },
    {
        id: 19,
        name: "Maan Mandir",
        location: "Barsana",
        description: "Located on the peak of Maangarh hill, this is where Shri Radha Rani would go when she was in 'Maana' (divine loving anger). It is a place of deep meditative silence.",
        timings: "05:00 AM - 09:00 PM",
        image: maanMandirImg,
        deityImage: radhaRaniDeity,
        galleryImages: createGallery([maanMandirImg, radhaRaniDeity], barsanaPool),
        fullAddress: "Maangarh, Barsana, Uttar Pradesh 281405",
        mapQuery: "Maan+Mandir+Barsana",
        coordinates: [27.7100, 77.3700]
    },
    {
        id: 20,
        name: "Pavan Sarovar",
        location: "Nandgaon",
        description: "A large and sacred lake at the foot of Nandishwar hill. It is said that Nand Baba used to bathe Krishna here every day.",
        timings: "Open 24 hours",
        image: pavanSarovarImg,
        deityImage: radhaKrishnaDeity,
        galleryImages: createGallery([pavanSarovarImg, nandBhavanView], nandgaonPool),
        fullAddress: "Nandgaon, Uttar Pradesh 281403",
        mapQuery: "Pavan+Sarovar+Nandgaon",
        coordinates: [27.7180, 77.3880]
    },
    {
        id: 21,
        name: "Raja Thakur Temple",
        location: "Gokul",
        description: "The principal temple of Gokul, housing the ancient deity of Lord Krishna. It is the spiritual center of the town where all major festivities begin.",
        timings: "06:00 AM - 12:00 PM, 04:00 PM - 08:00 PM",
        image: rajaThakurImg,
        deityImage: radhaKrishnaDeity,
        galleryImages: createGallery([ramanRetiSand, krishnaBalaramDeity, yamunaBg], gokulPool),
        fullAddress: "Gokul, Uttar Pradesh 281303",
        mapQuery: "Raja+Thakur+Temple+Gokul",
        coordinates: [27.4350, 77.7020]
    },
    {
        id: 22,
        name: "Chaurasi Khamba",
        location: "Gokul",
        description: "An ancient structure with eighty-four pillars, believed to be the palace of Nanda Baba. It reflects the simple yet profound history of Krishna's upbringing.",
        timings: "07:00 AM - 07:00 PM",
        image: chaurasiKhambaImg,
        deityImage: radhaKrishnaDeity,
        galleryImages: createGallery([chaurasiKhambaImg], gokulPool),
        fullAddress: "Mahaban, Gokul, Uttar Pradesh 281303",
        mapQuery: "Chaurasi+Khamba+Gokul",
        coordinates: [27.4330, 77.7040]
    },
    {
        id: 23,
        name: "Bhuteshwar Mahadev",
        location: "Mathura",
        description: "One of the oldest temples in Mathura, dedicated to Lord Shiva as the protector of the holy city. It is one of the four 'Dikpalas' of Mathura.",
        timings: "05:00 AM - 09:00 PM",
        image: bhuteshwarImg,
        deityImage: radhaKrishnaDeity,
        galleryImages: createGallery([bhuteshwarImg, yamunaBg], mathuraPool),
        fullAddress: "Bhuteshwar, Mathura, Uttar Pradesh 281001",
        mapQuery: "Bhuteshwar+Mahadev+Temple+Mathura",
        coordinates: [27.4980, 77.6650]
    },
    {
        id: 24,
        name: "Govardhan Hill",
        location: "Govardhan",
        description: "The sacred hill lifted by Lord Krishna on his little finger to protect the inhabitants of Braj from Indra's wrath. It is worshipped as the natural form of Krishna himself.",
        timings: "Open 24 hours",
        image: govardhanHillView,
        deityImage: govardhanGirirajShila,
        galleryImages: createGallery([govardhanHillView, govardhanGirirajShila, govardhanParikrama], govardhanPool),
        fullAddress: "Govardhan, Mathura, Uttar Pradesh 281502",
        mapQuery: "Govardhan+Hill+Mathura",
        coordinates: [27.5000, 77.4667]
    },
    {
        id: 25,
        name: "Dan Ghati Temple",
        location: "Govardhan",
        description: "A prominent temple dedicated to the 'Dan Ghati' Leela, where Krishna collected toll (Dan) from the Gopis. The deity is a rock in the form of Lord Krishna.",
        timings: "05:00 AM - 10:00 PM",
        image: govardhanDanGhati,
        deityImage: govardhanMukharvind,
        galleryImages: createGallery([govardhanDanGhati, govardhanMukharvind], govardhanPool),
        fullAddress: "Dan Ghati, Govardhan, Uttar Pradesh 281502",
        mapQuery: "Dan+Ghati+Temple+Govardhan",
        coordinates: [27.4980, 77.4650]
    },
    {
        id: 26,
        name: "Radha Kund",
        location: "Govardhan",
        description: "The most sacred lake in the universe for Gaudiya Vaishnavas, created by Srimati Radharani. It represents the highest form of divine love.",
        timings: "Open 24 hours",
        image: govardhanRadhaKund,
        deityImage: govardhanKrishnaRadha,
        galleryImages: createGallery([govardhanRadhaKund, govardhanKrishnaRadha], govardhanPool),
        fullAddress: "Radha Kund, Govardhan, Uttar Pradesh 281504",
        mapQuery: "Radha+Kund+Govardhan",
        coordinates: [27.5230, 77.4870]
    },
    {
        id: 27,
        name: "Kusum Sarovar",
        location: "Govardhan",
        description: "A historical sandstone monument and sarovar where the Gopis plucked flowers for Krishna. The evening aarti here creates a mesmerizing atmosphere.",
        timings: "Open 24 hours",
        image: govardhanKusumSarovar,
        deityImage: govardhanKrishnaRadha,
        galleryImages: createGallery([govardhanKusumSarovar, govardhanKrishnaRadha], govardhanPool),
        fullAddress: "Radha Kund Road, Govardhan, Uttar Pradesh 281502",
        mapQuery: "Kusum+Sarovar+Govardhan",
        coordinates: [27.5100, 77.4700]
    },
    {
        id: 28,
        name: "Mansi Ganga",
        location: "Govardhan",
        description: "A large holy lake in the heart of Govardhan town, believed to have been created by Krishna's mind (Manas). It is considered as sacred as the Ganges.",
        timings: "Open 24 hours",
        image: govardhanMansiGanga,
        deityImage: govardhanMukharvind,
        galleryImages: createGallery([govardhanMansiGanga, govardhanMukharvind], govardhanPool),
        fullAddress: "Govardhan, Uttar Pradesh 281502",
        mapQuery: "Mansi+Ganga+Govardhan",
        coordinates: [27.5020, 77.4620]
    }
];
