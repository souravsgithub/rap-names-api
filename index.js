const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

MongoClient.connect(process.env.DB_STRING)
  .then((client) => {
    app.set("view-engine", "ejs");

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.static("public"));

    console.log("Connected to the database!");

    const db = client.db("rappers-names-app");
    const rappers = db.collection("rappers");

    app.get("/", (req, res) => {
      rappers
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { info: results });
        })
        .catch((err) => {
          console.error(err);
        });
    });

    app.post("/form", (req, res) => {
      console.log(req.body);
      rappers
        .insertOne({
          stageName: req.body.stageName,
          birthName: req.body.birthName,
          likes: 0,
        })
        .then((result) => {
          console.log(result);
        })
        .then(() => {
          res.redirect("/");
        })
        .catch((err) => {
          console.error(err);
        });
    });

    app.listen(process.env.PORT || PORT, () => {
      console.log(`The server is listening at ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
