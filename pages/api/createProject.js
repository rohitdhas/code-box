import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const { name, description, userId } = req.body;
  let { db } = await connectToDatabase();

  const doc = await db
    .collection("projects")
    .insertOne({ name, description, user: userId, createdAt: new Date() });
  res
    .status(200)
    .json({ isError: false, message: "Project Created! ✅", data: doc });
}
