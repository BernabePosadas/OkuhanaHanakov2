import { IMusicPlayer } from "./IMusicPlayer";
import { Message } from "discord.js";

export interface IMusicControl{
    _player_instance : Map<number, IMusicPlayer>;
    addToQueue(msg : Message) : void;
    skip(msg : Message) : void;
    stop(msg : Message) : void;
    pause(msg : Message) : void;
    resume(msg : Message) : void;
    back(msg  : Message) : void;
}