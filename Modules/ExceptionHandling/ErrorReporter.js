const Discord = require("discord.js");
const attachment = new Discord.Attachment(__dirname  + "/../../images/Hanako_Scraped_Knee(Exception).png", "Hanako_Scraped_Knee(Exception).png");
exports.ReportErrorToDev = function (client, DevDiscordID, BotExceptionLogChannel, error) {
    
    client.channels.get(BotExceptionLogChannel).send(`<@${DevDiscordID}> whuaaahh! *sniff (T⌓T)`);
    var ExceptionBanner = new Discord.RichEmbed()
    .setColor("#FF0000")
    .setTitle("Hanako Encountered an Exception")
    .attachFile(attachment)
    .setImage("attachment://Hanako_Scraped_Knee(Exception).png")
    .addField("Hanako scrape her knee (Exception Thrown)", `\`\`\`${error.stack || error}\`\`\``, true);
    client.channels.get(BotExceptionLogChannel).send(ExceptionBanner);
}