import React from "react";
import { BsFillPlayFill } from "react-icons/bs";

import { useRouter } from "next/router";

interface PlayButtonProps {
    movieId:string
}

const PlayButton:React.FC<PlayButtonProps> = ({movieId})=>{
    return(
        <button onClick={()=>{
            window.location.assign(`/watch/${movieId}`)
        }} className="bg-white
        rounded-md
        py-1
        px-2
        w-auto
        text-xs
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        ">
            <BsFillPlayFill size={25}className="mr-1"/>
                play
        </button>
    )
}

export default PlayButton