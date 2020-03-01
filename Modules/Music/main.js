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
            await this.play(message);
        } else {
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
        }
    }

    skip(message) {
        if (!message.member.voiceChannel) {
            message.reply("Ano.. you not on any voice channel. Please join a voice channel to skip the music.");
        }
        if (!this.LastPlayed) {
            message.reply("Ano.. sumimasen, there no song I can skip right now. please check if there is a song in queue");
        }
        if(this.connection.dispatcher){
            this.connection.dispatcher.end();
        }
        else{
            this.LastPlayed = this.LastPlayed.next;
        }
    }

    stop(message) {
        if (!message.member.voiceChannel) {
            message.reply("Ano.. you not on any voice channel. Please join a voice channel to stop the music.");
            return
        }
        else if(!this.LastPlayed){
            message.reply("Ano.. sumimasen, the queue list is empty");
            return
        }
        this.connection.dispatcher.end();
        this.reset();
    }
    pauseSong(message) {
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
        else{
            message.reply("Ano.. sumimasen, there no song I can pause right now. please check if there is a song in playing to pause");
        }
    }
    resume(message){
        if (this.paused && this.LastPlayed) {
            this.LastPlayed.song_data.message_to_delete.delete();
            var songInfoBanner = new Discord.RichEmbed()
                .setColor("#0099FF")
                .setTitle("Now Playing")
                .setImage(this.LastPlayed.song_data.thumbnail)
                .addField(`[${this.LastPlayed.song_data.title}]`, `[View on YouTube](${this.LastPlayed.song_data.url})`, true);
            message.channel.send(songInfoBanner).then(msg => {
                this.LastPlayed.song_data.message_to_delete = msg;
            })
            this.connection.dispatcher.resume();
            this.paused = false;
        }
        else{
            message.reply("Ano.. sumimasen, there no song I can resume right now. please check if there is a paused song");
        }
    }
    async play(message) {
        try{
        if (this.LastPlayed.song_data.onQueue) {
            this.LastPlayed.song_data.on_queue_message.delete();
        }
        var songInfoBanner = new Discord.RichEmbed()
            .setColor("#0099FF")
            .setTitle("Now Playing")
            .setImage(this.LastPlayed.song_data.thumbnail)
            .addField(`[${this.LastPlayed.song_data.title}]`, `[View on YouTube](${this.LastPlayed.song_data.url})`, true);
        await message.channel.send(songInfoBanner).then(msg => {
            this.LastPlayed.song_data.message_to_delete = msg;
        })
        this.connection.playStream(await ytdl(this.LastPlayed.song_data.url, { filter : "audioonly" }), {bitrate : "auto", passes : 5})
            .on("end", async () => {
                console.log("Music ended!");
                if (this.LastPlayed.next) {
                    this.LastPlayed.song_data.message_to_delete.delete();
                    this.LastPlayed = this.LastPlayed.next;
                    await this.play(message);
                }
                else {
                    this.LastPlayed.song_data.message_to_delete.delete();
                    this.voiceChannel.leave();
                    this.reset();
                }
            })
            .on("error", error => {
                throw error;
            });
        }catch(err){
            this.LastPlayed.song_data.message_to_delete.delete();
            this.voiceChannel.leave();
            this.reset();
            throw err;
        }
    }
    removeQueueLogs(){
        while(this.LastPlayed.next){
            this.LastPlayed = this.LastPlayed.next;
            this.LastPlayed.song_data.on_queue_message.delete();
        }
    }
}

