// src/components/BookingPage.js
import React, { useState } from 'react';

function BookingPage() {
  const [formData, setFormData] = useState({
    sport: 'Cricket',
    location: '',
    facility: '',
    booking_date: '',
    start_time: '',
    end_time: '',
    reason: 'Training',
  });

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

    const response = await fetch('http://localhost:5000/book-facility', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Booking Successful!');
      // Reset the form after successful booking
      setFormData({
        sport: 'Cricket',
        location: '',
        facility: '',
        booking_date: '',
        start_time: '',
        end_time: '',
        reason: 'Training',
      });
    } else {
      alert('Error booking: ' + result.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-4">Booking a Facility</h3>
      <form onSubmit={handleSubmit}>
        {/* Sport Selection */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Sport</label>
          <select
            name="sport"
            value={formData.sport}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="Cricket">Cricket</option>
            <option value="Badminton">Badminton</option>
            <option value="Shooting">Shooting</option>
            <option value="Wrestling">Wrestling</option>
            <option value="Hockey">Hockey</option>
          </select>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Facility */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Facility</label>
          <input
            type="text"
            name="facility"
            value={formData.facility}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Booking Date */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Booking Date</label>
          <input
            type="date"
            name="booking_date"
            value={formData.booking_date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Start Time */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Start Time</label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* End Time */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">End Time</label>
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Reason for Booking */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Reason</label>
          <select
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="Training">Training</option>
            <option value="Trial">Trial</option>
            <option value="Match">Match</option>
            <option value="Camp">Camp</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="mb-4 text-center">
          <button type="submit" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md">
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingPage;
