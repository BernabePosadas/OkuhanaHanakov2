import { IMusicPlayer } from "../../Models/Interfaces/IMusicPlayer";
import { IMusicPlaylist } from "../../Models/Interfaces/IMusicPlaylist";
import { MusicPlayerStatus } from "../../Models/Static/MusicPlayerStatus";
import { YoutubeMusicPlaylist } from "../../Models/YoutubeMusicPlaylist";
import { MusicPlayItem } from "../../Models/Interfaces/MusicPlayItem";
import { VoiceConnection, VoiceChannel } from "discord.js";
import ytdl from "ytdl-core";
import { HanakoSpeech } from "../../Models/Static/HanakoSpeech";
import { SurfaceLevelExceptionHandler } from "../SurfaceLevelExceptionHandler";


export class MusicPlayer implements IMusicPlayer {
    public _now_playing: IMusicPlaylist | undefined;
    public _player_status: number;
    private _connection: VoiceConnection | undefined;
    public _voice_channel : VoiceChannel | null;
    public _repeat : boolean;
    public _prevent_worker : boolean;
    public _remove_instance : boolean;
    constructor(voice_channel : VoiceChannel | null) {
        this._repeat = false;
        this._prevent_worker = false;
        this._player_status = MusicPlayerStatus.IDLE;
        this._remove_instance = false;
        this._voice_channel = voice_channel
    }
    public async addToQueue(song: MusicPlayItem): Promise<boolean> {
        try {
            if (this._player_status === MusicPlayerStatus.IDLE) {
                var play_item: IMusicPlaylist = new YoutubeMusicPlaylist(song);
                this._now_playing = play_item;
                this._player_status = MusicPlayerStatus.LOCKED;
                this._prevent_worker = true;
                await this._voice_channel?.join().then(connection => {
                    this._connection = connection;
                }).catch(e => {
                    throw e
                });
                return true;
            }
            this._now_playing?.setNextQueue(song);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    public async playSong() {
        this._prevent_worker= false;
        if (this._now_playing != undefined) {
            if (this._now_playing?._song_data != undefined) {
                
                this._connection?.play(ytdl(this._now_playing._song_data.youtube_link, { filter: "audioonly" }), { bitrate: "auto" })
                    .on("start", () =>{
                        this._player_status = MusicPlayerStatus.PLAYING;
                        if (this._now_playing?._song_data != undefined) {
                            this._now_playing._song_data.queued = false;
                        }
                    })
                    .on("finish", () => {
                        if(this._player_status !== MusicPlayerStatus.TERMINATING && this._player_status !== MusicPlayerStatus.LOCKED){
                            this._player_status = MusicPlayerStatus.READY;
                        }
                    })
                    .on("error", (err) =>{
                        SurfaceLevelExceptionHandler.handle("Error on dispatcher encountered: \ndiscord.js dispatcher says: " + err.message);
                        this.handleDispatcherError();
                    });
                    return;
            }
            throw new Error("Fatal error : song_data is undefined").stack;
        }
        throw new Error("Fatal error : now_playing is undefined").stack;
    }
    public skipSong(): boolean {
        if (this._player_status !== MusicPlayerStatus.IDLE) {
            if (this._now_playing?._next != undefined) {
                this._prevent_worker = true;
                if(this._player_status === MusicPlayerStatus.PAUSED){
                    this.resumePlayer();
                }
                else{
                    this.removeAnnounceMessage();
                }
                this._now_playing = this._now_playing._next;
                if (this._player_status === MusicPlayerStatus.PLAYING || this._player_status === MusicPlayerStatus.PAUSED) {
                    this._connection?.dispatcher.end();
                }
                return true;
            }
        }
        return false;
    }
    public stopPlayer(): boolean {
        if (this._player_status !== MusicPlayerStatus.IDLE) {
            if(this._player_status === MusicPlayerStatus.PLAYING || this._player_status === MusicPlayerStatus.PAUSED){
                this._player_status = MusicPlayerStatus.TERMINATING;
                this._connection?.dispatcher.end();
                this.removeAnnounceMessage();
                while(this._now_playing?._next !== undefined){
                    this._now_playing = this._now_playing._next;
                    this.removeAnnounceMessage();
                }
                this._player_status = MusicPlayerStatus.IDLE;
            }
            else
            {
                this._player_status = MusicPlayerStatus.IDLE;
            }
            this._repeat = false;
            this._now_playing = undefined;
            this._remove_instance = true;
            this._voice_channel?.leave();
            return true;
        }
        return false;
    }
    public pauseSong(): boolean {
        if (this._player_status === MusicPlayerStatus.PLAYING) {
            this.removeAnnounceMessage();
            this._connection?.dispatcher.pause();
            this._player_status = MusicPlayerStatus.PAUSED;
            return true;
        }
        return false;
    }
    public resumePlayer(): boolean {
        if (this._player_status === MusicPlayerStatus.PAUSED) {
            this.removeAnnounceMessage();
            this._connection?.dispatcher.resume();
            this._player_status = MusicPlayerStatus.PLAYING;
            return true;
        }
        return false;
    }
    public previous(): boolean {
        if (this._player_status !== MusicPlayerStatus.IDLE) {
            if (this._now_playing?._previous != undefined) {
                this._prevent_worker = true;
                if(this._player_status === MusicPlayerStatus.PAUSED){
                    this.resumePlayer();
                }
                else{
                    this.removeAnnounceMessage();
                }
                this._now_playing = this._now_playing._previous;
                if (this._player_status === MusicPlayerStatus.PLAYING  || this._player_status === MusicPlayerStatus.PAUSED) {
                    this._connection?.dispatcher.end();
                }
                return true;
            }
        }
        return false;
    }
    public toggleRepeat()  : boolean {
        if (this._player_status !== MusicPlayerStatus.IDLE) {
           this._repeat = !this._repeat;
           this.removeAnnounceMessage();
           return true; 
        }
        return false;
    }
    private removeAnnounceMessage(){
        if(!this._now_playing?._song_data.anounce_message?.deleted){
            this._now_playing?._song_data.anounce_message?.delete();
        }
    }
    private handleDispatcherError(){
        this._player_status = MusicPlayerStatus.LOCKED;
        if(this._now_playing?._next != undefined && this._repeat){
            this._prevent_worker = true;
            this.removeAnnounceMessage();
            this._now_playing?._song_data.anounce_message?.channel.send(HanakoSpeech.DISPATCHER_ERROR_WITH_NEXT);
            this._now_playing = this._now_playing._next;
            this._player_status = MusicPlayerStatus.READY;
        }
        else{
            this._now_playing?._song_data.anounce_message?.channel.send(HanakoSpeech.DISPATCHER_ERROR_STOP);
            this.stopPlayer();
        }
    }
}