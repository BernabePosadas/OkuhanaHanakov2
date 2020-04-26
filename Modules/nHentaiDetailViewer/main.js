var nHentaiAPI = require("./../../APIs/nHentai")
const Discord = require("discord.js")
const GlobalVariables = require("./../../GlobalVariables/GlobalVariables")

exports.nHentaiViewer = class {
    async displayDoujinInfo(message, tagOnly) {
        var code = message.content.substring(12).toString().trim();
        this.doujinInfo = await nHentaiAPI.FetchDoujin(code);
        if (!this.doujinInfo) {
            message.reply("sumimasen, I can't find that nuke launch code");
        }
        if (this.doujinInfo.images.cover.t == "j") this.ext = "jpg";
        else this.ext = "png";
        if (tagOnly) {
            this.displayAllTags(message);
        }
        else {
            var DetailRichEmbed = new Discord.RichEmbed()
                .setColor("#FFC0CB")
                .setTitle(this.doujinInfo.title.english)
                .setImage(`https://t.nhentai.net/galleries/${this.doujinInfo.media_id}/cover.${this.ext}`)
                .addField("Tags: ", this.displayTags("tag"))
                .addField("Artist: ", this.displayTags("artist"))
                .addField("Group: ", this.displayTags("group"))
                .addField("Character: ", this.displayTags("character"))
                .addField("Parody: ", this.displayTags("parody"))
                .addField("Language: ", this.displayTags("language"))
                .addField(`${this.doujinInfo.images.pages.length} pages`, `[View on nHentai](https://nhentai.net/g/${this.doujinInfo.id})`, true);
            message.channel.send(DetailRichEmbed);
        }
    }
    displayTags(tagType) {
        var tagList = "";
        this.doujinInfo.tags.forEach(tag => {
            if (tag.type == tagType) {
                tagList += `[[${tag.name} (${tag.count})](https://nhentai.net${tag.url})] `;
            }
        });
        if (tagList === "") {
            return "none";
        }
        else if (tagList.length >= 1000) {
            return "Unable to display tag due to character limit. Please Type !doujintags <code> to view";
        }
        return tagList.trim();
    }
    displayAllTags(message) {
        var tagList = "";
        var DetailRichEmbed = null;
        this.doujinInfo.tags.forEach(tag => {
            tagList += `[[${tag.name} (${tag.count})](https://nhentai.net${tag.url})] `;
            if (tagList.length >= 900) {
                DetailRichEmbed = new Discord.RichEmbed()
                    .setColor("#FFC0CB")
                    .setTitle(this.doujinInfo.title.english)
                    .addField("Tags(All): ", tagList.trim())
                message.channel.send(DetailRichEmbed);
                tagList = "";
            }
        });
        if (tagList != "") {
            DetailRichEmbed = new Discord.RichEmbed()
                .setColor("#FFC0CB")
                .setTitle(this.doujinInfo.title.english)
                .addField("Tags(All) : ", tagList.trim())
            message.channel.send(DetailRichEmbed);
        }
    }
}