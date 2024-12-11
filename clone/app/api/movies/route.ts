import { getSession } from "next-auth/react";
import prismadb from '@/lib/prismadb';

export async function GET(req: Request) {
    // Check if method is GET
    if (req.method !== 'GET') {
        return new Response(JSON.stringify({ message: 'Unknown method' }), { status: 400 });
    }

    try {

        // Fetch movies from the database
        const movies = await prismadb.movie.findMany();

        // Return the movies data
        return new Response(JSON.stringify({ message: 'Movies found', movies }), { status: 200 });

    } catch (error) {
        console.error(error);

        // Return error response
        return new Response(JSON.stringify({ message: 'Failed to retrieve movies' }), { status: 500 });
    }
}
