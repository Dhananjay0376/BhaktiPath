/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                saffron: {
                    light: '#FFB74D',
                    DEFAULT: '#FF9933', // Deep Saffron
                    dark: '#E65100',
                },
                gold: {
                    light: '#FFD700',
                    DEFAULT: '#D4AF37', // Royal Gold
                    dark: '#B8860B',
                },
                marble: '#F5F5F5',
                midnight: '#1A237E', // Deep Blue for contrast
            },
            fontFamily: {
                serif: ['"Cinzel"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
                devanagari: ['"Yatra One"', 'serif'],
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
