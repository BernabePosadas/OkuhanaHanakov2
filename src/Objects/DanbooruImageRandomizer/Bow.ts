import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { Shuffler } from "./../Shuffle";
import { Quiver } from "./Quiver";
import { Message } from "discord.js";
import { TheWeebsDiscordID } from "../TheWeebsDiscordIDs";
import { HanakoSpeech } from "../HanakoSpeech";
import { checkIfR18 } from "./../R18ChannelValidator";

@injectable()
export class Bow {
    private readonly _quiver: Quiver;
    constructor(
        @inject(TYPES.Quiver) quiver: Quiver
    ) {
        this._quiver = quiver;
    }
    public async shootBernabe(msg: Message) {
        if (this.onWeebChannel(msg)) {
            msg.channel.send(`<\@${TheWeebsDiscordID.bernabe}> ` + Shuffler.shuffleAndPickFromArray(HanakoSpeech.ARROW_SHOOT_SPEECHES));
            msg.channel.send((await this._quiver.pickAnArrow("bernabe")).danbooru_link);
        }
    }
    public async shootMark(msg: Message) {
        if (this.onWeebChannel(msg)) {
            msg.channel.send(`<\@${TheWeebsDiscordID.mark}> ` + Shuffler.shuffleAndPickFromArray(HanakoSpeech.ARROW_SHOOT_SPEECHES));
            msg.channel.send((await this._quiver.pickAnArrow("mark")).danbooru_link);
        }
    }
    public async shootIvan(msg: Message) {
        if (this.onWeebChannel(msg)) {
            msg.channel.send(`<\@${TheWeebsDiscordID.ivan}> ` + Shuffler.shuffleAndPickFromArray(HanakoSpeech.ARROW_SHOOT_SPEECHES));
            msg.channel.send((await this._quiver.pickAnArrow("ivan")).danbooru_link);
        }
    }
    public omakaseShoot(msg: Message) {
        if (this.onWeebChannel(msg)) {
            var results: string = Shuffler.shuffleAndPickFromArray(["mark", "ivan", "me", "all", "chino"]);
            switch (results) {
                case "me":
                    this.shootBernabe(msg);
                    break;
                case "mark":
                    this.shootMark(msg);
                    break;
                case "ivan":
                    this.shootIvan(msg)
                    break;
                case "all":
                    this.shootAll(msg);
                    break;
                case "chino":
                    this.useOugi(msg);
                    break;
                default:
                    throw new Error("Unexpected value for result : " + results).stack;
            }
        }
    }
    public async useOugi(msg: Message) {
        if (this.onWeebChannel(msg)) {
            msg.channel.send(HanakoSpeech.OUGI_SPEECH);
            msg.channel.send((await this._quiver.pickAnArrow("chino")).danbooru_link);
        }
    }
    public async doGenericDanbooruImageSearch(msg : Message, searchFrom : string){
        const args : Array<string> = msg.content.slice("!".length).split(/ +/);
        args.shift();
        if (args.length > 2) {
            msg.reply(HanakoSpeech.MORE_THAN_TAG_LIMIT_SPEECH);
            return;
        }
        var tags : string = "";
        args.forEach(element => {
            tags = tags + element + " ";
        });
        if(searchFrom === "danbooru"){
            if(!checkIfR18(msg)){
                return; 
            }
        }
        var response = (await this._quiver.genericDanbooruRandomImageSearch(tags, searchFrom)).danbooru_link;
        if (response === "no data") {
            var reply : string = "Sumimasen. I find no image matching with tags" 
            args.forEach(element => {
                reply = reply +` \`${element}\` `;
            });
            msg.reply(reply);
            return;

        }
        msg.channel.send(response);
    }
    private onWeebChannel(msg: Message): boolean {
        if (msg.channel.id != "677361288246198292" && msg.channel.id != "677361065327067136" && msg.guild.id === "677136815894822922") {
            msg.reply(HanakoSpeech.NOT_IN_WEEB_GENERAL_CHANNEL_SPEECH);
            return false;
        }
        else if (msg.guild.id != "677136815894822922") {
            msg.reply(HanakoSpeech.NOT_IN_WEEB_SERVER);
            return false;
        }
        return true;
    }
    private async shootAll(msg: Message) {
        if (this.onWeebChannel(msg)) {
            msg.channel.send(HanakoSpeech.SHOOT_ALL_SPEECH);
            msg.channel.send((await this._quiver.pickAnArrow("bernabe")).danbooru_link);
            msg.channel.send((await this._quiver.pickAnArrow("mark")).danbooru_link);
            msg.channel.send((await this._quiver.pickAnArrow("ivan")).danbooru_link);
        }
    }
}