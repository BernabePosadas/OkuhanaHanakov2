import { Client, Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { TheWeebsDiscordID } from "./Models/Static/TheWeebsDiscordIDs";
import { Bow } from "./Objects/DanbooruImageRandomizer/Bow";
import { DanbooruCommandChain } from "./Objects/BotCommandChain/1stChain_Danbooru";
import { CommandChain } from "./Models/Interfaces/CommandChain";

@injectable()
export class Hanako {
    private _client: Client;
    private readonly _token: string;
    private readonly _bow : Bow;
    private _maintenance: boolean = false;
    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string,
        @inject(TYPES.Bow) bow : Bow
    ) {
        this._client = client;
        this._token = token;
        this._bow = bow;
    }
    public start(): Promise<string> {
        //Hanako's Task List
        this.lisenToMessage();

        //Readies herself and log to discord.
        return this._client.login(this._token);
    }
    private lisenToMessage() {
        var prefix = "!"
        this._client.on("message", async (msg: Message) => {
            if (!msg.content.startsWith(prefix) || msg.author.bot) {
                return;
            }
            else if (msg.author.id != TheWeebsDiscordID.bernabe && this._maintenance) {
                msg.reply("Sumimasen, Im currently on training with my master");
            }
            const args: Array<string> = msg.content.slice(prefix.length).split(/ +/);
            const command : string = args[0].toLowerCase();
            var CommandChain : CommandChain = new DanbooruCommandChain(this._bow);
            CommandChain.executeChain(msg, command);
        });
    }
    /*
    public setActivity(activity_type: string, activity: string) {
    }
    */
}