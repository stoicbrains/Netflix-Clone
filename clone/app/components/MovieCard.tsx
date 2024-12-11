
import React from 'react'
import PlayButton from './PlayButton'
import { useRouter } from 'next/router'

interface MovieCardProps{
    data:Record<any,string>
}

const MovieCard:React.FC<MovieCardProps> = ({data}) =>{
  return (
    <div className='group bg-zinc-900 col-span-3 relative h-full w-full'>
        <img className='cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 delay-300 w-full h-[12vw]' src={data.thumbnailUrl} alt="Thumbnail" />
        <div className='opacity-0 absolute top-0 transition duration-200 z-10 delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw]
        group-hover:translate-x-[2vw] group-hover:opacity-100'>
            <img src={data.thumbnailUrl} alt="Thumbnail" className='cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]' />
            <div className='z-10 bg-zinc-900 p-2 absolute w-full transition shadow-md rounded-b-md'>
                <div className='flex flex-row items-center gap-3'>
                    <div className='relative cursor-pointer flex justify-center items-center transition' onClick={()=>{
                        window.location.assign(`/watch/${data?.id}`)
                    }}>
                        <button><PlayButton movieId={data?.id}/></button>        
                    </div>
                </div>
                <p className='text-green-300 font-semibold mt-4'>New <span className='text-white'>2023</span></p>
                <div className='flex flex-row mt-4 gap-2 items-center'>
                    <p className='text-white text-[10px]'>{data.duration}</p>
                </div>
                <div className='flex flex-row mt-4 gap-2 items-center'>
                    <p className='text-white text-[10px]'>{data.genre}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MovieCard
