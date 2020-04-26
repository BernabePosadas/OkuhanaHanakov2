var nHentaiAPI = require("./../../APIs/nHentai")
const Discord = require("discord.js")
const GlobalVariables = require("./../../GlobalVariables/GlobalVariables")

exports.nHentaiViewer = class {
    async displayDoujinInfo(message) {
        var code = message.content.substring(12).toString().trim();
        var doujinInfo = await nHentaiAPI.FetchDoujin(code);
        if(!doujinInfo){
            message.reply("sumimasen, I can't find that nuke launch code");
        }
        var ext = "";
        if(doujinInfo.images.cover.t == "j") ext = "jpg"; 
        else ext = "png";
        var DetailRichEmbed  = new Discord.RichEmbed()
            .setColor("#FFC0CB")
            .setTitle(doujinInfo.title.english)
            .setImage(`https://t.nhentai.net/galleries/${doujinInfo.media_id}/cover.${ext}`)
            .addField("Tags: ", this.displayTags(doujinInfo.tags, "tag"))
            .addField("Artist: ", this.displayTags(doujinInfo.tags, "artist"))
            .addField("Group: ", this.displayTags(doujinInfo.tags, "group"))
            .addField("Character: ", this.displayTags(doujinInfo.tags, "character"))
            .addField("Parody: ", this.displayTags(doujinInfo.tags, "parody"))
            .addField("Language: ", this.displayTags(doujinInfo.tags, "language"))
            .addField(`${doujinInfo.images.pages.length} pages`, `[View on nHentai](https://nhentai.net/g/${doujinInfo.id})`, true);
        message.channel.send(DetailRichEmbed);
    }
    displayTags(tags, tagType){
        var tagList = "";
        tags.forEach(tag => {
            if(tag.type == tagType){
                tagList += `[[${tag.name} (${tag.count})](https://nhentai.net${tag.url})] `;
            }
        });
        if(tagList === ""){
            return "none";
        }
        return tagList.trim();
    }
}