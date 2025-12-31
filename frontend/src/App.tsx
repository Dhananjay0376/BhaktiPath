import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import Pushpanjali from './components/Pushpanjali';
import Home from './pages/Home';
import Temples from './pages/Temples';
import TempleDetails from './pages/TempleDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PlanTrip from './pages/PlanTrip';
import Seed from './pages/Seed';
import { AuthProvider } from './context/AuthContext';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Home />
          </PageTransition>
        } />
        <Route path="/temples" element={
          <PageTransition>
            <Temples />
          </PageTransition>
        } />
        <Route path="/temples/:id" element={
          <PageTransition>
            <TempleDetails />
          </PageTransition>
        } />
        <Route path="/temples/:id" element={
          <PageTransition>
            <TempleDetails />
          </PageTransition>
        } />
        <Route path="/login" element={
          <PageTransition>
            <Login />
          </PageTransition>
        } />
        <Route path="/signup" element={
          <PageTransition>
            <Signup />
          </PageTransition>
        } />
        <Route path="/plan-trip" element={
          <PageTransition>
            <PlanTrip />
          </PageTransition>
        } />
        <Route path="/seed" element={<Seed />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <CustomCursor />
        <ParticleBackground />
        <Pushpanjali />
        <div className="min-h-screen bg-marble relative overflow-hidden cursor-none">
          {/* Background Ambient Effects */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-saffron/10 rounded-full blur-[100px] animate-float"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1s' }}></div>
          </div>

          <Navbar />

          <main className="relative z-10 pt-20">
            <AnimatedRoutes />
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
