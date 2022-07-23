import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { projectId, html, css, js } = req.body;
  let { db } = await connectToDatabase();

  await db
    .collection("projects")
    .updateOne({ _id: ObjectId(projectId) }, { $set: { html, css, js } });
  res.status(200).json({ isError: false });
}
