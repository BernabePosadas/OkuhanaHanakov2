import { IMusicPlayer } from "../../Models/Interfaces/IMusicPlayer";
import { IMusicPlaylist } from "../../Models/Interfaces/IMusicPlaylist";
import { MusicPlayerStatus } from "../../Models/Static/MusicPlayerStatus";
import { YoutubeMusicPlaylist } from "../../Models/YoutubeMusicPlaylist";
import { MusicPlayItem } from "../../Models/Interfaces/MusicPlayItem";
import { VoiceConnection, VoiceChannel } from "discord.js";
import ytdl from "ytdl-core";


export class MusicPlayer implements IMusicPlayer {
    public _now_playing: IMusicPlaylist | undefined;
    public _player_status: number;
    private _connection: VoiceConnection | undefined;
    private _worker : any;
    private _voice_channel : VoiceChannel;
    public _repeat : boolean;
    private _prevent_worker : boolean;
    public _remove_instance : boolean;
    constructor(voice_channel : VoiceChannel) {
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
                this._player_status = MusicPlayerStatus.READY;
                this._prevent_worker = true;
                this._connection = await this._voice_channel.join().then(connection => {
                    return connection
                }).catch(e => {
                    throw e
                });
                this._worker = setInterval(this.worker, 1000);
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
                this._player_status = MusicPlayerStatus.PLAYING;
                this._connection?.playStream(ytdl(this._now_playing._song_data.youtube_link, { filter: "audioonly" }), { bitrate: "auto" })
                    .on("end", () => {
                        this._player_status = MusicPlayerStatus.READY;
                    });
                    return;
            }
            throw new Error("Fatal error : song_data is undefined").stack;
        }
        throw new Error("Fatal error : now_playing is undefined").stack;
    }
    public skipSong(): boolean {
        if (this._player_status !== MusicPlayerStatus.IDLE && this._player_status !== MusicPlayerStatus.PAUSED) {
            if (this._now_playing?._next != undefined) {
                this._prevent_worker = true;
                this._now_playing = this._now_playing._next;
                if (this._connection?.dispatcher) {
                    this._connection.dispatcher.end();
                }
                return true;
            }
        }
        return false;
    }
    public stopPlayer(): boolean {
        if (this._player_status !== MusicPlayerStatus.IDLE) {
            if(this._player_status === MusicPlayerStatus.PLAYING){
                this._connection?.dispatcher.end();
            }
            this._player_status = MusicPlayerStatus.IDLE;
            this._repeat = false;
            this._now_playing = undefined;
            clearInterval(this._worker);
            this._remove_instance = true;
            return true;
        }
        return false;
    }
    public pauseSong(): boolean {
        if (this._player_status === MusicPlayerStatus.PLAYING) {
            this._connection?.dispatcher.pause();
            this._player_status = MusicPlayerStatus.PAUSED;
            return true;
        }
        return false;
    }
    public resumePlayer(): boolean {
        if (this._player_status === MusicPlayerStatus.PAUSED) {
            this._connection?.dispatcher.resume();
            this._player_status = MusicPlayerStatus.PLAYING;
            return true;
        }
        return false;
    }
    public previous(): boolean {
        if (this._player_status !== MusicPlayerStatus.IDLE && this._player_status !== MusicPlayerStatus.PAUSED) {
            if (this._now_playing?._previous != undefined) {
                this._now_playing = this._now_playing._previous;
                this._prevent_worker = true;
                if (this._connection?.dispatcher) {
                    this._connection.dispatcher.end();
                }
                return true;
            }
        }
        return false;
    }
    public toggleRepeat(): boolean {
        if (this._player_status === MusicPlayerStatus.PLAYING) {
            this._repeat = !this._repeat;
            return true;
        }
        return false;
    }
    worker(){
        if(!this._prevent_worker && this._player_status === MusicPlayerStatus.READY){
            if(!this._prevent_worker && !this._repeat){
                if (this._now_playing?._next != undefined) {
                    this._now_playing = this._now_playing._next;
                }
                else{
                    this.stopPlayer();
                }
            }
            this.playSong();
        }
    }

}