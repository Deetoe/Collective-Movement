import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PurposeSection from './components/PurposeSection';
import Footer from './components/Footer';
import LeaderBoard from './components/LeaderBoard';
import Media from './components/Media'; // if you have one

export default function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <main className='flex-grow'>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <PurposeSection />
              </>
            } />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/media" element={<Media />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}