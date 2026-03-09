const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("YOUR_MONGODB_ATLAS_URL")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const Food = mongoose.model("Food", {
  name: String,
  price: Number,
  image: String
});

app.get("/foods", async (req, res) => {
  const foods = await Food.find();
  res.json(foods);
});

app.post("/foods", async (req, res) => {
  const newFood = new Food(req.body);
  await newFood.save();
  res.json(newFood);
});

app.listen(5000, () => console.log("Server running on port 5000"));