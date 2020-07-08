import { IMusicPlayer } from "./IMusicPlayer";
import { Message } from "discord.js";

export interface IMusicControl{
    _player_instance : Map<string, IMusicPlayer>;
    addToQueue(msg : Message) : Promise<void>;
    skip(msg : Message) : void;
    stop(msg : Message) : void;
    pause(msg : Message) : void;
    resume(msg : Message) : void;
    back(msg  : Message) : void;
    repeat(msg : Message) : void;
}