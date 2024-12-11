import React from 'react';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import MovieCard from './MovieCard';
interface Movie {
  description: string,
  duration:string,
  genre:string
  id: string;
  thumbnailUrl: string;
  title: string;
  videoUrl:string
}

interface MovieListProps {
  data: Movie[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
    console.log(data)
  if (isEmpty(data)) {
    return <p>No movies available.</p>; // Optional: You can return a message when there are no movies
  }

  return (
    
    <div className="px-4 mt-4 space-y-8 relative cursor-pointer">
      <div className=''>
        <p className="text-white text-md font-semibold mb-4">{title}</p>
        <div className="grid grid-cols-3 gap-4">
          {data.map((movie) => (
            //@ts-ignore
            <div key={movie.id} className="rounded-md shadow-md relative">
                <MovieCard data={movie}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
