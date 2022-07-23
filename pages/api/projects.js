import { connectToDatabase } from "../../lib/mongodb";
import { getCookieVal } from "../../utils";

export default async function handler(req, res) {
  const { userId } = req.query;

  let { db } = await connectToDatabase();
  const userToken = getCookieVal(req.headers.cookie, "codebox-token");
  const tokenCheck = await db
    .collection("tokens")
    .findOne({ token: userToken });

  if (!userToken || !tokenCheck) {
    res.status(404).json({
      isError: true,
      message: "Something went wrong! Please relogin!",
    });
    return;
  }

  const projects = await db
    .collection("projects")
    .find({ user: userId })
    .sort({ _id: -1 })
    .toArray();
  res.status(200).json({ isError: false, data: projects });
}
