import { CommandChain } from "../Models/Interfaces/CommandChain";
import { Message } from "discord.js";
import { MusicPlayerControl } from "../Objects/MusicPlayer/MusicPlayerControl";
import { IMusicControl } from "../Models/Interfaces/IMusicPlayerControl";
import container from "../inversify.config";
import { TYPES } from "../types";
import { BotMiscCommandChain } from "./4thChain_Misc";

export class MusicPlayerCommandChain implements CommandChain{
    private _music_player_control : IMusicControl;
    constructor(){
        this._music_player_control = container.get<MusicPlayerControl>(TYPES.MusicPlayerControl);
    }
    public executeChain(msg : Message, command : string){
        switch (command) { 
            case "play":
                this._music_player_control.addToQueue(msg);
                break;
            case "skip":
                this._music_player_control.handleOtherMusicCommands(msg, "next");
                break;
            case "stop":
                this._music_player_control.handleOtherMusicCommands(msg, "stop");
                break;
            case "pause":
                this._music_player_control.handleOtherMusicCommands(msg, "pause");
                break;
            case "resume":
                this._music_player_control.handleOtherMusicCommands(msg, "resume");
                break;
            case "back":
                this._music_player_control.handleOtherMusicCommands(msg, "previous");
                break;
            case "togglerepeat":
                this._music_player_control.handleOtherMusicCommands(msg, "repeat");
                break;
            default:
                var CommandChain3rd : CommandChain = new BotMiscCommandChain();
                CommandChain3rd.executeChain(msg, command);
                break;
        }
    }
}