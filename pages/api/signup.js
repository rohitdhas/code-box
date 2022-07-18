import { connectToDatabase } from "../../lib/mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  let { db } = await connectToDatabase();
  const { email, password, name } = req.body;

  const user = await db.collection("users").findOne({ email });

  if (user) {
    res.status(409).json({ message: "Email already exist!", isError: true });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = await db
      .collection("users")
      .insertOne({ name, email, password: hashedPassword });
    res.status(200).json({
      message: "Account Created Successfully!",
      isError: false,
      data: userDoc,
    });
  }
}
