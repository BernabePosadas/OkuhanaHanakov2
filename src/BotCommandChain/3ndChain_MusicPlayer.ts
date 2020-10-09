import { CommandChain } from "../Models/Interfaces/CommandChain";
import { Message } from "discord.js";
import { MusicPlayerControl } from "../Objects/MusicPlayer/MusicPlayerControl";
import { IMusicControl } from "../Models/Interfaces/IMusicPlayerControl";
import container from "../inversify.config";
import { TYPES } from "../types";
import { inject, injectable } from "inversify";

@injectable()
export class MusicPlayerCommandChain implements CommandChain{
    private _music_player_control : IMusicControl;
    private _next_command_chain : CommandChain;
    constructor(
        @inject(TYPES.MusicPlayerControl) music_player_control : IMusicControl,
        @inject(TYPES.Misc_CommandChain) nextCommandChain : CommandChain
    ){
        this._music_player_control = music_player_control;
        this._next_command_chain = nextCommandChain;
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
                this._next_command_chain.executeChain(msg, command);
                break;
        }
    }
}