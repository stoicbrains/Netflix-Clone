import type { NextApiHandler, NextApiRequest,NextApiResponse } from "next";

type Data = {
    name : string
}

export default function handler(
    req : NextApiRequest,
    res : NextApiResponse<Data>
){
    res.json({name : ' John Doe2'})
}