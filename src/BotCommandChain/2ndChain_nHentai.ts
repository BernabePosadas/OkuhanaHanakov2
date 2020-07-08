import { CommandChain } from "../Models/Interfaces/CommandChain";
import { Message } from "discord.js";
import { nHentaiDoujin } from "../Objects/nHentaiDoujin/nHentaiDoujin";
import { MusicPlayerCommandChain } from "./3ndChain_MusicPlayer";


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
                var CommandChain3rd : CommandChain = new MusicPlayerCommandChain();
                CommandChain3rd.executeChain(msg, command);
                break;
        }
    }
}