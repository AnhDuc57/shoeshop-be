const express = require("express");
const users = require("./data/users.js");
const User = require("./src/models/user.model.js");

const ImportData = express.Router();

ImportData.post("/user", async (req, res) => {
  await User.Remove({});
  const importUSer = await User.insertMany(users);
  res.send({ importUSer });
});
module.export =ImportData;
