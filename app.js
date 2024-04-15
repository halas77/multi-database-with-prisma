import express from "express";
import dotenv from "dotenv";
import { PrismaClient as PrismaClient1 } from "./prisma/generated/client1/index.js"
import { PrismaClient as PrismaClient2 } from "./prisma/generated/client2/index.js";

const client1 = new PrismaClient1();
const client2 = new PrismaClient2();

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;



app.post("/user", async (req, res) => {
  try {
    const { name, password } = req.body;
    console.log(name + " " + password);

      const user = await client1.user.create({
        data: { name, password },
      });
      return res
        .status(201)
        .json({ message: "User created successfully", data: user });
      // return res.json({ message: err});

    //   console.log(user);
  } catch (error) {
    return res.status(500).json({ message: "Error creating user" });
  }
});

app.post("/test", async (req, res) => {
  try {
    const { title } = req.body;
    console.log(title);

    const userId = await client1.user.findUnique({
      where: { id: 1 }
    })

    console.log(userId);


    try {
      const test = await client2.test.create({
        data: { title: title, authorId:  parseInt(userId.id)},
      });
      return res
        .status(201)
        .json({ message: "User created successfully", data: test });
      
    } catch (error) {
      console.log(error);
      
    }

  } catch (error) {
    return res.status(500).json({ message: "Error creating user" });
  }
});


app.get("/test", async (req, res) => {
  try {
    const test = await client2.test.findMany();

    return res.status(200).json({ message: "Here are the blogs", data: test });
  } catch (error) {
    return res.status(500).json({ message: "Error creating blog" });
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await client1.user.findMany();

    return res.status(200).json({ message: "Here are the blogs", data: user });
  } catch (error) {
    return res.status(500).json({ message: "Error creating user" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
