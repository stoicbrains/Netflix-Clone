"use client"
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation"; // Use redirect for session management
import Navbar from "./components/Navbar";
import VideoBanner from './components/VideoBanner';
import MovieList from "./components/MovieList";
import useMovieList from "./hooks/useMovieList";

export default function Home() {
  const { data: session, status } = useSession(); // Always call hooks at the top
  const { movies = [], loading, error } = useMovieList(); // Call useMovieList hook unconditionally
  console.log(movies);
  // If session is not authenticated, redirect to login page immediately
  if (status === 'unauthenticated') {
    redirect('/login'); // Ensure that this is the first thing you do
    return null; // Prevent rendering after redirect
  }

  // If the session is loading, return a loading state
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // If movie list is loading, return loading state
  if (loading) {
    return <div>Loading movie list...</div>;
  }

  // If there is an error with the movie list, return an error message
  if (error) {
    return <div>Error loading movies: {error}</div>;
  }

  // If everything is fine, render the content
  return (
    <main>
      <div className="">
        <Navbar />
        <VideoBanner />
        <div className="pb-40">
          <MovieList title="Trending Now" data={movies} />
        </div>
      </div>
    </main>
  );
}
