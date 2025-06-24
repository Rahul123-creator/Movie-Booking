import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="w-full sm:w-64 bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl">
      <img
        src={movie.poster}
        alt={movie.title}
        className="h-80 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 truncate">{movie.title}</h3>

        <div className="flex flex-wrap gap-2 mt-2">
          {Array.isArray(movie.genre) ? (
            movie.genre.map((g, idx) => (
              <span
                key={idx}
                className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full"
              >
                {g}
              </span>
            ))
          ) : (
            <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
              {movie.genre}
            </span>
          )}
        </div>

        <Link to={`/movie/${movie.id}`}>
          <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition text-sm font-semibold">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
