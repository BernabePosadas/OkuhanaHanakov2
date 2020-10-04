import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Hanako } from "./bot";
import { Client } from "discord.js";
import { Danbooru } from "./Objects/Data_Source/Danbooru";
import { Quiver } from "./Objects/DanbooruImageRandomizer/Quiver";
import { Bow } from "./Objects/DanbooruImageRandomizer/Bow";
import { MusicPlayerControl } from "./Objects/MusicPlayer/MusicPlayerControl";
import { nHentai } from "./Objects/Data_Source/nHentai";
import { nHentaiDoujin } from "./Objects/nHentaiDoujin/nHentaiDoujin";
import { nHentaiCommandChain } from "./BotCommandChain/2ndChain_nHentai";
import { DanbooruCommandChain } from "./BotCommandChain/1stChain_Danbooru";
import { MiscCommand } from "./Objects/Misc/MiscFuntions";
import { BotMiscCommandChain } from "./BotCommandChain/4thChain_Misc";
import { MusicPlayerCommandChain } from "./BotCommandChain/3ndChain_MusicPlayer";
import { CommandChain } from "./Models/Interfaces/CommandChain";

let container = new Container();

container.bind<Hanako>(TYPES.Hanako).to(Hanako).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string | undefined>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<string | undefined>(TYPES.Danbooru_Username).toConstantValue(process.env.USER_NAME);
container.bind<string | undefined>(TYPES.Danbooru_Key).toConstantValue(process.env.DANBOORU_KEY);
container.bind<Danbooru>(TYPES.Danbooru).to(Danbooru).inSingletonScope();
container.bind<Quiver>(TYPES.Quiver).to(Quiver).inSingletonScope();
container.bind<Bow>(TYPES.Bow).to(Bow).inSingletonScope(); 
container.bind<MusicPlayerControl>(TYPES.MusicPlayerControl).to(MusicPlayerControl).inSingletonScope();
container.bind<string | undefined>(TYPES.Command_Prefix).toConstantValue(process.env.COMMAND_PREFIX);
container.bind<nHentai>(TYPES.NHentai_Data).to(nHentai).inTransientScope();
container.bind<nHentaiDoujin>(TYPES.NHentai_Doujin).to(nHentaiDoujin);
container.bind<MiscCommand>(TYPES.Misc_Command).to(MiscCommand);

container.bind<CommandChain>(TYPES.NHentai_CommandChain).to(nHentaiCommandChain);
container.bind<CommandChain>(TYPES.Danbooru_CommandChain).to(DanbooruCommandChain);
container.bind<CommandChain>(TYPES.Music_CommandChain).to(MusicPlayerCommandChain);
container.bind<CommandChain>(TYPES.Misc_CommandChain).to(BotMiscCommandChain);

export default container;