const express = require("express");
const port = require("./config/server");

const app = express();

app.use(express.json());
app.use(require("cors")());
app.use("/api", require("./routes/router"));

app.listen(
  port.PORT,
  console.log(`Server has been started on port: ${port.PORT}`)
);
