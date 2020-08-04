import { Client, Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { TheWeebsDiscordID } from "./Models/Static/TheWeebsDiscordIDs";
import { DanbooruCommandChain } from "./BotCommandChain/1stChain_Danbooru";
import { CommandChain } from "./Models/Interfaces/CommandChain";
import { SurfaceLevelExceptionHandler } from "./Objects/SurfaceLevelExceptionHandler";
@injectable()
export class Hanako {
    private _client: Client;
    private readonly _token: string;
    private _maintenance: boolean = false;
    private _prefix: string | undefined;
    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string,
        @inject(TYPES.Command_Prefix) prefix: string | undefined

    ) {
        this._client = client;
        this._token = token;
        this._prefix = prefix;
    }
    public start(): Promise<string> {

        //Hanako's Task List
        this.lisenToMessage();

        //set her default activity
        this._client.on("ready", () => {
            this.setActivity("PLAYING", "with Okuhana Aiko");
        });

        //Readies herself and log to discord.
        return this._client.login(this._token);

    }
    private lisenToMessage() {

        var prefix: string | undefined = this._prefix;
        this._client.on("message", async (msg: Message) => {
            try {
                if (prefix !== undefined) {
                    if (!msg.content.startsWith(prefix) || msg.author.bot) {
                        return;
                    }
                    else if (msg.author.id != TheWeebsDiscordID.bernabe && this._maintenance) {
                        msg.reply("Sumimasen, Im currently on training with my master");
                    }
                    const args: Array<string> = msg.content.slice(prefix.length).split(/ +/);
                    const command: string = args[0].toLowerCase();
                    var CommandChain: CommandChain = new DanbooruCommandChain();
                    CommandChain.executeChain(msg, command);
                }
            }
            catch (ex) {
                SurfaceLevelExceptionHandler.writeToFile(ex);
            }
        });


    }

    public setActivity(activity_type: string, activity: string) {
        if (activity_type === "PLAYING") {
            this._client.user?.setActivity(activity, { type: "PLAYING" });
        }
        else if (activity_type === "LISTENING") {
            this._client.user?.setActivity(activity, { type: "LISTENING" });
        }
        else if (activity_type === "STREAMING") {
            this._client.user?.setActivity(activity, { type: "STREAMING" });
        }
        else if (activity_type === "STREAMING") {
            this._client.user?.setActivity(activity, { type: "WATCHING" });
        }
        else {
            throw new Error("Unknown Activity type").stack;
        }

    }
}