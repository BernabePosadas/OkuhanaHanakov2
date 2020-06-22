import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Hanako } from "./bot";
import { Client } from "discord.js";
import { Danbooru } from "./Objects/Data_Source/Danbooru";
import { Quiver } from "./Objects/DanbooruImageRandomizer/Quiver";
import { Bow } from "./Objects/DanbooruImageRandomizer/Bow";


let container = new Container();

container.bind<Hanako>(TYPES.Hanako).to(Hanako).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string | undefined>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<string | undefined>(TYPES.Danbooru_Username).toConstantValue(process.env.USER_NAME);
container.bind<string | undefined>(TYPES.Danbooru_Key).toConstantValue(process.env.DANBOORU_KEY);
container.bind<Danbooru>(TYPES.Danbooru).to(Danbooru).inSingletonScope();
container.bind<Quiver>(TYPES.Quiver).to(Quiver).inSingletonScope();
container.bind<Bow>(TYPES.Bow).to(Bow).inRequestScope(); 


export default container;