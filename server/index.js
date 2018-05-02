const express = require('express');
const app = express();

app.get("/test.png", function (request, response) {
  console.log("HELLO!");
});
