require('dotenv').config()
require("./db");
const express = require("express");
const authT=require('./routes/auth');
const notesT=require('./routes/notes');

const app = express();
const port = process.env.PORT || 5000;



app.use(express.json());
app.use("/api/auth", authT);
app.use("/api/notes", notesT);

app.use(express.static("frontend/build"));

const path = require("path");

app.get("*", (req, res) => {

    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));

})




// console.log(process.env.JWTSecret);

app.listen(port, () => {
  console.log(`INotebook listening on port ${port}`);
});
