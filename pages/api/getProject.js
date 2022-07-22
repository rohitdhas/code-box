import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const { projectId } = req.query;
  let { db } = await connectToDatabase();

  const doc = await db.collection("projects").find({ _id: projectId });
  res.status(200).json({ isError: false, data: doc });
}
