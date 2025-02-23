import { ObjectId } from "mongodb";
import client from "../../services/mongodb";
import { revalidatePath } from 'next/cache'

const db = client.db(process.env.MONGODB_DATABASE);

export async function GET() {
    try {
        const data = await db.collection("wines").find({ Archived: { $ne: true } }).toArray();
        revalidatePath('/')
        return Response.json({
            status: 200,
            success: true,
            wineData: data,
            message: 'Success!'
        })
    } catch (e) {
        console.error(e);
        return Response.json({
            status: 400,
            success: false,
            wineData: [],
            message: `Error: ${e}`
        })
    }
}

export async function POST(req: Request) {
    const wine = await req.json();

    Object.entries(wine).forEach(([key, value]) => {
        if (value === null || value === '') delete wine[key]
    })
    try {
        const insertResponse = await db.collection("wines").insertOne(wine);
        revalidatePath('/')
        if (!insertResponse) {
            return Response.json({
                status: 500,
                success: false,
                message: 'Wine not added to database'
            });
        }
        return Response.json({
            status: 201,
            success: true,
            message: `New wine added to database with id ${insertResponse.insertedId}`
        })
    } catch(err) {
        console.error(err)
        return Response.json({
            status: 400,
            success: false,
        })
    }
}

export async function PUT(req: Request) {
    const updatedWine = await req.json();
    const _id = new ObjectId(updatedWine._id);
    Object.entries(updatedWine).forEach(([key, value]) => {
        if (value === null || value === '') delete updatedWine[key]
    })

    try {
        const updateResponse = await db.collection("wines").replaceOne({_id}, {
            ...updatedWine,
            _id
        });
        revalidatePath('/')
        if (!updateResponse) {
            return Response.json({
                status: 500,
                success: false,
                message: 'Wine not updated in database'
            });
        }
        return Response.json({
            status: 201,
            success: true,
            message: `Wine with id ${_id} updated in database`
        })
    } catch(err) {
        console.error(err)
        return Response.json({
            status: 400,
            success: false,
        })
    }
}

export async function DELETE(request: Request) {
    const wineToDelete = await request.json();
    const _id = new ObjectId(wineToDelete._id)
    try {
        const deleteResponse = await db.collection("wines").deleteOne({_id})
        revalidatePath('/')
        if (!deleteResponse) {
            return Response.json({
                status: 400,
                success: false,
                message: `Failed to delete wine with id ${_id}`
            })
        }
        if (!deleteResponse.deletedCount) {
            return Response.json({
                status: 404,
                success: false,
                message: `Wine with id ${_id} does not exist in database. It may have already been deleted.`
            })
        }
        return Response.json({
            status: 202,
            success: true,
            message: `Wine with id ${_id} has been deleted from database`
        })
    } catch (e) {
        console.error(e)
        return Response.json({
            status: 400,
            success: false,
        })
    }
}

export async function PATCH(req: Request) {
    const { wineID, ...updateFields } = await req.json();
    console.log('[PATCH] updateFields',updateFields)
    const _id = new ObjectId(wineID);

    try {
        const updateResponse = await db.collection("wines").updateOne(
            {_id}, 
            { $set: updateFields}
        );
        revalidatePath('/')
        if (!updateResponse) {
            return Response.json({
                status: 500,
                success: false,
                message: 'Wine not updated in database'
            });
        }
        return Response.json({
            status: 201,
            success: true,
            message: `Wine with id ${_id} updated in database`
        })
    } catch(err) {
        console.error(err)
        return Response.json({
            status: 400,
            success: false,
        })
    }
}