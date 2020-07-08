import { MusicPlayItem } from "./MusicPlayItem";

export interface IMusicPlaylist{
    _previous : IMusicPlaylist | undefined; 
    _next : IMusicPlaylist | undefined;
    _song_data : MusicPlayItem;
    setNextQueue(item : MusicPlayItem) : void;
}