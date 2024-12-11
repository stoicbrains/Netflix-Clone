import React, { useRef, useEffect, useState } from 'react';
import useRandom from '../hooks/useRandom';
import { AiOutlineInfoCircle } from 'react-icons/ai';
const VideoBanner = () => {
  const { Randommovie, loading, error } = useRandom();
  const [toggle,setToggle] = useState(false)
  // Create a reference for the video element
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Set a timer to pause the video after 10 minutes (600,000 ms)
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }, 30000); // 600000ms = 10 minutes
    
      return () => clearTimeout(timer);
    }
  }, [Randommovie]); // Re-run effect if the movie changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!Randommovie) return <div>No movie available</div>;

  return (
    <div className="text-4xl text-white h-[80vh] w-full relative left-0 peer brightness-75">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        src={Randommovie[0].videoUrl}
        className='h-full w-full object-cover'
        
      > 
      </video>
      <div className='absolute left-[10%] top-[35%] text-white z-50'>
        <h4 className='text-5xl font-bold h-full w-[30%]'>{Randommovie[0].title}</h4>
        <p className='w-full text-[12px] '>{Randommovie[0].description}</p>
        <div className='bg-white rounded-md w-[30%] h-10 text-sm flex justify-center items-center font-semibold'><button className='text-black flex gap-2 justify-center items-center'><AiOutlineInfoCircle/>More info</button></div>
      </div>

      

      </div>
   

  );
};

export default VideoBanner;
