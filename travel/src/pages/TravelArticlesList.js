import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../components/firebase'; 
import { Link } from 'react-router-dom';

const TravelArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const articlesRef = ref(db, 'travelEntries/');
    onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      const articlesArray = data ? Object.entries(data).map(([id, details]) => ({ id, ...details })) : [];
      setArticles(articlesArray);
      setFilteredArticles(articlesArray);
    });
  }, []);

  useEffect(() => {
    const result = articles.filter(article => {
      return (
        article.title.toLowerCase().includes(search.toLowerCase()) &&
        (filter === '' || article.location.toLowerCase() === filter.toLowerCase())
      );
    });
    setFilteredArticles(result);
  }, [search, filter, articles]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Travel Articles</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-md w-full"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mt-2 px-4 py-2 border rounded-md w-full"
        >
          <option value="">All Locations</option>
          
          {[...new Set(articles.map(article => article.location))].map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map(article => (
          <div key={article.id} className="border rounded-md p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p>{article.description.substring(0, 100)}...</p>
            <Link to={`/article/${article.id}`} className="text-blue-500 hover:underline">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelArticlesList;
