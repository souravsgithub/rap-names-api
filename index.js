const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

const rappers = {
  "21 savage": {
    birthName: "Shéyaa Bin Abraham-Joseph",
    birthLocation: "London, England",
    age: 29,
  },
  "chance the rapper": {
    birthName: "Chancelor Johnathan Bennett",
    birthLocation: "Chicago, Illinois, U.S",
    age: 29,
  },
  eminem: {
    birthName: "Marshall Bruce Mathers III",
    birthLocation: "St. Joseph, Missouri",
    age: 50,
  },
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/:name", (req, res) => {
  const rapperName = req.params.name.toLowerCase();
  if (rappers[rapperName]) {
    res.json(rappers[rapperName]);
  } else {
    res.json({ age: 0, birthName: "Unknown", birthLocation: "Unknown" });
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`The server is listening at ${PORT}`);
});
