// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignupForm from './pages/signup';
import LoginForm from './pages/login';
import Profile from './pages/profile';
import { Nav } from './components/header';
import Home from './pages/home';
import './App.css'
import TravelEntryForm from './pages/blogs'
import TravelArticleDetail from './pages/TravelArticleDetail';
import TravelArticlesList from './pages/TravelArticlesList';
import EditTravelArticle from './pages/EditTravelArticle';
function App() {
  return (
    <div>
      <Nav />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blogs" element={<TravelEntryForm />} />
        <Route path="/TravelArticlesList" element={<TravelArticlesList />} />
        <Route path="/article/:id" element={<TravelArticleDetail />} />
        <Route path="/edit-article/:id" element={<EditTravelArticle />} />
        {/* Add other routes as necessary */}
      </Routes>
    </div>
  );
}

export default App;
