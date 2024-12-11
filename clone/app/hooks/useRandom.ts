import { useState, useEffect } from "react";
import axios from "axios";

const useRandomMovie = () => {
  const [Randommovie, setRandomMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        // Use axios to fetch data from the API
        const response = await axios.get("/api/random");

        console.log(response.data.randomMovie)
        setRandomMovie(response.data.randomMovie);
      } catch (err:any) {
        // Handle errors (axios will automatically handle HTTP errors)
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomMovie();
  }, []); // Empty dependency array to fetch on mount
  return { Randommovie, loading, error };
};

export default useRandomMovie;
