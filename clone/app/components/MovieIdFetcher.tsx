// app/watch/[movieId]/page.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';  // Import useParams from next/navigation
import useMovie from '@/app/hooks/useMovie';  // Your movie hook to fetch movie details
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

const MovieIdFetcher: React.FC = () => {
    // Access dynamic route parameter using useParams
    const params = useParams();  
    const movieId = params.id;  // This will give you the movieId (e.g., '674851771c2dfd4babbefe3f')
    console.log(movieId)
    const router = useRouter();
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        if (movieId) {
            //@ts-ignore
            setId(movieId);  
        }
    }, [movieId]);

    // Fetch the movie data using the custom hook
    const { movie, loading, error } = useMovie(id);

    if (!id) {
        return <div>Waiting for movieId...</div>;  // Show a message while waiting for id
    }

    if (loading) {
        return <div>Loading movie...</div>;  // Show loading state while fetching movie data
    }

    if (error) {
        return <div>Error fetching movie: {error}</div>;  // Handle error state
    }

    if (!movie) {
        return <div>Movie not found</div>;  // Show if no movie is found
    }

    return (
        <div className='relative left-0 top-0 h-screen w-screen flex justify-center items-center bg-black'>
           <h1 className='font-bold text-white text-xl absolute left-5 top-3 flex gap-3 justify-center items-center'><span className='cursor-pointer' onClick={()=>{
            router.push('/')
           }}><AiOutlineArrowLeft/> </span>Watching: {movie.title}</h1>
           <video className='h-[90%] w-[90%] absolute' autoPlay controls src={movie.videoUrl}></video>
        </div>
    );
};

export default MovieIdFetcher;
