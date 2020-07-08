require('dotenv').config();
import container from "./inversify.config";
import {TYPES} from "./types";
import {Hanako} from "./bot";

let bot = container.get<Hanako>(TYPES.Hanako);

bot.start().then(() => {
  console.log('<placeholder for start speech>')
}).catch((error) => {
  console.log('Hanako scrapped her knee: ', error)
});