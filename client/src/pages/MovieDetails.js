import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import movies from "../data/movies";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return <div className="p-10 text-xl text-red-600">Movie not found!</div>;
  }

  const handleBookTickets = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Please log in to book tickets.");
      navigate("/login", { state: { from: `/book/${movie.id}` } });
    } else {
      navigate(`/book/${movie.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row">
        <img src={movie.poster} alt={movie.title} className="w-full md:w-1/2 object-cover" />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{movie.title}</h2>
          <div className="flex flex-wrap gap-2 mt-2">
  {Array.isArray(movie.genre) ? (
    movie.genre.map((g, idx) => (
      <span
        key={idx}
        className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
      >
        {g}
      </span>
    ))
  ) : (
    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
      {movie.genre}
    </span>
  )}
</div>
          <p className="text-gray-700 mb-4">{movie.description}</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={handleBookTickets}
          >
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
