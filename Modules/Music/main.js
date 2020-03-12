const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const validator = require("./validator");
const { QueueList } = require("./QueueList");
var YoutubeAPI = require("./../../APIs/YTSearchApi");

exports.YTMusicPlayer = class {
    constructor() {
        this.reset();
    }
    reset() {
        this.LastPlayed = null;
        this.voiceChannel = null;
        this.paused = false;
        this.connection = null;
        this.repeat = false;
        this.skipSong = false;
    }
    async start(message) {
        var args = message.content.substring(6).toString().trim();
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) {
            message.reply("Ano.. you not on any voice channel. Please join a voice channel.");
            return;
        }
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            message.reply("(>_<) I cant join your current voice channel. Please give permission (T⌓T)");
            return;
        }
        if (validator.isNotURL(args)) {
            args = await YoutubeAPI.queryYoutube(args);
        }
        var songInfo = await ytdl.getInfo(args);
        const song = {
            title: songInfo.title,
            url: songInfo.video_url,
            thumbnail: songInfo.player_response.videoDetails.thumbnail.thumbnails[songInfo.player_response.videoDetails.thumbnail.thumbnails.length - 1].url,
            message_to_delete: null,
            on_queue_message: null,
            onQueue: false
        };
        if (!this.LastPlayed) {
            this.LastPlayed = new QueueList(null, song)
            this.voiceChannel = voiceChannel
            var connection = await voiceChannel.join().then(connection => {
                console.log("Successfully connected to voice channel.");
                return connection
            }).catch(e => {
                throw e
            });
            this.connection = connection;
            this.play(message);
        } else {
            if (this.validateSameVoiceChannel(voiceChannel)) {
                song.onQueue = true
                var songInfoBanner = new Discord.RichEmbed()
                    .setColor("#000000")
                    .setTitle("Queued")
                    .setImage(song.thumbnail)
                    .addField(`[${song.title}]`, `[View on YouTube](${song.url})`, true);
                message.channel.send(songInfoBanner).then(msg => {
                    song.on_queue_message = msg;
                    song.onQueue = true;
                });
                this.LastPlayed.setNextQueue(song);
            } else {
                message.reply("Sumimasen, i cant join 2 different voice channel at once");
            }
        }
    }
    skip(message) {
        if (!this.validatePlayerControlFunction(message)) {
            return
        }
        if (this.validateSameVoiceChannel(message.member.voiceChannel)) {
            this.skipSong = true;
            if (this.connection.dispatcher) {
                this.connection.dispatcher.end();
            } else {
                this.LastPlayed = this.LastPlayed.next;
            }
        }
        else {
            message.reply("Ano.. sumimasen, you are not joined in the voice channel I'm currently playing music. Please go to that voice channel and request again. Thank you (^-^)");
        }
    }

    stop(message) {
        if (!this.validatePlayerControlFunction(message)) {
            return
        }
        if (this.validateSameVoiceChannel(message.member.voiceChannel)) {
            this.repeat = false;
            this.connection.dispatcher.end();
            this.reset();
        }
        else {
            message.reply("Ano.. sumimasen, you are not joined in the voice channel I'm currently playing music. Please go to that voice channel and request again. Thank you (^-^)");
        }
    }
    pauseSong(message) {
        if (!this.validatePlayerControlFunction(message)) {
            return
        }
        if (this.validateSameVoiceChannel(message.member.voiceChannel)) {
            if (!(this.paused) && this.LastPlayed) {
                this.LastPlayed.song_data.message_to_delete.delete();
                var songInfoBanner = new Discord.RichEmbed()
                    .setColor("#0099FF")
                    .setTitle("Paused")
                    .setImage(this.LastPlayed.song_data.thumbnail)
                    .addField(`[${this.LastPlayed.song_data.title}]`, `[View on YouTube](${this.LastPlayed.song_data.url})`, true);
                message.channel.send(songInfoBanner).then(msg => {
                    this.LastPlayed.song_data.message_to_delete = msg;
                })
                this.connection.dispatcher.pause();
                this.paused = true;
            }
            else {
                message.reply("Ano.. sumimasen, there no song I can pause right now. please check if there is a song in playing to pause");
            }
        } else {
            message.reply("Ano.. sumimasen, you are not joined in the voice channel I'm currently playing music. Please go to that voice channel and request again. Thank you (^-^)");
        }
    }
    resume(message) {
        if (!this.validatePlayerControlFunction(message)) {
            return
        }
        if (this.validateSameVoiceChannel(message.member.voiceChannel)) {
            if (this.paused && this.LastPlayed) {
                this.LastPlayed.song_data.message_to_delete.delete();
                this.setNowPlayingTitle(message);
                this.connection.dispatcher.resume();
                this.paused = false;
            }
            else {
                message.reply("Ano.. sumimasen, there no song I can resume right now. please check if there is a paused song");
            }
        } else {
            message.reply("Ano.. sumimasen, you are not joined in the voice channel I'm currently joined. Please go to that voice channel and request again. Thank you (^-^)");
        }
    }
    setRepeat(message) {
        if (!this.validatePlayerControlFunction(message)) {
            return
        }
        if (this.validateSameVoiceChannel(message.member.voiceChannel)) {
            if (this.repeat && this.LastPlayed) {
                this.repeat = false;
                this.LastPlayed.song_data.message_to_delete.delete();
                this.setNowPlayingTitle(message);
                return;
            }
            else if (!this.LastPlayed) {
                message.reply("Sumimasen, there is no song that I can set to repeat");
                return;
            }
            this.repeat = true;
            this.LastPlayed.song_data.message_to_delete.delete();
            this.setNowPlayingTitle(message);
        }
        else {
            message.reply("Ano.. sumimasen, you are not joined in the voice channel I'm currently playing music. Please go to that voice channel and request again. Thank you (^-^)");
        }
    }
    play(message) {
        try {
            if (this.LastPlayed.song_data.onQueue) {
                this.LastPlayed.song_data.on_queue_message.delete();
            }
            this.setNowPlayingTitle(message);
            this.connection.playStream(ytdl(this.LastPlayed.song_data.url, { filter: "audioonly" }), { bitrate: "auto" })
                .on("end", () => {
                    console.log("Music ended!");
                    this.LastPlayed.song_data.message_to_delete.delete();
                    if (this.repeat) {
                        if(this.skipSong){
                            if (this.LastPlayed.next){
                                this.LastPlayed = this.LastPlayed.next;
                            }
                            else{
                                this.endPlayer();
                                return;
                            }
                        }
                        this.play(message);
                    }
                    else if (this.LastPlayed.next) {
                        this.LastPlayed = this.LastPlayed.next;
                        this.play(message);
                    }
                    else {
                        this.endPlayer();
                    }

                })
                .on("error", error => {
                    throw error;
                });
        } catch (err) {
            this.endPlayer();
            throw err;
        }
    }
    endPlayer() {
        this.LastPlayed.song_data.message_to_delete.delete();
        this.voiceChannel.leave();
        this.reset();
    }
    removeQueueLogs() {
        while (this.LastPlayed.next) {
            this.LastPlayed = this.LastPlayed.next;
            this.LastPlayed.song_data.on_queue_message.delete();
        }
    }
    validateSameVoiceChannel(voiceChannel) {
        if (this.voiceChannel === voiceChannel) {
            return true;
        }
        return false;
    }
    setNowPlayingTitle(message) {
        var repeated = "(repeat off)";
        if (this.repeat) {
            repeated = "(repeat on)";
        }
        var songInfoBanner = new Discord.RichEmbed()
            .setColor("#0099FF")
            .setTitle("Now Playing " + repeated)
            .setImage(this.LastPlayed.song_data.thumbnail)
            .addField(`[${this.LastPlayed.song_data.title}]`, `[View on YouTube](${this.LastPlayed.song_data.url})`, true);
        message.channel.send(songInfoBanner).then(msg => {
            this.LastPlayed.song_data.message_to_delete = msg;
        })
    }
    validatePlayerControlFunction(message) {
        if (!message.member.voiceChannel) {
            message.reply("Ano.. you not on any voice channel. Please join a voice channel to stop the music.");
            return false;
        }
        if (!this.LastPlayed) {
            message.reply("Ano.. sumimasen, the queue list is empty");
            return false;
        }
        return true;

    }
}

