import { IMusicControl } from "../../Models/Interfaces/IMusicPlayerControl";
import { Message, VoiceChannel, Permissions, VoiceConnection, RichEmbed } from "discord.js";
import { IMusicPlayer } from "../../Models/Interfaces/IMusicPlayer";
import { HanakoSpeech } from "../HanakoSpeech";
import { isYTURL } from "../YoutubeURLValidator";
import { YoutubeDataAPI } from "../Data_Source/YoutubeDataAPI";
import ytdl from "ytdl-core";
import { MusicPlayer } from "./MusicPlayer";
import { MusicPlayItem } from "../../Models/Interfaces/MusicPlayItem";
import { MusicPlayerStatus } from "../../Models/Static/MusicPlayerStatus";

export class MusicPlayerControl implements IMusicControl {
    public _player_instance: Map<string, import("../../Models/Interfaces/IMusicPlayer").IMusicPlayer>;
    public _youtube_data_api: YoutubeDataAPI;
    constructor() {
        this._youtube_data_api = new YoutubeDataAPI();
        this._player_instance = new Map<string, IMusicPlayer>();
    }
    public async addToQueue(msg: Message): Promise<void> {
        var args: string = msg.content.substring(6).toString().trim();
        const voiceChannel: VoiceChannel = msg.member.voiceChannel;
        if (voiceChannel === undefined) {
            msg.reply(HanakoSpeech.NOT_IN_VOICE_CHANNEL);
            return;
        }
        const permissions: Permissions | null = voiceChannel.permissionsFor(msg.client.user);
        if (permissions === null) {
            throw new Error("variable `permission` is null").stack;
        }
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            msg.reply(HanakoSpeech.NO_PERMISSION_ON_VOICE_CHANNEL);
            return;
        }
        if (this.checkForExistingPlayerInstance(msg.guild.id)) {
            var connection: VoiceConnection = await voiceChannel.join().then(connection => {
                console.log("Successfully connected to voice channel.");
                return connection
            }).catch(e => {
                throw e
            });
            var player: IMusicPlayer = new MusicPlayer(connection);
            this.createNewPlayerInstance(connection, msg.guild.id);

        }
        if (isYTURL(args)) {
            this._youtube_data_api.searchFirstVideo(args);
        }
        var song_info = await ytdl.getInfo(args);
        var play_item: MusicPlayItem = {
            title: song_info.title,
            youtube_link: song_info.video_url,
            thumbnail: song_info.player_response.videoDetails.thumbnail.thumbnails[song_info.player_response.videoDetails.thumbnail.thumbnails.length - 1].url,
            requested_by: msg.member.id,
            anounce_message: undefined,
            queued: false
        };
        var player_instance: IMusicPlayer | undefined = this._player_instance.get(msg.guild.id);
        if (player_instance !== undefined) {
            if (player_instance._player_status === MusicPlayerStatus.IDLE) {
                player_instance.addToQueue(this.setPlayItemBanner("#0099FF", "Now Playing " +this.checkIfRepeatIsOn(player_instance), play_item, msg));
                player_instance.addToQueue(play_item);
                player_instance.playSong();
                while (player_instance._player_status !== MusicPlayerStatus.IDLE) {
                    if (player_instance._player_status == MusicPlayerStatus.READY) {
                        if (player_instance._override_action === "" && player_instance._repeat) {
                            if (!player_instance.skipSong()) {
                                this._player_instance.delete(msg.guild.id);
                                break;
                            }
                        }
                        if(player_instance._now_playing !== undefined){
                            this.setPlayItemBanner("#0099FF", "Now Playing " +this.checkIfRepeatIsOn(player_instance), player_instance._now_playing._song_data, msg);
                            player_instance.playSong();
                        }
                        else{
                            break;
                        }
                    }
                }
            }
            else {
                play_item.queued = true;
                player_instance.addToQueue(this.setPlayItemBanner("#000000", "Queued", play_item, msg));
            }
        }
        else {
            throw new Error("player_instance is undefined").stack;
        }


    }
    skip(msg: Message): void {
        throw new Error("Method not implemented.");
    }
    stop(msg: Message): void {
        throw new Error("Method not implemented.");
    }
    pause(msg: Message): void {
        throw new Error("Method not implemented.");
    }
    resume(msg: Message): void {
        throw new Error("Method not implemented.");
    }
    back(msg: Message): void {
        throw new Error("Method not implemented.");
    }
    private checkForExistingPlayerInstance(server_id: string): boolean {
        return this._player_instance.get(server_id) === undefined;
    }
    private createNewPlayerInstance(voice_channel: VoiceConnection, server_id: string) {
        this._player_instance.set(server_id, new MusicPlayer(voice_channel));
    }
    private setPlayItemBanner(color: string, title: string, play_item: MusicPlayItem, msg : Message): MusicPlayItem {
        var songInfoBanner = new RichEmbed()
            .setColor("#000000")
            .setTitle("Queued")
            .setImage(play_item.thumbnail)
            .addField(`[${play_item.title}]`, `[View on YouTube](${play_item.youtube_link})`, true);
             msg.channel.send(songInfoBanner).then((msg) => {
            play_item.anounce_message = msg;
        });
        return play_item;
    }
    private checkIfRepeatIsOn(player_instance : IMusicPlayer) : string{
        if(player_instance._repeat){
           return "(repeat on)";
        }
        return "(repeat off)";
    }

}