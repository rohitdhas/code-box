import { connectToDatabase } from "../../lib/mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  let { db } = await connectToDatabase();
  const { email, password } = req.body;

  const user = await db.collection("users").findOne({ email });

  if (!user) {
    res.status(404).json({ message: "User doesn't exist!", isError: true });
  } else {
    bcrypt.compare(password, user.password, (err, userData) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "Internal Server Error!", isError: true });
      }

      if (userData) {
        res.status(200).json({
          message: "Successfully Logged In!",
          isError: false,
          data: user,
        });
      } else
        res
          .status(404)
          .json({ message: "Incorrect Password!❌", isError: true });
    });
  }
}
