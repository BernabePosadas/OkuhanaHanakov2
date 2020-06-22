import { nHentai } from "../Data_Source/nHentai";
import { Message, RichEmbed } from "discord.js";
import { HanakoSpeech } from "../HanakoSpeech";
import { checkIfR18 } from "../R18ChannelValidator";

export class nHentaiDoujin{
    private _nhentai : nHentai;
    private _doujin : any;
    private _ext : string = "";
    constructor(){
        this._nhentai = new nHentai();
    }
    public async searchAndServeDoujin(msg : Message, tagOnly : boolean){
        if(!checkIfR18(msg)){
            return;
        }
        var code = msg.content.substring(12).toString().trim();
        this._doujin= await this._nhentai.fetchDoujin(code);
        if (this._doujin === undefined) {
            msg.reply(HanakoSpeech.NO_DOUJIN_FOUND_SPEECH);
        }
        if (this._doujin.images.cover.t == "j") this._ext = "jpg";
        else this._ext = "png";
        if (tagOnly) {
            this.displayAllTags(msg);
        }
        else {
            var DetailRichEmbed = new RichEmbed()
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
            msg.channel.send(DetailRichEmbed);
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
            return `Unable to display tag due to character limit. Please Type !doujintags ${this._doujin.id} to view`;
        }
        return tagList.trim();
    }
    private displayAllTags(msg : Message) {
        var tagList = "";
        var DetailRichEmbed = null;
        this._doujin.tags.forEach((tag: { name: any; count: any; url: any; }) => {
            tagList += `[[${tag.name} (${tag.count})](https://nhentai.net${tag.url})] `;
            if (tagList.length >= 900) {
                DetailRichEmbed = new RichEmbed()
                    .setColor("#FFC0CB")
                    .setTitle(this._doujin.title.english)
                    .addField("Tags(All): ", tagList.trim())
                msg.channel.send(DetailRichEmbed);
                tagList = "";
            }
        });
        if (tagList != "") {
            DetailRichEmbed = new RichEmbed()
                .setColor("#FFC0CB")
                .setTitle(this._doujin.title.english)
                .addField("Tags(All) : ", tagList.trim())
            msg.channel.send(DetailRichEmbed);
        }
    }
}