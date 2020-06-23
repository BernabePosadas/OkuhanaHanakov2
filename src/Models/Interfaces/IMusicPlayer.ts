import { IMusicPlaylist } from "./IMusicPlaylist";
import { MusicPlayItem } from "./MusicPlayItem";

export interface IMusicPlayer{
    _now_playing : IMusicPlaylist | undefined;
    _repeat : boolean;
    _player_status : number;
    _remove_instance : boolean;
    addToQueue(song : MusicPlayItem) : Promise<boolean>;
    playSong() : any;
    skipSong() : boolean;
    stopPlayer() : boolean;
    pauseSong() : boolean;
    resumePlayer() : boolean;
    previous() : boolean;
    toggleRepeat() : boolean;
}