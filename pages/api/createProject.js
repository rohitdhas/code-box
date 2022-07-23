import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const { name, description, userId } = req.body;
  let { db } = await connectToDatabase();

  const doc = await db.collection("projects").insertOne({
    name,
    description,
    user: userId,
    createdAt: new Date(),
    html: `<div>
    <h2>Welcome to codebox 🚀🔥</h2>
	<button>Click Me</button>
</div>
    `,
    css: `div {
    font-family: sans-serif;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
h2 {
    color: cornflowerblue;
  }
    `,
    js: `// Your JavaScript Goes here!! 🎈\n// Your progress will be automatically saved to Cloud ☁`,
  });
  res
    .status(200)
    .json({ isError: false, message: "Project Created! ✅", data: doc });
}
