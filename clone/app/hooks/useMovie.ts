import { useState, useEffect } from 'react';
import axios from 'axios';

interface Movie {
  description: string,
  duration:string,
  genre:string
  id: string;
  thumbnailUrl: string;
  title: string;
  videoUrl:string
}

const useMovie = (id: string | null) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;  // Ensure id is available before making the request

    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/movie/${id}`); // Correct endpoint

        // Check if the API response contains a movie
        if (response.data && response.data.movie) {
          setMovie(response.data.movie); // Assuming response.data contains the movie object
        } else {
          setMovie(null);
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to fetch movie');
        console.error('Error fetching movie:', err);  // Log more details about the error
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  return { movie, loading, error };
};

export default useMovie;
