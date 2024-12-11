"use client"
import React from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import profile from '../images/profile.jpg'

export default function Profiles(){

    const {data:session,status} = useSession();
    
    if(status=='unauthenticated'){
        redirect('/login')
    }
    if(status=='authenticated'){
    return(
    <div className="h-screen w-screen flex justify-center items-center text-white">
        <div className="flex flex-col h-full w-full justify-center items-center">
        <h1 className="text-4xl text-white text-center font-semibold">Who is Watching?</h1>
        <div className="w-44 max-w-44 bg-white h-44 mt-3 hover:border-2 hover:border-white">
            <Image onClick={()=>{
                redirect('/')
            }} className="object-cover" src={profile} alt="" />
        </div>
        <div className="mt-2 text-2xl font-semibold">{session.user?.name}</div>
        </div>
        
    </div>)
    }
}