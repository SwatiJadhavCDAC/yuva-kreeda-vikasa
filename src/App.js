import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import Booking from './pages/Booking';
import ContactUs from './pages/ContactUs';
import Registration from './pages/Registration'; 

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // State for dynamic counting
  const [athletesEnrolled, setAthletesEnrolled] = useState(0);
  const [districtsActive, setDistrictsActive] = useState(0);
  const [matchesConducted, setMatchesConducted] = useState(0);
  const [talentsIdentified, setTalentsIdentified] = useState(0);

  // Function to animate the counting from 0 to the target value
  const countUp = (start, end, setState) => {
    let current = start;
    const increment = Math.ceil((end - start) / 900); // Slower counting by dividing the range by 200

    const interval = setInterval(() => {
      if (current < end) {
        current += increment;
        setState(current);
      } else {
        clearInterval(interval); // Stop the interval once the target is reached
        setState(end); // Ensure the final value is set
      }
    }, 10); // Slow down by increasing the interval time (30ms)
  };

  // useEffect hook to trigger the dynamic counting when the component mounts
  useEffect(() => {
    countUp(0, 50000, setAthletesEnrolled); // Athletes Enrolled counter
    countUp(0, 700, setDistrictsActive); // Districts Active counter
    countUp(0, 800, setMatchesConducted); // Matches Conducted counter
    countUp(0, 1200, setTalentsIdentified); // Talents Identified counter
  }, []);

  // Play audio
  const handleAudioPlay = () => {
    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio.volume = 0.01;
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('Error playing audio:', err);
        });
    }
  };

  // Pause audio
  const handleAudioPause = () => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Toggle play/pause
  const toggleAudio = () => {
    if (isPlaying) {
      handleAudioPause();
    } else {
      handleAudioPlay();
    }
  };

  // Automatically play audio when the component mounts
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio.volume = 0.01;
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('Error auto-playing audio:', err);
        });
    }
  }, []);

  return (
    <Router>
      <div>
        {/* Background Music */}
        <audio ref={audioRef} id="background-music" loop>
          <source src="/music/Olympic_Music.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>

        {/* Toggle Button for Play/Pause */}
        <button
          onClick={toggleAudio}
          className="fixed bottom-10 right-10 p-3 bg-blue-600 text-white rounded-full shadow-lg"
        >
          {isPlaying ? 'Pause Music' : 'Play Music'}
        </button>

        {/* Navbar with Logo */}
        <header className="bg-gray-800 text-white z-10 relative">
          <nav className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <img src="/images/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
              <h1 className="text-2xl font-semibold ml-2">YuvaKreedaVikas</h1>
            </div>
            <div className="flex space-x-6">
              <Link to="/book-facility" className="text-white hover:text-blue-400">Booking</Link>
              <Link to="/contact-us" className="text-white hover:text-blue-400">Contact Us</Link>
              <Link to="/registration" className="text-white hover:text-blue-400">Registration</Link>
            </div>
          </nav>
        </header>

        {/* Announcements Ticker Section */}
        <section className="bg-blue-600 text-white py-2 mt-4">
          <div className="overflow-hidden">
            <div className="animate-marquee whitespace-nowrap">
              <p className="inline-block text-lg mr-8">
                🚨 Upcoming Event: "Athletic Trials" on 15th March 2025 at National Stadium 🏟️ | 
                🚨 Player Highlight: "Anjali Gupta" to participate in Badminton 🏸 | 
                🚨 Event Schedule: Starts at 10 AM, March 15th, 2025 🕙 | 
                🚨 New! "Wrestling Championship" on April 5th, 2025 at Indira Stadium 🏅
              </p>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <header className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/images/olympic-medals-scaled.jpeg)' }}>
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Unleashing the Power of India's Young Athletes</h1>
              <p className="text-lg md:text-2xl mb-8">A Platform Where Passion Meets Performance. Empowering the Future of Sports, One Athlete at a Time.</p>
            </div>
          </div>
        </header>

        {/* Join the Movement Section */}
        <section className="py-16 bg-blue-600 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
          <p className="mb-6">Whether you’re an athlete, coach, or sports official, there's a place for you in YuvaKeedaVikas.</p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link to="/registration">
              <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow">I'm an Athlete</button>
            </Link>
            <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow">I'm a Coach</button>
            <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow">I'm a District Official</button>
          </div>
        </section>

        {/* Focus Sports Section */}
        <section className="py-12 bg-white text-center">
          <h2 className="text-3xl font-bold mb-8">Focus Sports</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 px-6">
            <div className="sport-image-container">
              <img src="/images/Cricket.png" alt="Cricket" className="sport-image" />
              <h3 className="sport-name">Cricket</h3>
            </div>
            <div className="sport-image-container">
              <img src="/images/Badminton.png" alt="Badminton" className="sport-image" />
              <h3 className="sport-name">Badminton</h3>
            </div>
            <div className="sport-image-container">
              <img src="/images/Shooting_1.png" alt="Shooting" className="sport-image" />
              <h3 className="sport-name">Shooting</h3>
            </div>
            <div className="sport-image-container">
              <img src="/images/Wrestling_1.png" alt="Wrestling" className="sport-image" />
              <h3 className="sport-name">Wrestling</h3>
            </div>
            <div className="sport-image-container">
              <img src="/images/Hockey.png" alt="Hockey" className="sport-image" />
              <h3 className="sport-name">Hockey</h3>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gray-100 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Impact So Far</h2>
          <div className="flex flex-wrap justify-center gap-12">
            <div>
              <p className="text-4xl font-bold text-blue-600">{athletesEnrolled}+</p>
              <p>Athletes Enrolled</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">{districtsActive}+</p>
              <p>Districts Active</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">{matchesConducted}+</p>
              <p>Matches Conducted</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">{talentsIdentified}+</p>
              <p>Talents Identified</p>
            </div>
          </div>
        </section>

        {/* Routes for Booking, Contact Us, and Registration */}
        <Routes>
          <Route path="/book-facility" element={<Booking />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6 text-center">
          <p>&copy; 2025 YuvaKeedaVikas. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;