import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import Booking from './pages/Booking'; 

function App() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    age: '',
    birthdate: '',
    gender: 'Male',
    mobile: '',
    address: '',
    emergency_contact: '',
  });

  const [showRegistration, setShowRegistration] = useState(false);
  const [userType, setUserType] = useState(''); 

  const audioRef = useRef(null);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/register-athlete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Registration Successful!');
    } else {
      alert('Error registering athlete: ' + result.message);
    }
  };

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    setShowRegistration(true); // Show the registration form after button click
  };

  // Automatically play background music after the user interaction
  const handleAudioPlay = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch((err) => {
        console.error('Error playing audio:', err);
      });
    }
  };

  // Trigger the audio play when the user clicks anywhere on the page or starts scrolling
  useEffect(() => {
    window.addEventListener('click', handleAudioPlay); // Will trigger the audio when the user clicks anywhere on the page
    window.addEventListener('scroll', handleAudioPlay); // Will trigger when the user scrolls

    return () => {
      window.removeEventListener('click', handleAudioPlay);
      window.removeEventListener('scroll', handleAudioPlay);
    };
  }, []);

  return (
    <Router>
      <div>
        {/* Background Music */}
        <audio ref={audioRef} id="background-music" loop>
          <source src="/music/Olympic_Music.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>

        {/* Navbar with Logo */}
        <header className="bg-gray-800 text-white z-10 relative">
          <nav className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              {/* Logo Section */}
              <img src="/images/logo.png" alt="Logo" className="h-10 w-10 object-contain" /> {/* Added Logo */}
              <h1 className="text-2xl font-semibold ml-2">YuvaKreedaVikas</h1> {/* Added Margin Left */}
            </div>
            <div className="flex space-x-6">
              <Link to="/book-facility" className="text-white hover:text-blue-400">Booking</Link>
              <a href="#matches" className="text-white hover:text-blue-400">Matches</a>
              <a href="#contact" className="text-white hover:text-blue-400">Contact Us</a>
            </div>
          </nav>
        </header>

        {/* Hero Section - Background Image */}
        <header
          className="relative h-screen bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/olympic-medals-scaled.jpeg)', 
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Unleashing the Power of India's Young Athletes</h1>
              <p className="text-lg md:text-2xl mb-8">A Platform Where Passion Meets Performance. Empowering the Future of Sports, One Athlete at a Time.</p>
            </div>
          </div>
        </header>

        {/* Call To Action Section */}
        <section className="py-16 bg-blue-600 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
          <p className="mb-6">Whether you’re an athlete, coach, or sports official, there's a place for you in YuvaKeedaVikas.</p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button onClick={() => handleUserTypeSelection('athlete')} className="bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow">I'm an Athlete</button>
            <button onClick={() => handleUserTypeSelection('coach')} className="bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow">I'm a Coach</button>
            <button onClick={() => handleUserTypeSelection('district')} className="bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow">I'm a District Official</button>
          </div>
        </section>

        {/* Focus Sports Section (Displaying Names Only) */}
        <section className="py-12 bg-white text-center">
  <h2 className="text-3xl font-bold mb-8">Focus Sports</h2>
  <div className="grid grid-cols-2 md:grid-cols-5 gap-6 px-6">
    <div className="sport-image-container">
      <img src="/images/Cricket.png" alt="Cricket" className="sport-image" />
      <h3 className="sport-name">Cricket</h3> {/* Added sport-name class */}
    </div>
    <div className="sport-image-container">
      <img src="/images/Badminton.png" alt="Badminton" className="sport-image" />
      <h3 className="sport-name">Badminton</h3> {/* Added sport-name class */}
    </div>
    <div className="sport-image-container">
      <img src="/images/Shooting_1.png" alt="Shooting" className="sport-image" />
      <h3 className="sport-name">Shooting</h3> {/* Added sport-name class */}
    </div>
    <div className="sport-image-container">
      <img src="/images/Wrestling_1.png" alt="Wrestling" className="sport-image" />
      <h3 className="sport-name">Wrestling</h3> {/* Added sport-name class */}
    </div>
    <div className="sport-image-container">
      <img src="/images/Hockey.png" alt="Hockey" className="sport-image" />
      <h3 className="sport-name">Hockey</h3> {/* Added sport-name class */}
    </div>
  </div>
</section>


        {/* Stats Section */}
        <section className="py-12 bg-gray-100 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Impact So Far</h2>
          <div className="flex flex-wrap justify-center gap-12">
            <div>
              <p className="text-4xl font-bold text-blue-600">50,000+</p>
              <p>Athletes Enrolled</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">700+</p>
              <p>Districts Active</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">800+</p>
              <p>Matches Conducted</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">1,200+</p>
              <p>Talents Identified</p>
            </div>
          </div>
        </section>

        {/* Routes for Booking and Registration */}
        <Routes>
          <Route path="/book-facility" element={<Booking />} />
        </Routes>

        {/* Athlete Registration Form Section */}
        {showRegistration && userType === 'athlete' && (
          <section id="register" className="py-16 bg-gray-100">
            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-center mb-6">Athlete Registration</h2>
              <form onSubmit={handleSubmit}>
                {/* Registration Form Fields */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                {/* Age */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                {/* Birthdate */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700">Birthdate</label>
                  <input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                {/* Gender */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Mobile */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                {/* Address */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                {/* Emergency Contact */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700">Emergency Contact</label>
                  <input
                    type="tel"
                    name="emergency_contact"
                    value={formData.emergency_contact}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                {/* Submit Button */}
                <div className="mb-4 text-center">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6 text-center">
          <p>&copy; 2025 YuvaKeedaVikas. All Rights Reserved. | Ministry of Youth Affairs and Sports, Govt. of India</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
