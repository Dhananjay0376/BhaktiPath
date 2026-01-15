
const API_KEY = "AIzaSyA_-2SV4Amm2L0TobBGa8GI_svCEJdKv5M";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

async function listModels() {
    console.log("Fetching models...");
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            console.log("Available Models:");
            if (data.models) {
                // Filter for generateContent supported models
                const chatModels = data.models.filter(m =>
                    m.supportedGenerationMethods &&
                    m.supportedGenerationMethods.includes("generateContent")
                );

                chatModels.forEach(m => console.log(m.name));
            } else {
                console.log("No models found.");
            }
        } else {
            console.error("Error:", JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Network Error:", error.message);
    }
}

listModels();
