import { CommandChain } from "../../Models/Interfaces/CommandChain";
import { Message } from "discord.js";
import { nHentaiDoujin } from "../nHentaiDoujin/nHentaiDoujin";
import { MusicPlayerCommandChain } from "./3ndChain_MusicPlayer";
import container from "./../../inversify.config";
import { MusicPlayerControl } from "../MusicPlayer/MusicPlayerControl";
import { TYPES } from "../../types";

export class nHentaiCommandChain implements CommandChain{
    private _nhentai_doujin : nHentaiDoujin;
    constructor(){
        this._nhentai_doujin = new nHentaiDoujin();
    }
    public executeChain(msg : Message, command : string){
        switch (command) { 
            case "launchnuke":
                this._nhentai_doujin.searchAndServeDoujin(msg, false);
                break;
            case "doujintags":
                this._nhentai_doujin.searchAndServeDoujin(msg, true);
                break;
            default:
                let MPC = container.get<MusicPlayerControl>(TYPES.MusicPlayerControl);
                var CommandChain3rd : CommandChain = new MusicPlayerCommandChain(MPC);
                CommandChain3rd.executeChain(msg, command);
                break;
        }
    }
}