import { Client, Message, User } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { TheWeebsDiscordID } from "./Models/Static/TheWeebsDiscordIDs";
import { DanbooruCommandChain } from "./BotCommandChain/1stChain_Danbooru";
import { CommandChain } from "./Models/Interfaces/CommandChain";
import { SurfaceLevelExceptionHandler } from "./Objects/SurfaceLevelExceptionHandler";
import { HanakoSpeech } from "./Models/Static/HanakoSpeech";
@injectable()
export class Hanako {
    private _client: Client;
    private readonly _token: string;
    private _prefix: string | undefined;
    private _danbooru_CommandChain : DanbooruCommandChain;
    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string,
        @inject(TYPES.Command_Prefix) prefix: string | undefined,
        @inject(TYPES.Danbooru_CommandChain) danbooru_CommandChain : DanbooruCommandChain
    ) {
        this._client = client;
        this._token = token;
        this._prefix = prefix;
        this._danbooru_CommandChain = danbooru_CommandChain;
    }
    public start(): Promise<string> {

        //Hanako's Task List
        this.lisenToMessage();

        //set her default activity
        this._client.on("ready", () => {
            try {
                this.setActivity("PLAYING", "with Okuhana Aiko");
            }
            catch (ex) {
                SurfaceLevelExceptionHandler.handle(ex);
            }
        });

        //Readies herself and log to discord.
        return this._client.login(this._token);

    }
    private lisenToMessage() {
        var prefix: string | undefined = this._prefix;
        this._client.on("message", async (msg: Message) => {
            try {
                if (msg.channel.type === "dm") {
                    //dm channel routine 
                    msg.author.send("Sumimasen. I cant respond to DMs at the moment");
                }
                else if (msg.channel.type === "text") {
                    //text channel routine 
                    if (prefix !== undefined) {
                        if (!msg.content.startsWith(prefix) || msg.author.bot) {
                            return;
                        }
                        const args: Array<string> = msg.content.slice(prefix.length).split(/ +/);
                        const command: string = args[0].toLowerCase();
                        this._danbooru_CommandChain.executeChain(msg, command);
                    }
                }
                else {
                    // news channel routine 
                    msg.reply("Sumimasen. I cant respond to news/announce channel at the moment");
                }
            }
            catch (ex) {
                msg.reply(HanakoSpeech.ERROR_APOLOGY);
                SurfaceLevelExceptionHandler.handle(ex);
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
    public async sendErrorAsPrivateMessage(discord_id: string, message: string) {
        var user: User = await this._client.users.fetch(discord_id);
        user.send(message, { files: ["./logs/exception_stack_trace.txt"] });
    }
}