import useSWR from "swr";
import { getSession } from "next-auth/react";
import fetcher from "@/lib/fetcher";
const useBillBoard = async() =>{
    const {data,error,isLoading} = useSWR('/api/random',fetcher,{
        revalidateIfStale:false,
        revalidateOnFocus:false,
        revalidateOnReconnect:false,
    });

    return{
        data,
        error,        isLoading
    }
}

export default useBillBoard;