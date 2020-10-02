import { CommandChain } from "../Models/Interfaces/CommandChain";
import { Message } from "discord.js";
import { nHentaiDoujin } from "../Objects/nHentaiDoujin/nHentaiDoujin";
import { MusicPlayerCommandChain } from "./3ndChain_MusicPlayer";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export class nHentaiCommandChain implements CommandChain{
    private _nhentai_doujin : nHentaiDoujin;
    private _next_command_chain : CommandChain;
    constructor(
        @inject(TYPES.NHentai_Doujin) nHentai_Doujin : nHentaiDoujin,
        @inject(TYPES.Music_CommandChain) nextCommandChain : CommandChain
    ){
        this._nhentai_doujin = nHentai_Doujin;
        this._next_command_chain = nextCommandChain;
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
                this._next_command_chain.executeChain(msg, command);
                break;
        }
    }
}