import { ObjectId } from "mongodb";
import client from "../../services/mongodb";

const db = client.db("wine_rack");

export async function GET() {
    try {
        const data = await db.collection("wines").find({}).toArray();
        return Response.json(data)
    } catch (e) {
        console.error(e);
    }
}

export async function POST(request: Request) {
    const wine = await request.json();
    try {
        const resp = await db.collection("wines").insertOne(wine)
        return Response.json(resp)
    } catch (e) {
        console.error(e);
    }
}

export async function DELETE(request: Request) {
    const wineToDelete = await request.json();
    const _id = new ObjectId(wineToDelete._id)
    try {
        const resp = await db.collection("wines").deleteOne({_id})
        return Response.json(resp)
    } catch (e) {
        console.error(e)
    }
}