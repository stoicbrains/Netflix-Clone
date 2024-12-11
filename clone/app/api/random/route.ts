import prismadb from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Get the count of movies to determine the random index
    const movieCount = await prismadb.movie.count();

    if (movieCount === 0) {
      // No movies available in the database
      return new Response (JSON.stringify({message:'no movies found'}),{status:400});
    }

    const randomIndex = Math.floor(Math.random() * movieCount);

    // Fetch the random movie based on the random index
    const randomMovie = await prismadb.movie.findMany({
      skip: randomIndex,
      take: 1,
    });

 
    // Check if a movie was found and return it
    if (randomMovie && randomMovie.length > 0) {
      return new Response(JSON.stringify({randomMovie}));
    } else {
      return new Response (JSON.stringify({message:'no movies found'}),{status:400});
    }
  } catch (error) {
    console.error("Error fetching movie:", error);  // Log the error for debugging
    return new Response (JSON.stringify({message:'error fetching movies'}),{status:401});
  }
}
