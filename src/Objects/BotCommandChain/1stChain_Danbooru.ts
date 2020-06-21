import { CommandChain } from "../../Models/Interfaces/CommandChain";
import { Message } from "discord.js";
import { Bow } from "../DanbooruImageRandomizer/Bow";

export class DanbooruCommandChain implements CommandChain{
    public _bow : Bow;
    constructor(bow : Bow){
       this._bow = bow;
    } 
    public executeChain(msg : Message, command : string){
        switch (command) { 
            case "killmark":
                this._bow.shootMark(msg)
                break;
            case "killmaster":
                this._bow.shootBernabe(msg);
                break;
            case "killivan":
                this._bow.shootIvan(msg);
                break;
            case "omakaseshot":
                this._bow.omakaseShoot(msg);
                break;
            case "ougi":
                this._bow.useOugi(msg);
                break;
            case "danbooru": 
                this._bow.doGenericDanbooruImageSearch(msg, "danbooru");
                break;
            case "safebooru":
                this._bow.doGenericDanbooruImageSearch(msg, "safebooru");
                break;
            default:
                msg.reply("Ano.. sumimasen, I did not catch your command. Is there something you like to request?");
                break;
        }
    }
}