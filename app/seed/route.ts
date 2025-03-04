'use server'
import client from "../../services/mongodb";
import bcrypt from 'bcryptjs';

const db = client.db(process.env.MONGODB_DATABASE);

const users = [
    {
        id: 3,
        name: 'Shawn',
        email: 'sds.smith24@gmail.com',
        password: '333333'
    },
    {
        id: 2,
        name: 'Brenda',
        email: 'brendawsmith711@gmail.com',
        password: '222222'
    },
    {
        id: 1,
        name: 'Paul',
        email: 'paulsmithiii@verizon.net',
        password: '111111'
    },
]

async function seedUsers() {
  
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return await db.collection("users").insertOne({
            ...user,
            password: hashedPassword
        });
      }
    ))
  
    return insertedUsers;
  }

  export async function GET() {
    try {
      await seedUsers();
  
      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
  }