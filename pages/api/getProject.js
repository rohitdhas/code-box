import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { projectId } = req.query;
  let { db } = await connectToDatabase();

  if (!ObjectId.isValid(projectId)) {
    res.status(400).json({ isError: true, message: "Project not found!" });
    return;
  }

  const doc = await db
    .collection("projects")
    .findOne({ _id: ObjectId(projectId) });
  res.status(200).json({ isError: false, data: doc });
}
