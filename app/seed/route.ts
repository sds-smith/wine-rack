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
    title: 'White',
    sub_categories: {
      '01-W' : 'Sauvignon Blanc',
      '02-W' : 'Chardonnay Burgundy',
      '03-W' : 'Chardonnay Other',
      '04-W' : 'All Other White',
      '09-W' : 'Loire Valley Direct',

    },
  },
  {
    title: 'Sparkling',
    sub_categories: {
      '05-W' : 'Sparkling',
    },
  },
  {
    title: 'Rose',
    sub_categories: {
      '06-R' : 'Rose'
    },
  },
  {
    title: 'Red',
    sub_categories: {
      '07-R'  : 'Pinot Noir',
      '08-R'  : 'Pinot Noir Burgundy',
      '09-R'  : 'Loire Valley Direct',
      '10-R' : 'Bordeaux',
      '11-R' : 'Beaujolais',
      '12-R' : 'Merlot',
      '13-R' : 'Zinfandel',
      '14-R' : 'Cabernet Sauvignon',
      '15-R' : 'Syrah',
      '16-R' : 'Italy',
      '17-R' : 'Italy Direct',
      '18-R' : 'Red All Other',
      '19-R' : 'South Africa Direct',
    },
  },
  {
    title: 'Dessert',
    sub_categories: {
      '20-D' : 'Dessert'
    },
  },
  {
    title: 'Get More',
    sub_categories: {
      '25-M' : 'Get More'
    },
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