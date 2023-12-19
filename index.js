const express = require("express");

const app = express();

app.get("/hello", (req,res) => {
        res.send("getHello");

});


app.get("/", (req,res) => {
    res.send("sbaho");

});




app.post("/hello", (req,res) => {
    res.send("Hello");

});
app.listen(30001,() => {
    console.log("iam in port 30001");
});







