import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import MovieDetails from './pages/MovieDetails';
import BookingPage from './pages/BookingPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyBookings from './pages/MyBookings';
import allMovies from './data/movies';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const uniqueGenres = [...new Set(allMovies.flatMap(m => Array.isArray(m.genre) ? m.genre : [m.genre]))];

  const filteredMovies = allMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === '' || (Array.isArray(movie.genre)
      ? movie.genre.includes(selectedGenre)
      : movie.genre === selectedGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar
          onSearch={setSearchQuery}
          onGenreChange={setSelectedGenre}
          genres={uniqueGenres}
        />
        <Routes>
          <Route path="/" element={<Home movies={filteredMovies} />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;