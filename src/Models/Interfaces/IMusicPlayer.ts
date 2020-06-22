import { IMusicPlaylist } from "./IMusicPlaylist";
import { MusicPlayItem } from "./MusicPlayItem";

export interface IMusicPlayer{
    _now_playing : IMusicPlaylist | undefined;
    _player_status : number;
    addToQueue(song : MusicPlayItem) : boolean;
    playSong() : boolean;
    skipSong() : boolean;
    stopPlayer() : boolean;
    pauseSong() : boolean;
    resumePlayer() : boolean;
    previous() : boolean;
}