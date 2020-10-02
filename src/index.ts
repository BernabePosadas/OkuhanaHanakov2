require('dotenv').config();
import container from "./inversify.config";
import { TYPES } from "./types";
import { Hanako } from "./bot";
import exp from "express";
import logger from "morgan";
const app = exp();

//region attributes
const port = process.env.PORT || 3000;

let bot = container.get<Hanako>(TYPES.Hanako);

bot.start().then(() => {
  console.log('<placeholder for start speech>');
  // Express.js Starts Here 

  //region configs 
  app.use(logger("combined"));
  app.use(exp.static('public'));
  //endregion

  //region HTTP request route area 
  app.get("/OkuhanaHanako/Home", (req, res) => {
    //res.send("Hello world!");
    return res.status(200).sendFile(__dirname + "/pages/main.htm");
  })
  app.listen(port);
  //endregion


}).catch((error) => {
  console.log('Hanako scrapped her knee: ', error);
});


