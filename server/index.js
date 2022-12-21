
const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose');
const config = require('./config/key');
const cookieParser = require('cookie-parser');
const url = require('url')



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/api/users", require("./routes/users"));
app.use("/api/photos", require("./routes/photos"));
app.use("/api/exhibitions", require("./routes/exhibitions"));

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("...mongoDB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("Running on port ", port);
});
