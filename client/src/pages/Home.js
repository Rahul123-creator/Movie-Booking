import React from "react";
import MovieCard from "../components/MovieCard";

const Home = ({ movies }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
        Now Showing
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
