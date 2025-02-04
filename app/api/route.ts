import clientPromise from "../../services/mongodb";

export async function POST(request: Request) {
    const wine = await request.json();

    try {
        const client = await clientPromise;
        const db = client.db("wine_rack");
        const resp = await db.collection("wines").insertOne(wine)
        return Response.json(resp)
    } catch (e) {
        console.error(e);

    }
}

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("wine_rack");
        const data = await db.collection("wines").find({}).toArray();
        return Response.json(data)
    } catch (e) {
        console.error(e);
    }
}