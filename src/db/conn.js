const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/visitersData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(`Connection failed ${err}`);
  });
