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
            .addField("Tags: ", this.displayTags(doujinInfo.tags), true)
            .addField("Artist: ", this.displayArtist(doujinInfo.tags), true)
            .addField(`${doujinInfo.images.pages.length} pages`, `[View on nHentai](https://nhentai.net/g/${doujinInfo.id})`, true);
        message.channel.send(DetailRichEmbed);
    }
    displayTags(tags){
        var tagList = "";
        tags.forEach(tag => {
            if(tag.type == "tag"){
                tagList += `[${tag.name} (${tag.count})](https://nhentai.net/${tag.url}) `;
            }
        });
        return tagList.trim();
    }
    displayArtist(doujinInfo){
        var tagList = "";
        tags.forEach(tag => {
            if(tag.type == "artist"){
                tagList += `[${tag.name} (${tag.count})](https://nhentai.net/${tag.url}) `;
            }
        });
        return tagList.trim();
    }
}