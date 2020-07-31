const express = require("express");
const router = express.Router();
const Post = require("../Models/Post");
const fetch = require("node-fetch");
require("dotenv/config");
const cities = require("../cities");

let time = 1;

router.post("/", async (req, res) => {
  if (time == 1) return res.send("Data Already Present.");
  await getData();
  time++;
  res.send("Sent Data in DB.");
});

async function getWeather(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data.main.temp;
  } catch (err) {
    console.log(err);
  }
}

function getData() {
  cities.forEach(async (place) => {
    try {
      let data = await getWeather(place);
      const post = new Post({
        City: place,
        Temp: data,
      });
      post.save().catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = router;
