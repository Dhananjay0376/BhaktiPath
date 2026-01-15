export interface FoodSpot {
    id: number;
    name: string;
    location: "Vrindavan" | "Mathura" | "Govardhan";
    type: "Temple Prasadam" | "Sattvic Eatery" | "Sweet Shop";
    description: string;
    mustTry: string;
    timings: string;
    image: string; // Using existing assets as placeholders if needed, or specific ones
}

export const foodData: FoodSpot[] = [
    {
        id: 1,
        name: "Banke Bihari Prasadam",
        location: "Vrindavan",
        type: "Temple Prasadam",
        description: "The most divine prasadam in Braj. The 'Makhan Mishri' and 'Peda' offered here carries the direct blessings of Thakurji.",
        mustTry: "Makhan Mishri, Peda",
        timings: "Morning & Evening after Aarti",
        image: "/assets/food/pedas.jpg"
    },
    {
        id: 2,
        name: "Brijwasi Mithai Wala",
        location: "Mathura",
        type: "Sweet Shop",
        description: "World-famous since decades. Their Mathura Peda is the gold standard of authentic Braj sweets.",
        mustTry: "Mathura Peda, Milk Cake",
        timings: "07:00 AM - 10:00 PM",
        image: "/assets/food/pedas.jpg"
    },
    {
        id: 3,
        name: "Govinda's Restaurant (ISKCON)",
        location: "Vrindavan",
        type: "Sattvic Eatery",
        description: "A pure vegetarian, no-onion-no-garlic paradise. Offers a mix of Indian, Chinese, and Continental cuisines in a spiritual ambiance.",
        mustTry: "Thali, Herbal Tea, Pizza",
        timings: "08:00 AM - 09:30 PM",
        image: "/assets/food/thali.jpg"
    },
    {
        id: 4,
        name: "Radhika Sweets",
        location: "Mathura",
        type: "Sweet Shop",
        description: "Located near Janmabhoomi, famous for its fresh breakfast options like Bedai-Kachori and Jalebi.",
        mustTry: "Bedai Kachori, Jalebi",
        timings: "06:00 AM - 10:00 PM",
        image: "/assets/food/kachori.jpg"
    },
    {
        id: 5,
        name: "Shankar Mithai Wala",
        location: "Mathura",
        type: "Sweet Shop",
        description: "One of the oldest shops at Holi Gate. Their Lassi and Rabri are legendary and perfect for the summer heat.",
        mustTry: "Lassi in Kulhad, Rabri",
        timings: "07:00 AM - 10:30 PM",
        image: "/assets/food/lassi.jpg"
    },
    {
        id: 6,
        name: "Ammaji's Restaurant",
        location: "Vrindavan",
        type: "Sattvic Eatery",
        description: "A cozy place near ISKCON offering South Indian and North Indian delicacies with a homely touch.",
        mustTry: "Masala Dosa, Filter Coffee",
        timings: "07:30 AM - 10:00 PM",
        image: "/assets/food/dosa.jpg"
    },
    {
        id: 7,
        name: "MVT Restaurant",
        location: "Vrindavan",
        type: "Sattvic Eatery",
        description: "Set in a beautiful garden, MVT offers high-quality international vegetarian cuisine without onion and garlic.",
        mustTry: "Wood-fired Pizza, Pasta, Salad",
        timings: "08:00 AM - 09:30 PM",
        image: "/assets/food/pizza.jpg"
    },
    {
        id: 8,
        name: "Khandelwal Mithai Wala",
        location: "Govardhan",
        type: "Sweet Shop",
        description: "Famous for its preparation of 'Annakoot' prasadam style sweets and snacks for parikrama pilgrims.",
        mustTry: "Kachori, Samosa",
        timings: "06:00 AM - 09:00 PM",
        image: "/assets/food/kachori.jpg"
    },
    {
        id: 9,
        name: "Shri Krishna Janmasthan Prasadam",
        location: "Mathura",
        type: "Temple Prasadam",
        description: "The official prasadam counter inside the Janmabhoomi complex offers pure ghee sweets at subsidized rates.",
        mustTry: "Laddu, Peda",
        timings: "During Darshan Hours",
        image: "/assets/food/pedas.jpg"
    },
    {
        id: 10,
        name: "11 Flowers Rooftop Cafe",
        location: "Vrindavan",
        type: "Sattvic Eatery",
        description: "A modern cafe with a view, serving excellent continental and Italian dishes for the modern pilgrim.",
        mustTry: "Pancakes, Shakes, Sandwiches",
        timings: "09:00 AM - 10:00 PM",
        image: "/assets/food/cafe.jpg"
    }
];
