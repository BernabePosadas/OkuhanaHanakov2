//************************************************************************************/
//   The object `Bow` is simply the object that handle danbooru random image search.  /
//   I name it even though the name is irrelevant as to better imagine the bot        /
//   actions as representing my OC character `Okuhana Hanako`.                        /
//                                                                                    /
//************************************************************************************/

import { CommandChain } from "../Models/Interfaces/CommandChain";
import { Message } from "discord.js";
import { Bow } from "../Objects/DanbooruImageRandomizer/Bow";
import { nHentaiCommandChain } from "./2ndChain_nHentai";
import container from "../inversify.config";
import { TYPES } from "../types";
import { inject, injectable } from "inversify";

@injectable()
export class DanbooruCommandChain implements CommandChain{
    private _bow : Bow;
    private _nextCommandChain : CommandChain;
    constructor(
        @inject(TYPES.Bow) bow : Bow,
        @inject(TYPES.NHentai_CommandChain) next : CommandChain
    ){
       this._bow = bow;
       this._nextCommandChain = next;
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
                this._nextCommandChain.executeChain(msg, command);
                break;
        }
    }
}