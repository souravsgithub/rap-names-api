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
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));

    console.log("Connected to the database!");

    const db = client.db("rappers-names-app");
    const rappers = db.collection("rappers");

    app.get("/", (req, res) => {
      rappers
        .find()
        .sort({ likes: -1 })
        .toArray()
        .then((results) => {
          res.render("index.ejs", { info: results });
        })
        .catch((err) => {
          console.error(err);
        });
    });

    app.post("/addRapper", (req, res) => {
      console.log(req.body);
      rappers
        .insertOne({
          stageName: req.body.stageName,
          birthName: req.body.birthName,
          likes: 0,
        })
        .then((result) => {
          res.redirect("/");
        })
        .catch((err) => {
          console.error(err);
        });
    });

    app.delete("/deleteRapper", (req, res) => {
      rappers
        .deleteOne({
          stageName: req.body.stageName,
          birthName: req.body.birthName,
          likes: req.body.likes,
        })
        .then((data) => {
          res.json("The rapper is deleted successfully!");
        })
        .catch((err) => {
          console.log(err);
        });
    });

    app.put("/likeRapper", (req, res) => {
      rappers
        .findOneAndUpdate(
          {
            stageName: req.body.stageName,
            birthName: req.body.birthName,
            likes: req.body.likes,
          },
          { $inc: { likes: 1 } }
        )
        .then((data) => {
          res.json("Liked the rapper");
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
