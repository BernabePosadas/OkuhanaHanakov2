var nHentaiAPI = require('./../../APIs/nHentai')
const Discord = require('discord.js')
const GlobalVariables = require('./../../GlobalVariables/GlobalVariables')

exports.nHentaiViewer = class {
    async displayDoujinInfo(message) {
        var code = message.content.substring(12).toString().trim();
        var doujinInfo = await nHentaiAPI.FetchDoujin(code)
        if(!doujinInfo){
            message.reply("sumimasen, I can't find that nuke launch code")
        }
        console.log(doujinInfo)
        var ext = ""
        if(doujinInfo.images.cover.t == "j") ext = "jpg" 
        else ext = "png"
        var DetailRichEmbed  = new Discord.RichEmbed()
            .setColor('#FFC0CB')
            .setTitle(doujinInfo.title.english)
            .setImage(`https://t.nhentai.net/galleries/${doujinInfo.media_id}/cover.${ext}`)
            .addField(`${doujinInfo.images.pages.length} pages`, `[View on nHentai](https://nhentai.net/g/${doujinInfo.id})`, true)
        message.channel.send(DetailRichEmbed)
    }
}