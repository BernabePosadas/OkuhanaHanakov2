import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Hanako } from "./bot";
import { Client } from "discord.js";


let container = new Container();

container.bind<Hanako>(TYPES.Hanako).to(Hanako).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string | undefined>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<string>(TYPES.MarkDiscordID).toConstantValue("385610212981211148");
container.bind<string>(TYPES.BernabeDiscordID).toConstantValue("432863364239196160");
container.bind<string>(TYPES.IvanDiscordID).toConstantValue("410755095446290432");
container.bind<string | undefined>(TYPES.Danbooru_Username).toConstantValue(process.env.USER_NAME);
container.bind<string | undefined>(TYPES.Danbooru_Key).toConstantValue(process.env.DANBOORU_KEY);

export default container;