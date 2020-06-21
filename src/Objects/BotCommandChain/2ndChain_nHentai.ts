import { CommandChain } from "../../Models/Interfaces/CommandChain";
import { Message } from "discord.js";
import { nHentaiDoujin } from "../nHentaiDoujin/nHentaiDoujin";

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
                msg.reply("Ano.. sumimasen, I did not catch your command. Is there something you like to request?");
                break;
        }
    }
}