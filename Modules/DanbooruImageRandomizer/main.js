var danbooru = require("./../../APIs/danbooru");
var Randomizer = require("./Randomizer");
const GlobalVariables = require("./../../GlobalVariables/GlobalVariables");

exports.HanakoArrows = class {
    constructor(client, Decks){
        this.BernabeDeck = Decks[0];
        this.MarkDeck = Decks[1];
        this.IvanDeck = Decks[2];
        this.congrats = client.emojis.find(emoji => emoji.name === "congratulations");
        this.confetti = client.emojis.find(emoji => emoji.name === "confetti_ball");
    }
    async KillMark(msg) {
            var candidate = Randomizer.RandomGet(this.MarkDeck)
            var response = await danbooru.RandomShoot(candidate);
            msg.channel.send(`<\@${GlobalVariables.DiscordIDs.MarkDiscordID}> ` + Randomizer.RandomSpeechReplies());
            msg.channel.send(response);
    }

    async KillBernabe(msg) {
        var candidate = Randomizer.RandomGet(this.BernabeDeck);
        switch (candidate) {
            case "":
                msg.channel.send("Whaaah!!! I cant find my arrows (T⌓T)");
                if (msg.author.id != GlobalVariables.DiscordIDs.BernabeDiscordID) {
                    msg.reply(`${this.confetti} ${this.confetti} ${this.congrats} Omedetou!. You just trigger a 0.5% chance of me saying this when shooting master eheheh (^-^).`);
                }
                else {
                    msg.reply("Zannen master. your chance of getting a 6* Flower Knight was wasted on me (^-^)");
                }
                break;
            default:
                var response = await danbooru.RandomShoot(candidate);
                msg.channel.send(`<\@${GlobalVariables.DiscordIDs.BernabeDiscordID}> ` + Randomizer.RandomSpeechReplies());
                msg.channel.send(response);
                break;
        }
    }

    async KillIvan(msg) {
        var candidate = Randomizer.RandomGet(this.IvanDeck);
        var response = await danbooru.RandomShoot(candidate);
        msg.channel.send(`<\@${GlobalVariables.DiscordIDs.IvanDiscordID}> ` + Randomizer.RandomSpeechReplies());
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
            default:
                msg.channel.send("ehehe (^-^) \n> ***Decided to shoot the 3 of us as she cant decide which to shoot***");
                await this.KillMark(msg);
                await this.KillIvan(msg);
                await this.KillBernabe(msg);
                break;
        }
    }
}