const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const methodOverride = require("method-override");

require("dotenv").config();
require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(methodOverride("_method"));
//app.use(favicon(path.join(__dirname, "build", "favicon.ico")))
app.use(express.static(path.join(__dirname, "build")));

app.use(require("./config/checkToken"));

// Put API routes here, before the "catch all" route
app.use("/api/users", require("./routes/api/users"));
app.use("/api/capital", require("./routes/api/capital"));
app.use("/api/investments", require("./routes/api/investment"));
app.use("/api/liability", require("./routes/api/liability"));
app.use("/api/expenses", require("./routes/api/expenses"));
app.use("/api/incomes", require("./routes/api/incomes"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port =5000;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
