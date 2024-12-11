import prismadb from '@/lib/prismadb'
import { NextApiRequest, NextApiResponse } from 'next'

export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
    if (req.method !== 'GET') {
        return new Response(JSON.stringify({message:"Invalid Request"}),{status:400});
    }

    try {
        const { id } = params;

        // Ensure ID is a valid string
        if (typeof id !== 'string') {
            throw new Error('Invalid Id');
        }

        // Fetch movie from the database
        const movie = await prismadb.movie.findUnique({
            where: { id }
        });

        if (!movie) {
            throw new Error('Movie not found');
        }

        // Return the movie data
        return new Response(JSON.stringify({movie}),{status:200});
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({message:'Error Fetching Movie'}),{status:404});
    }
}
