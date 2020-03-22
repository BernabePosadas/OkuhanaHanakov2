var danbooru = require("./../../APIs/danbooru");
var Randomizer = require("./Randomizer");
const GlobalVariables = require("./../../GlobalVariables/GlobalVariables");

exports.HanakoArrows = class {
    constructor(client, Decks) {
        this.BernabeDeck = Decks[0];
        this.MarkDeck = Decks[1];
        this.IvanDeck = Decks[2];
    }
    async KillMark(msg) {
        var candidate = Randomizer.RandomGet(this.MarkDeck)
        var response = await danbooru.fetchRandomImage_Arrows(candidate);
        msg.channel.send(`<\@${GlobalVariables.DiscordIDs.MarkDiscordID}> ` + Randomizer.RandomSpeechReplies());
        msg.channel.send(response);
    }
    async KillBernabe(msg) {
        var candidate = Randomizer.RandomGet(this.BernabeDeck);
        var response = await danbooru.fetchRandomImage_Arrows(candidate);
        msg.channel.send(`<\@${GlobalVariables.DiscordIDs.BernabeDiscordID}> ` + Randomizer.RandomSpeechReplies());
        msg.channel.send(response);
    }

    async KillIvan(msg) {
        var candidate = Randomizer.RandomGet(this.IvanDeck);
        var response = await danbooru.fetchRandomImage_Arrows(candidate);
        msg.channel.send(`<\@${GlobalVariables.DiscordIDs.IvanDiscordID}> ` + Randomizer.RandomSpeechReplies());
        msg.channel.send(response);
    }
    async shootChinoArrow(msg) {
        var response = await danbooru.fetchRandomImage_Arrows("kafuu_chino");
        msg.channel.send("Ougi!. Chino Shot!!");
        msg.channel.send(response);
    }
    async searchRandomImage(msg, searchFrom) {
        const args = msg.content.slice("!".length).split(/ +/);
        args.shift();
        if (args.length > 2) {
            msg.reply("Sumimasen. I can`t search with query having more than 2 tags");
            return;
        }
        var response = await danbooru.fetchRandomImage(args[0] + " " + args[1], searchFrom);
        if (response === "no data") {
            var reply  = "Sumimasen. I find no image matching with tags" 
            args.forEach(element => {
                reply = reply + ` \`${element}\` `;
            });
            msg.reply(reply);
            return;

        }
        msg.channel.send(response);
    }
    async ShootSomeoneRandomly(msg) {
        msg.channel.send("omakase! (^-^) \n> ***Picks Target***");
        var result = Randomizer.RandomSurpriseShoot();
        switch (result) {
            case "mark":
                await this.KillMark(msg);
                break;
            case "ivan":
                await this.KillIvan(msg);
                break;
            case "me":
                await this.KillBernabe(msg);
                break;
            case "chino":
                msg.channel.send(">***Began charging her arrow***");
                await this.shootChinoArrow(msg);
                break;
            default:
                msg.channel.send("ehehe (^-^) \n> ***Decided to shoot the 3 of us as she cant decide which to shoot***");
                await this.KillMark(msg);
                await this.KillIvan(msg);
                await this.KillBernabe(msg);
                break;
        }
    }
}