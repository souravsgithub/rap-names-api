const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
  "mongodb+srv://souravsemail2001:mymongo@cluster0.ojwz25g.mongodb.net/?retryWrites=true&w=majority"
)
  .then((client) => {
    app.set("view-engine", "ejs");
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
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
      rappers
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
        })
        .then(() => {
          res.redirect("/");
        });
    });

    app.listen(process.env.PORT || PORT, () => {
      console.log(`The server is listening at ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
