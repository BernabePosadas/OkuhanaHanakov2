import { IMusicPlaylist } from "./IMusicPlaylist";
import { MusicPlayItem } from "./MusicPlayItem";
import { VoiceChannel } from "discord.js";

export interface IMusicPlayer{
    _now_playing : IMusicPlaylist | undefined;
    _repeat : boolean;
    _player_status : number;
    _remove_instance : boolean;
    _voice_channel : VoiceChannel | null;
    addToQueue(song : MusicPlayItem) : Promise<boolean>;
    playSong() : any;
    skipSong() : boolean;
    stopPlayer() : boolean;
    pauseSong() : boolean;
    resumePlayer() : boolean;
    previous() : boolean;
}