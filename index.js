const mongoose = require("mongoose");
const express = require("express");
const app = express();
const postsReq = require("./Routes/posts");
const getAPI = require("./Routes/get");
const updateData = require("./Routes/update");
const cors = require("cors");

require("dotenv/config");

app.use(cors());
app.use(express.json());

//Middleware
app.use("/post", postsReq);
app.use("/", getAPI);
app.use("/patch", updateData);

//Connect to DB
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB.");
  }
);

const port = process.env.PORT || 3000;
app.listen(port);
