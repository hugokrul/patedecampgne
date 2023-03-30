var express = require('express');
const app = express();
const path = require("path")
const port = 8005;

var staticPath = path.join(__dirname, "public");

app.use(express.static(staticPath))

app.listen(port)
