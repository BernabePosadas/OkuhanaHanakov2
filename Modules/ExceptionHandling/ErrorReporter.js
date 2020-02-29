exports.ReportErrorToDev = function (client, DevDiscordID, BotExceptionLogChannel, error) {
    client.channels.get(BotExceptionLogChannel).send(`<@${DevDiscordID}> whuaaahh! *sniff (T⌓T)\n\`\`\`Hanako scrape her knee (Exception Thrown): \n\n${error.stack || error}\`\`\``);
}