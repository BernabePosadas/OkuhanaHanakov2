//region Libraries and Modules
const Discord = require("discord.js");
var ArrowGenerator = require("./Modules/DanbooruImageRandomizer/ArrowPoolDeckGenerator");
const PixivApi = require("pixiv-api-client");
const DanbooruImageRandomizer = require("./Modules/DanbooruImageRandomizer/main");
const MusicPlayer = require("./Modules/Music/main");
const GlobalVariables = require("./GlobalVariables/GlobalVariables");
const ErrorReporter = require("./Modules/ExceptionHandling/ErrorReporter");
const nHentai = require("./Modules/nHentaiDetailViewer/main");
const serverQueueList = new Map();
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
//endRegion

//region attributes
const client = new Discord.Client();
const BotExceptionLogChannel = "684382771069845598";   // ID to our  bot exception log channel 
const prefix = "!";
const maintenance = false;
const pixiv = new PixivApi();
var HanakoArrows = null;
var YTPlayer = null;
var nHentaiDoujinViewer = null;
//endregion



//region bot function area
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    setDefaultActivity();
    Decks = [
        ArrowGenerator.createBernabeDeck(),
        ArrowGenerator.createMarkDeck(),
        ArrowGenerator.createIvanDeck()
    ]
    HanakoArrows = new DanbooruImageRandomizer.HanakoArrows(client, Decks);
    nHentaiDoujinViewer = new nHentai.nHentaiViewer();
    /* pixiv basic search 
    const word = "クレセント(アズールレーン)";
    var returnobj = pixiv.login("user_tupx2577", process.env.PixivPassword).then(() => {
        return pixiv.searchIllust(word).then(json => {
            console.log(json);
            return pixiv.requestUrl(json.next_url);
        }).then(json => {
            console.log(json); //next results
        });
    });
    console.log(returnobj)
    */
})
client.once("reconnecting", () => {
    console.log("Reconnecting!");
});

client.on("disconnect", () => {
    console.log("Disconnect!");
});

client.on("message", async msg => {
    try {
        if (!msg.content.startsWith(prefix) || msg.author.bot) {
            return;
        }
        else if (msg.author.id != parseInt(GlobalVariables.DiscordIDs.BernabeDiscordID) && maintenance) {
            msg.reply("Sumimasen, Im currently on training with my master");
        }
        const args = msg.content.slice(prefix.length).split(/ +/)
        const command = args.shift().toLowerCase();
        switch (command) {
            case "killmark":
                if (validateAllowedShootingChannel(msg)) {
                    await HanakoArrows.KillMark(msg);
                }
                break;
            case "killmaster":
                if (validateAllowedShootingChannel(msg)) {
                    await HanakoArrows.KillBernabe(msg);
                }
                break;
            case "killivan":
                if (validateAllowedShootingChannel(msg)) {
                    await HanakoArrows.KillIvan(msg);
                }
                break;
            case "omakaseshot":
                if (validateAllowedShootingChannel(msg)) {
                    await HanakoArrows.ShootSomeoneRandomly(msg)
                }
                break;
            case "play":
                YTPlayer = getYTPlayerInstance(msg.guild.id);
                YTPlayer.start(msg);
                break;
            case "skip":
                YTPlayer = getYTPlayerInstance(msg.guild.id);
                YTPlayer.skip(msg);
                break;
            case "stop":
                YTPlayer = getYTPlayerInstance(msg.guild.id);
                YTPlayer.stop(msg);
                break;
            case "pause":
                YTPlayer = getYTPlayerInstance(msg.guild.id);
                YTPlayer.pauseSong(msg);
                break;
            case "resume":
                YTPlayer = getYTPlayerInstance(msg.guild.id);
                YTPlayer.resume(msg);
                break;
            case "launchnuke":
                if (validateIfR18Channel(msg)) {
                    await nHentaiDoujinViewer.displayDoujinInfo(msg);
                }
                break;
            case "togglerepeat":
                YTPlayer = getYTPlayerInstance(msg.guild.id);
                YTPlayer.setRepeat(msg);
                break;
            case "help":
                viewAvailCommands(msg);
                break;
            default:
                msg.reply("Ano.. sumimasen, I did not catch your command. Is there something you like to request?");
                break;
        }
    } catch (exception) {
        msg.reply("Sumimasen, Sumimasen. I'm unable to perform your requested command. I let my master know what is wrong. Please forgive me (T⌓T).");
        ErrorReporter.ReportErrorToDev(client, GlobalVariables.DiscordIDs.BernabeDiscordID, BotExceptionLogChannel, exception);
    }

})

//region validations
function validateAllowedShootingChannel(msg) {
    if (msg.channel.id != 677361288246198292 && msg.channel.id != 677361065327067136 && msg.guild.id === "677136815894822922") {
        msg.reply("Ano.. sumimasen, I cant shoot someone from this channel please go to <#677361288246198292>. Thank you. ");
        return false;
    }
    else if (msg.guild.id != 677136815894822922) {
        msg.reply("Ano.. sumimasen, The command you requested is only available to the weeb server master created.");
        return false;
    }
    return true;
}
function validateIfR18Channel(msg) {
    if (msg.channel.nsfw) {
        return true;
    }
    msg.reply("Sumimasen. I cant serve R18 connect on SFW channels. Please go to any NSFW marked text channel and request again. Thank you (^-^).");
    return false;
}
//endregion

//region function area 
function getYTPlayerInstance(id) {
    if (!serverQueueList.get(id)) {
        serverQueueList.set(id, new MusicPlayer.YTMusicPlayer());
    }
    return serverQueueList.get(id);
}
function viewAvailCommands(msg) {
    var TheGulagAdditionalCommands = "";
    var HelpBanner = new Discord.RichEmbed()
        .setColor("#0055ff")
        .setTitle("Okuhana Hanako")
        .setAuthor("Okuhana Hanako", "https://raw.githubusercontent.com/BernabePosadas/OkuhanaHanakov2/master/images/okuhana_hanako.png", "https://github.com/BernabePosadas/OkuhanaHanakov2")
        .setDescription(`A Discord Bot that my master [Bernabe Posadas Jr.](https://github.com/BernabePosadas) created for practicing coding in node and exploring discord js API.`);
    msg.channel.send(HelpBanner);
    if (msg.guild.id === "677136815894822922") {
        createMyCapabilities("Danbooru/Safebooru Random Image Fetcher", `\`!killmark\` shoots <@${GlobalVariables.DiscordIDs.MarkDiscordID}>\n \`!killivan\` shoots <@${GlobalVariables.DiscordIDs.IvanDiscordID}>\n \`!killmaster\` shoots <@${GlobalVariables.DiscordIDs.BernabeDiscordID}>`, msg);
    }
    createMyCapabilities("YouTube Music Player", `\`!play <title>\` plays a song from YouTube. Alternatively you can put the URL on \`<title>\`\n\`!skip\` skips a song\n\`!stop\` stop and wipes all song in queue\n\`!pause\` pause the current song\n\`!resume\` resume paused song\n\`!togglerepeat\` toggles current song repeat status`, msg);
    createMyCapabilities("Nutaku Nuke Launcher", `\`!launchnuke <code>\` finds a nutaku doujin with the id \`<code>\``, msg);
}
function createMyCapabilities(header, content, msg){
    HelpBanner = new Discord.RichEmbed()
    .setColor("#0055ff")
    .setTitle("My Capabilities")
    .setAuthor("Okuhana Hanako", "https://raw.githubusercontent.com/BernabePosadas/OkuhanaHanakov2/master/images/okuhana_hanako.png", "https://github.com/BernabePosadas/OkuhanaHanakov2")
    .addField(header, content, true)
    msg.channel.send(HelpBanner);
}
//endregion
//region bot activity
function setDefaultActivity() {
    setActivity("with Okuhana Aiko", "PLAYING");
}

function setActivity(display, activity_type) {
    client.user.setActivity(display, { type: activity_type });
}
//endregion

client.login(process.env.token);
//endregion


