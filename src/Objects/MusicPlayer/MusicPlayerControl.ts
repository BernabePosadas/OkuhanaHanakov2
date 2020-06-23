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
import { injectable } from "inversify";

@injectable()
export class MusicPlayerControl implements IMusicControl {
    public _player_instance: Map<string, MusicPlayer>;
    public _youtube_data_api: YoutubeDataAPI;
    constructor() {
        this._youtube_data_api = new YoutubeDataAPI();
        this._player_instance = new Map<string, MusicPlayer>();
        setInterval(this.worker, 1000);
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

            this.createNewPlayerInstance(voiceChannel, msg.guild.id);
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
                player_instance.addToQueue(this.setPlayItemBanner("#0099FF", "Now Playing " + this.checkIfRepeatIsOn(player_instance), play_item, msg));
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
    private createNewPlayerInstance(voice_channel: VoiceChannel, server_id: string) {
        this._player_instance.set(server_id, new MusicPlayer(voice_channel));
    }
    private setPlayItemBanner(color: string, title: string, play_item: any, msg: Message): MusicPlayItem {
        try {
            var songInfoBanner = new RichEmbed()
                .setColor(color)
                .setTitle(title)
                .setImage(play_item.thumbnail)
                .addField(`[${play_item.title}]`, `[View on YouTube](${play_item.youtube_link})`, true);
            msg.channel.send(songInfoBanner).then(msg => {
                play_item.anounce_message = msg;
            })
            return play_item;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    private checkIfRepeatIsOn(player_instance: IMusicPlayer): string {
        if (player_instance._repeat) {
            return "(repeat on)";
        }
        return "(repeat off)";
    }
    worker() {
        if (this._player_instance !== undefined) {
            this._player_instance.forEach((value, key, map) => {
                if (value._remove_instance) {
                    this._player_instance.delete(key);
                }
            });
        }
    }

}