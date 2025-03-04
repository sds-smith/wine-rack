'use server'
import client from "../../services/mongodb";
// import bcrypt from 'bcryptjs';

const db = client.db(process.env.MONGODB_DATABASE);

// async function seedUsers() {
  
//     const insertedUsers = await Promise.all(
//       users.map(async (user) => {
//         const hashedPassword = await bcrypt.hash(user.password, 10);
//         return await db.collection("users").insertOne({
//             ...user,
//             password: hashedPassword
//         });
//       }
//     ))
  
//     return insertedUsers;
//   }

const categories = [
  {
    code    : '01-W',
    title   : 'Sauvignon Blanc',
    group   : 'White'
  },
  {
    code    : '02-W',
    title   : 'Chardonnay Burgundy',
    group   : 'White'
  },
  {
    code    : '03-W',
    title   : 'Chardonnay Other',
    group   : 'White'
  },
  {
    code    : '04-W',
    title   : 'All Other White',
    group   : 'White'
  },
  {
    code    : '09-W',
    title   : 'Loire Valley Direct',
    group   : 'White'
  },
  {
    code    : '05-W',
    title   : 'Sparkling',
    group   : 'Sparkling'
  },
  {
    code    : '06-R',
    title   : 'Rose',
    group   : 'Rose'
  },
  {
    code    : '07-R',
    title   : 'Pinot Noir',
    group   : 'Red'
  },
  {
    code    : '08-R',
    title   : 'Pinot Noir Burgundy',
    group   : 'Red'
  },
  {
    code    : '09-R',
    title   : 'Loire Valley Direct',
    group   : 'Red'
  },
  {
    code    : '10-R',
    title   : 'Bordeaux',
    group   : 'Red'
  },
  {
    code    : '11-R',
    title   : 'Beaujolais',
    group   : 'Red'
  },
  {
    code    : '12-R',
    title   : 'Merlot',
    group   : 'Red'
  },
  {
    code    : '13-R',
    title   : 'Zinfandel',
    group   : 'Red'
  },
  {
    code    : '14-R',
    title   : 'Cabernet Sauvignon',
    group   : 'Red'
  },
  {
    code    : '15-R',
    title   : 'Syrah',
    group   : 'Red'
  },
  {
    code    : '16-R',
    title   : 'Italy',
    group   : 'Red'
  },
  {
    code    : '17-R',
    title   : 'Italy Direct',
    group   : 'Red'
  },
  {
    code    : '18-R',
    title   : 'Red All Other',
    group   : 'Red'
  },
  {
    code    : '19-R',
    title   : 'South Africa Direct',
    group   : 'Red'
  },
  {
    code    : '20-D',
    title   : 'Dessert',
    group   : 'Dessert'
  },
  {
    code    : '25-M',
    title   : 'Get More',
    group   : 'Get More'
  },
]

async function seedCategories() {
    const insertedCategories = await Promise.all(
      categories.map(async (category) => {
        return await db.collection("categories").insertOne(category);
      }
    ))
  
    return insertedCategories;
}

  export async function GET() {
    try {
      // await seedUsers();
      await seedCategories()
  
      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
  }