const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
const users = [
  { id: 1, name: "savana", email: "savana@gmail.com" },
  { id: 2, name: "sabnor", email: "savana@gmail.com" },
  { id: 3, name: "chompa", email: "savana@gmail.com" },
];
app.get("/", (req, res) => {
  res.send("simple node server running");
});
app.get("/users", (req, res) => {
  res.send(users);
});

const uri =
  "mongodb+srv://testdb:wFGMbR1HRrz5bJGU@cluster0.qgf8xau.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client.db("simplenode").collection("users");
    // const user = { name: "mahi", email: "mahi@gail.com" };
    // const result = await userCollection.insertOne(user);
    // console.log(result);

    app.get("/users", async (req, res) => {
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    
    app.post("/users", async (req, res) => {
      const user = req.body;
      user.id = users.length + 1;
      const result = await userCollection.insertOne(user);
      user._id = result.insertedId;
      console.log(result);
      res.send(user);
    });
  } finally {
  }
}
run().catch((error) => {
  console.log(error);
});

// app.post("/users", (req, res) => {
//   const user = req.body;
//   user.id = users.length + 1;
//   users.push(user);
//   res.send(user);
//   console.log(user);
// });

app.listen(port, () => {
  console.log("server running on port 5000");
});
// testdb
// wFGMbR1HRrz5bJGU
