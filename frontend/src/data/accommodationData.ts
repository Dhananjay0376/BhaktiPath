export interface Accommodation {
    id: number;
    name: string;
    location: "Vrindavan" | "Mathura" | "Govardhan";
    type: "Ashram" | "Dharamshala" | "Guesthouse";
    description: string;
    amenities: string[];
    priceRange: "Budget" | "Mid-range" | "Donation-based";
    contact: string;
    image: string; // Placeholder or gradient
}

export const accommodationData: Accommodation[] = [
    {
        id: 1,
        name: "Fogla Ashram",
        location: "Vrindavan",
        type: "Ashram",
        description: "A highly regarded ashram known for its cleanliness, spiritual atmosphere, and proximity to Banke Bihari Temple. Offers AC rooms and satsang hall.",
        amenities: ["AC Rooms", "Satsang Hall", "Pure Veg Meals", "Garden"],
        priceRange: "Mid-range",
        contact: "+91 8890951876", // Updated from verification
        image: "/assets/hotels/fogla.jpg"
    },
    {
        id: 2,
        name: "Brijwasi Royal",
        location: "Mathura",
        type: "Guesthouse",
        description: "A comfortable stay near the railway station offering modern amenities and famous Brijwasi hospitality.",
        amenities: ["AC", "Wi-Fi", "Restaurant", "Parking"],
        priceRange: "Mid-range",
        contact: "+91-565-2401225", // Verified landline
        image: "/assets/hotels/brijwasi.jpg"
    },
    {
        id: 3,
        name: "MVT Guest House",
        location: "Vrindavan",
        type: "Guesthouse",
        description: "Run by ISKCON, this place offers a serene environment with lush gardens and a popular restaurant. Perfect for international devotees.",
        amenities: ["AC", "Garden", "Restaurant", "24/7 Security"],
        priceRange: "Mid-range",
        contact: "+91-9997738666", // Updated mobile contact
        image: "/assets/hotels/mvt.jpg"
    },
    {
        id: 4,
        name: "Maheshwari Bhawan",
        location: "Govardhan",
        type: "Dharamshala",
        description: "A safe and reliable dharamshala for pilgrims doing Govardhan Parikrama. Basic but clean facilities.",
        amenities: ["Cooler/AC", "Hot Water", "Parking"],
        priceRange: "Budget",
        contact: "N/A",
        image: "/assets/hotels/maheshwari.jpg"
    },
    {
        id: 5,
        name: "Birla Dharamshala",
        location: "Mathura",
        type: "Dharamshala",
        description: "Located near Janmabhoomi, this is a trusted name for pilgrims seeking affordable and decent accommodation.",
        amenities: ["Basic Rooms", "Canteen", "Temple Inside"],
        priceRange: "Budget",
        contact: "+91-565-2409999",
        image: "/assets/hotels/birla.jpg"
    },
    {
        id: 6,
        name: "Anand Dham",
        location: "Vrindavan",
        type: "Ashram",
        description: "A beautiful ashram with a focus on Gaudiya Vaishnavism. Provides a peaceful retreat for spiritual seekers.",
        amenities: ["Satsang", "Library", "Book Shop"],
        priceRange: "Donation-based",
        contact: "+91-565-2443333",
        image: "/assets/hotels/anand.jpg"
    },
    {
        id: 7,
        name: "Govardhan Ecovillage (ISKCON)",
        location: "Govardhan",
        type: "Ashram",
        description: "An eco-friendly retreat offering mud cottages and a holistic spiritual experience close to nature.",
        amenities: ["Eco Cottages", "Organic Farm", "Yoga", "Ayurveda"],
        priceRange: "Mid-range",
        contact: "www.ecovillage.org.in",
        image: "/assets/hotels/ecovillage.jpg"
    },
    {
        id: 8,
        name: "Shri Krishna Pranami Param Dham",
        location: "Mathura",
        type: "Dharamshala",
        description: "A large facility near Dwarkadhish temple suitable for families and large groups.",
        amenities: ["Large Rooms", "Lift", "Dining Hall"],
        priceRange: "Budget",
        contact: "+91-9876543210",
        image: "/assets/hotels/pranami.jpg"
    },
    {
        id: 9,
        name: "Nidhivan Sarovar Portico",
        location: "Vrindavan",
        type: "Guesthouse",
        description: "For those seeking luxury and comfort. A star-rated hotel with top-class facilities.",
        amenities: ["Luxury Rooms", "Spa", "Multi-cuisine Restaurant"],
        priceRange: "Mid-range",
        contact: "+91-565-3037777",
        image: "/assets/hotels/sarovar.jpg"
    },
    {
        id: 10,
        name: "Radhe Shyam Ashram",
        location: "Mathura",
        type: "Ashram",
        description: "A traditional ashram offering a simple lifestyle and daily kirtans.",
        amenities: ["Simple Rooms", "Goshala", "Daily Kirtan"],
        priceRange: "Donation-based",
        contact: "Walk-in Only",
        image: "/assets/hotels/radheshyam.jpg"
    }
];
