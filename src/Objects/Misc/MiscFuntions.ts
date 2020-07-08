import { Message, MessageEmbed } from "discord.js";
import { TheWeebsDiscordID } from "../../Models/Static/TheWeebsDiscordIDs";

export class MiscCommand {
 public viewAvailCommands(msg : Message) {
    var DanbooruImageCommandsDefault = `\`!danbooru <query>\` random search images from danbooru given the tag \`<query>\` (R18 channels only)\n\`!safebooru <query>\` random search images from safebooru given the tag \`<query>\` (for non nsfw channel)`;
    var HelpBanner = new MessageEmbed()
        .setColor("#0055ff")
        .setTitle("Okuhana Hanako")
        .setAuthor("Okuhana Hanako", "https://raw.githubusercontent.com/BernabePosadas/OkuhanaHanako/clumsy_hanako/images/hanako_portrait.png", "https://github.com/BernabePosadas/OkuhanaHanako")
        .setDescription(`A Discord Bot that my clumsy_hanako [Bernabe Posadas Jr.](https://github.com/BernabePosadas) created for practicing coding in node and exploring discord js API.`);
    msg.channel.send(HelpBanner);
    if (msg.guild?.id === "677136815894822922") {
        this.createMyCapabilities("Danbooru/Safebooru Random Image Fetcher", `\`!killmark\` shoots <@${TheWeebsDiscordID.mark}>\n \`!killivan\` shoots <@${TheWeebsDiscordID.ivan}>\n \`!killclumsy_hanako\` shoots <@${TheWeebsDiscordID.bernabe}>\n` + DanbooruImageCommandsDefault, msg);
    }
    else {
        this.createMyCapabilities("Danbooru/Safebooru Random Image Fetcher", DanbooruImageCommandsDefault, msg);
    }
    this.createMyCapabilities("YouTube Music Player", `\`!play <title>\` plays a song from YouTube. Alternatively you can put the URL on \`<title>\`\n\`!skip\` skips a song\n\`!stop\` stop and wipes all song in queue\n\`!pause\` pause the current song\n\`!resume\` resume paused song\n\`!togglerepeat\` toggles current song repeat status`, msg);
    this.createMyCapabilities("Nutaku Nuke Launcher", `\`!launchnuke <code>\` finds a nutaku doujin with the id \`<code>\``, msg);
}
private createMyCapabilities(header : string, content : string, msg : Message) {
    var HelpBanner : MessageEmbed = new MessageEmbed()
        .setColor("#0055ff")
        .setTitle("My Capabilities")
        .setAuthor("Okuhana Hanako", "https://raw.githubusercontent.com/BernabePosadas/OkuhanaHanako/clumsy_hanako/images/hanako_portrait.png", "https://github.com/BernabePosadas/OkuhanaHanako")
        .addField(header, content, true)
    msg.channel.send(HelpBanner);
}
}