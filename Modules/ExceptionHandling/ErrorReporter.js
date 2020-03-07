const Discord = require("discord.js");
exports.ReportErrorToDev = function (client, DevDiscordID, BotExceptionLogChannel, error) {
    
    client.channels.get(BotExceptionLogChannel).send(`<@${DevDiscordID}> whuaaahh! *sniff (T⌓T)`);
    var ExceptionBanner = new Discord.RichEmbed()
    .setColor("#FF0000")
    .setTitle("Hanako Scrape Her Knee (Exception Thrown)")
    .setImage("https://raw.githubusercontent.com/BernabePosadas/OkuhanaHanakov2/master/images/Hanako_Scraped_Knee(Exception).png")
    .addField("Hanako tripped herself and scrape her knee (Ouch!).", `\`\`\`${error.stack || error}\`\`\``, true);
    client.channels.get(BotExceptionLogChannel).send(ExceptionBanner);
}