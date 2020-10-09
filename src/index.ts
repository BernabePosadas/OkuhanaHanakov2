require('dotenv').config();
import container from "./inversify.config";
import { TYPES } from "./types";
import { Hanako } from "./bot";
import exp from "express";
import logger from "morgan";
import favicon from 'serve-favicon';
const app = exp();
import path from "path";
import { DBSchemaInitMigrationTool } from "./Objects/Misc/DBSchemaInitMigrationTool";

//region attributes
const port = process.env.PORT || 3000;

let bot = container.get<Hanako>(TYPES.Hanako);
let migration = container.get<DBSchemaInitMigrationTool>(TYPES.Migration_tool);
migration.executeDBSchemaMigration();

bot.start().then(() => {
  console.log('<placeholder for start speech>');
 
  // Express.js Starts Here 

  //region middleware
  app.use(logger("combined"));
  app.use(favicon(path.join(__dirname, '../src/static-pages', 'favicon.ico'))); // website favicon
  app.use('/OkuhanaHanako', exp.static(path.join(__dirname, '../src/static-pages')));  //serve static page

  //endregion

  app.listen(port);
  //endregion


}).catch((error) => {
  console.log('Hanako scrapped her knee: ', error);
});


