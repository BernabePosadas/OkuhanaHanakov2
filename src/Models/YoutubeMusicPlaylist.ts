import { IMusicPlaylist } from "./Interfaces/IMusicPlaylist";
import { MusicPlayItem } from "./Interfaces/MusicPlayItem";

export class YoutubeMusicPlaylist implements IMusicPlaylist{
    public _previous: IMusicPlaylist | undefined;
    public _next: IMusicPlaylist | undefined;
    public _song_data: MusicPlayItem;
    constructor(item : MusicPlayItem){
        this._song_data = item;
    }
    public setNextQueue(item: MusicPlayItem): void {
        if(this._next === undefined){
            this._next = new YoutubeMusicPlaylist(item);
            this._next._previous = this;
            this._next._previous._next = this._next;
            return;
        }
        this._next.setNextQueue(item);
    }

}