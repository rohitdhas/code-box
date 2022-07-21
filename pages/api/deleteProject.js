import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { projectId } = req.query;
  console.log(projectId);
  let { db } = await connectToDatabase();

  const doc = await db
    .collection("projects")
    .deleteOne({ _id: ObjectId(projectId) });
  res
    .status(200)
    .json({ isError: false, message: "Project Deleted! ✅", data: doc });
}
