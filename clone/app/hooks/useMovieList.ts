import { useState, useEffect } from 'react';
import axios from 'axios';

const useMovieList = () => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('/api/movies');
        console.log('API Response:', response.data);  // Log the full API response
        if (response.data && response.data.movies) {
          setMovies(response.data.movies);  // Update state with movies if present
        } else {
          setMovies([]);  // Set to empty array if no movies are present in the response
        }
      } catch (err) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  console.log("here is the movies array",movies)

  return { movies, loading, error };
};

export default useMovieList;
