import { CommandChain } from "../Models/Interfaces/CommandChain";
import { Message } from "discord.js";
import { HanakoSpeech } from "../Models/Static/HanakoSpeech";
import { MiscCommand } from "../Objects/Misc/MiscFuntions";
export class BotMiscCommandChain implements CommandChain {
    private _misc_command : MiscCommand;
    constructor(){
        this._misc_command = new MiscCommand();
    }
    public executeChain (msg: Message, command: string) {
        switch (command) { 
            case "help":
                 this._misc_command.viewAvailCommands(msg);
                 break;
            default:
                msg.reply(HanakoSpeech.COMMAND_INVALID);
                break;
        }
    }
}

