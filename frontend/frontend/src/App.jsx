import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-marble relative overflow-hidden">
                {/* Background Ambient Effects */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-saffron/10 rounded-full blur-[100px] animate-float"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1s' }}></div>
                </div>

                <Navbar />

                <main className="relative z-10 pt-20">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* Add other routes here */}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
