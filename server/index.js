const express = require('express');
const app = express();

app.get("/test.json", function (request, response) {
  console.log("Hello World!");
});
