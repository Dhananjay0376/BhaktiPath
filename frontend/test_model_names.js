
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyA_-2SV4Amm2L0TobBGa8GI_svCEJdKv5M";
const genAI = new GoogleGenerativeAI(API_KEY);

const candidates = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-001",
    "gemini-1.5-flash-latest",
    "gemini-pro",
    "gemini-1.0-pro",
    "gemini-1.5-pro",
    "gemini-1.5-pro-001",
    "gemini-2.0-flash-exp"
];

async function testModel(modelName) {
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hi");
        console.log(`[SUCCESS] ${modelName} works!`);
        return true;
    } catch (error) {
        console.log(`[FAILED] ${modelName}: ${error.message.split(' ').slice(0, 10).join(' ')}...`);
        return false;
    }
}

async function run() {
    console.log("Testing models...");
    for (const m of candidates) {
        await testModel(m);
    }
}

run();
