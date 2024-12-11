import bcrypt from 'bcrypt';
import prismadb from '@/lib/prismadb';

// Handle POST request for user registration
export async function POST(req: Request) {
  try {
    // Parse incoming JSON body
    const { email, name, password } = await req.json();

    // Check if the user already exists by email
    const existingUser = await prismadb.user.findUnique({
      where: { email },
    });

    // If the email is already taken, return an error
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already taken" }), { status: 402 });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the new user in the database
    const user = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    });

    // Return the created user
    return new Response(JSON.stringify(user), { status: 201 });

  } catch (error) {
    console.log(error);
    // Return a general error if something goes wrong
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

