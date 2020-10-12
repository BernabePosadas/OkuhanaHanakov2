import { nHentai } from "../Data_Source/nHentai";
import { Message, MessageEmbed } from "discord.js";
import { HanakoSpeech } from "../../Models/Static/HanakoSpeech";
import { checkIfR18 } from "../R18ChannelValidator";
import container from "../../inversify.config";
import { TYPES } from "../../types";
import { inject, injectable } from "inversify";

@injectable()
export class nHentaiDoujin{
    private _nhentai : nHentai;
    private _doujin : any;
    private _ext : string = "";
    private _command_prefix : string | undefined;
    constructor(
        @inject(TYPES.Command_Prefix) command_prefix : string,
        @inject(TYPES.NHentai_Data) nHentai_Data : nHentai
    ){
        this._nhentai = nHentai_Data;
        this._command_prefix = command_prefix;
    }
    public async searchAndServeDoujin(msg : Message, tagOnly : boolean){
        if(!checkIfR18(msg)){
            return;
        }
        var codeString = msg.content.substring(12).toString().trim();
        if(codeString.length === 0){
            msg.reply(HanakoSpeech.EMPTY_ARGUMENT);
            return;
        }
        var codes = codeString.split(" ");
        
        if(codes.length > Number(process.env.NHENTAI_MAX_CODES)) {
            msg.reply(HanakoSpeech.NHENTAI_MAX_QUERY_REACHED);
        }
        else {
            for(var code of codes) {
                this._doujin = await this._nhentai.fetchDoujin(code);
                if (!this._doujin) {
                    msg.reply(HanakoSpeech.NO_DOUJIN_FOUND_SPEECH);
                }
                else {
                    if (this._doujin.images.cover.t == "j") this._ext = "jpg";
                    else this._ext = "png";
                    if (tagOnly) {
                        this.displayAllTags(msg);
                    }
                    else {
                        var DetailMessageEmbed = new MessageEmbed()
                            .setColor("#FFC0CB")
                            .setTitle(this._doujin.title.english)
                            .setImage(`https://t.nhentai.net/galleries/${this._doujin.media_id}/cover.${this._ext}`)
                            .addField("Tags: ", this.displayTags("tag"))
                            .addField("Artist: ", this.displayTags("artist"))
                            .addField("Group: ", this.displayTags("group"))
                            .addField("Character: ", this.displayTags("character"))
                            .addField("Parody: ", this.displayTags("parody"))
                            .addField("Language: ", this.displayTags("language"))
                            .addField(`${this._doujin.images.pages.length} pages`, `[View on nHentai](https://nhentai.net/g/${this._doujin.id})`, true);
                        msg.channel.send(DetailMessageEmbed);
                    }
                }
            }
        }
    }
    private displayTags(tagType : string) {
        var tagList = "";
        this._doujin.tags.forEach((tag: { type: string; name: any; count: any; url: any; })  => {
            if (tag.type === tagType) {
                tagList += `[[${tag.name} (${tag.count})](https://nhentai.net${tag.url})] `;
            }
        });
        if (tagList === "") {
            return "none";
        }
        else if (tagList.length >= 1000) {
            return `Unable to display tag due to character limit. Please Type \`${this._command_prefix}doujintags ${this._doujin.id}\` to view`;
        }
        return tagList.trim();
    }
    private displayAllTags(msg : Message) {
        var tagList = "";
        var DetailMessageEmbed = null;
        this._doujin.tags.forEach((tag: { name: any; count: any; url: any; }) => {
            tagList += `[[${tag.name} (${tag.count})](https://nhentai.net${tag.url})] `;
            if (tagList.length >= 900) {
                DetailMessageEmbed = new MessageEmbed()
                    .setColor("#FFC0CB")
                    .setTitle(this._doujin.title.english)
                    .addField("Tags(All): ", tagList.trim())
                msg.channel.send(DetailMessageEmbed);
                tagList = "";
            }
        });
        if (tagList != "") {
            DetailMessageEmbed = new MessageEmbed()
                .setColor("#FFC0CB")
                .setTitle(this._doujin.title.english)
                .addField("Tags(All) : ", tagList.trim())
            msg.channel.send(DetailMessageEmbed);
        }
    }
}