import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors"
import connectDB from "./bdConfig/db.js";
import Passwords from "./models/Passwords.js";
import registerApi from "./api/RegisterApi.js";
import userApi from "./api/LoginApi.js";

dotenv.config();
const app = express()
const port = process.env.PORT || 3000

connectDB();
app.use(bodyParser.json())
app.use(cors())


app.use("/register",registerApi);
app.use("/login",userApi);
app.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  // console.log(userId);
  if (!userId) {
    return res.status(400).json({ message: 'userId query parameter is required' });
  }

  try{
    const passwords = await Passwords.find({user:userId});
    res.status(200).json(passwords);
  }
  catch(error){
    res.status(500).json({ message: 'Server error', error: error.message });
  }
})

app.post('/', async (req, res) => {
  const { site, username, password, id,userId } = req.body;

  if (!site || !username || !password || !userId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newPassword = await Passwords.create({
      id,
      site,
      username,
      password,
      user: userId,
    });
    res.status(201).json(newPassword);
  }
  catch(error){
    res.status(500).json({ message: 'Server error', error: error.message });
  }
})
app.delete('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const password = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'userId query parameter is required' });
  }

  try{
    let rs = await Passwords.deleteOne({id:password.id,user:userId});
    res.status(200).json({ message: 'Password deleted successfully' });
  }
  catch(error){
    res.status(500).json({ message: 'Server error', error: error.message });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})