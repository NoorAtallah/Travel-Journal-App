import React, { useState } from 'react';
import { storage, db, ref, set } from '../components/firebase'; // Import your Firebase configuration
import { uploadBytes, getDownloadURL, ref as storageRef } from 'firebase/storage';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const TravelEntryForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      let photoURL = '';

      if (photo) {
        // Upload photo to Firebase Storage
        const photoRef = storageRef(storage, `travel-photos/${photo.name}`);
        await uploadBytes(photoRef, photo);
        photoURL = await getDownloadURL(photoRef);
      }

      // Save travel entry to Realtime Database
      const newEntryRef = ref(db, 'travelEntries/' + Date.now());
      await set(newEntryRef, {
        title,
        description,
        location,
        date,
        photoURL,
      });

      setSuccess('Travel entry created successfully.');
      // Clear the form
      setTitle('');
      setDescription('');
      setLocation('');
      setDate('');
      setPhoto(null);

      // Redirect to the travel articles list page
      navigate('/TravelArticlesList');
    } catch (error) {
      setError('Error creating travel entry: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-10">
      <div className="w-full max-w-lg p-8 space-y-3 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Create Travel Entry</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Photo</label>
            <input
              type="file"
              onChange={handlePhotoChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-600"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TravelEntryForm;
