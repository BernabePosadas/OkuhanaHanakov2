import { IMusicPlayer } from "../../Models/Interfaces/IMusicPlayer";
import { IMusicPlaylist } from "../../Models/Interfaces/IMusicPlaylist";
import { MusicPlayerStatus } from "../../Models/Static/MusicPlayerStatus";
import { YoutubeMusicPlaylist } from "../../Models/YoutubeMusicPlaylist";
import { MusicPlayItem } from "../../Models/Interfaces/MusicPlayItem";
import { VoiceConnection } from "discord.js";
import ytdl from "ytdl-core";


export class MusicPlayer implements IMusicPlayer {
    public _now_playing: IMusicPlaylist | undefined;
    public _player_status: number;
    private _connection: VoiceConnection;
    constructor(connection: VoiceConnection) {
        this._connection = connection;
        this._player_status = MusicPlayerStatus.IDLE;
    }
    public addToQueue(song: MusicPlayItem): boolean {
        try {
            if (this._player_status === MusicPlayerStatus.IDLE) {
                var play_item: IMusicPlaylist = new YoutubeMusicPlaylist(song);
                this._now_playing = play_item;
                this._player_status = MusicPlayerStatus.READY;
            }
            this._now_playing?.setNextQueue(song);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    public playSong(): boolean {
        if (this._now_playing != undefined) {
            if (this._now_playing?._song_data != undefined) {
                this._player_status = MusicPlayerStatus.PLAYING;
                this._connection.playStream(ytdl(this._now_playing._song_data.youtube_link, { filter: "audioonly" }), { bitrate: "auto" })
                    .on("end", () => {
                        this._player_status = MusicPlayerStatus.READY;
                    });
                return true;
            }
            throw new Error("Fatal error : song_data is undefined").stack;
        }
        throw new Error("Fatal error : now_playing is undefined").stack;
    }
    public skipSong(): boolean {
        if (this._player_status === MusicPlayerStatus.PLAYING) {
            if (this._now_playing?._next != undefined) {
                this._now_playing = this._now_playing._next;
                if (this._connection.dispatcher) {
                    this._connection.dispatcher.end();
                }
                return true;
            }
        }
        return false;
    }
    public stopPlayer(): boolean {
        if (this._player_status === MusicPlayerStatus.PLAYING) {
            this._player_status = MusicPlayerStatus.IDLE;
            this._connection.dispatcher.end();
            this._now_playing = undefined;
            return true;
        }
        return false;
    }
    public pauseSong(): boolean {
        if (this._player_status === MusicPlayerStatus.PLAYING) {
            this._connection.dispatcher.pause();
            this._player_status = MusicPlayerStatus.PAUSED;
            return true;
        }
        return false;
    }
    public resumePlayer(): boolean {
        if (this._player_status === MusicPlayerStatus.PAUSED) {
            this._connection.dispatcher.resume();
            this._player_status = MusicPlayerStatus.PLAYING;
            return true;
        }
        return false;
    }
    public previous(): boolean {
        if (this._player_status === MusicPlayerStatus.PLAYING) {
            if (this._now_playing?._previous != undefined) {
                this._now_playing = this._now_playing._previous;
                if (this._connection.dispatcher) {
                    this._connection.dispatcher.end();
                }
                return true;
            }
        }
        return false;
    }

}