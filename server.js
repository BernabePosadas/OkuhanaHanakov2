const exp = require("express");
const logger = require("morgan");
const app = exp();

//region attributes
const port = process.env.PORT || 3000;
//endregion
//region configs 
app.use(logger("combined"));
app.use(exp.static('public'));
//endregion

//region HTTP request route area 
app.get("/", (req, res) => {
    return res.status(200).sendFile(__dirname + "/pages/main.htm");
})
app.listen(port);
//endregion