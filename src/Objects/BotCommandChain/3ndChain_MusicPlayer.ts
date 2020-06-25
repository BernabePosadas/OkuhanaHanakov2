import { CommandChain } from "../../Models/Interfaces/CommandChain";
import { Message } from "discord.js";
import { MusicPlayerControl } from "../MusicPlayer/MusicPlayerControl";
import { IMusicControl } from "../../Models/Interfaces/IMusicPlayerControl";

export class MusicPlayerCommandChain implements CommandChain{
    private _music_player_control : IMusicControl;
    constructor(music_player_control : MusicPlayerControl){
        this._music_player_control = music_player_control;
    }
    public executeChain(msg : Message, command : string){
        switch (command) { 
            case "play":
                this._music_player_control.addToQueue(msg);
                break;
            case "skip":
                this._music_player_control.skip(msg);
                break;
            case "stop":
                this._music_player_control.stop(msg);
                break;
            case "pause":
                this._music_player_control.pause(msg);
                break;
            case "resume":
                this._music_player_control.resume(msg);
                break;
            case "back":
                this._music_player_control.back(msg);
                break;
            case "togglerepeat":
                this._music_player_control.repeat(msg);
                break;
            default:
                msg.reply("Ano.. sumimasen, I did not catch your command. Is there something you like to request?");
                break;
        }
    }
}