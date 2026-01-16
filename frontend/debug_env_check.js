import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');

console.log('Checking .env at:', envPath);

if (!fs.existsSync(envPath)) {
    console.error('ERROR: .env file NOT found! Creating it...');
    const newContent = "VITE_GEMINI_API_KEY=AIzaSyAdAukOQ9-JNKDAcFBfei6KBSU7BnW14lk\n";
    fs.writeFileSync(envPath, newContent, 'utf8');
    console.log('Created .env file with UTF-8 encoding.');
} else {
    console.log('SUCCESS: .env file found.');

    const buffer = fs.readFileSync(envPath);
    console.log('File size:', buffer.length, 'bytes');

    // Print first 20 bytes in hex to check BOM/Encoding
    let hex = '';
    for (let i = 0; i < Math.min(buffer.length, 20); i++) {
        hex += buffer[i].toString(16).padStart(2, '0') + ' ';
    }
    console.log('First 20 bytes (Hex):', hex.trim());

    // Check for UTF-8 BOM (EF BB BF) or UTF-16 (FF FE)
    if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
        console.log('Detected encoding: UTF-8 with BOM');
    } else if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
        console.log('Detected encoding: UTF-16 LE (BAD!)');

        // Fix it
        console.log('Attempting to fix encoding to UTF-8...');
        const content = fs.readFileSync(envPath, 'utf16le');
        fs.writeFileSync(envPath, content, 'utf8');
        console.log('Fixed encoding.');
    } else {
        console.log('Likely encoding: UTF-8 (No BOM) or ASCII. (GOOD)');
    }

    const content = fs.readFileSync(envPath, 'utf8');
    console.log('--- Content Start ---');
    console.log(content);
    console.log('--- Content End ---');

    if (content.includes('VITE_GEMINI_API_KEY')) {
        console.log('Key variable FOUND in text.');
    } else {
        console.error('Key variable NOT FOUND in text.');
    }
}
