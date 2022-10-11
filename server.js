const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
//process environement vars

// connect to database
mongoose
  .connect(
    "mongodb+srv://alalamouchi:alalamouchi122@cluster0.fvzcyb1.mongodb.net/checkpoint?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => console.log(err));

//middlewares
app.use(express.json());

app.post("/create", async (req, res) => {
  try {
    let { fName, lName, phone, adresse, email, password } = req.body;
    const newusers = new User({
      fName,
      lName,
      phone,
      adresse,
      email,
      password,
    });
    await newusers.save();
    res.status(200).json({
      status: true,
      message: "users was added successfully",
    });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
});

app.get("users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: true, data: users });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
});

app.put("/update", async (req, res) => {
  try {
    let { id } = req.params;
    await user.findByIdAndUpdate(
      id,
      {
        $set: { ...req.body },
      },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: " was updated successfully",
    });
  } catch (error) {
    if (error) throw error;
    console.log(error);
  }
});

app.delete("delete" , async (req, res) => {

  try {
    let { id } = req.params;
    await user.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "user was deleted successfully",
    });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
})

//connect server
app.listen(5000, (err) => {
  if (err) throw err;
  console.log("Server is up and running...");
});
