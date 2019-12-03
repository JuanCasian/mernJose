const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const items = require("./routes/api/items");

const app = express();

//BodyParser Middleware
app.use(express.json());

//DB Conig
const db = config.get("mongoURI");

//Connecto to Mongo//
mongoose;
// .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => console.log("MongoDB Conected..."))
// .catch(err => console.log(err));

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

//use routes

app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
//Serve static assets if in production
if (process.env.NODE_ENV == "production") {
  //Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
