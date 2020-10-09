import { CommandChain } from "../Models/Interfaces/CommandChain";
import { Message } from "discord.js";
import { HanakoSpeech } from "../Models/Static/HanakoSpeech";
import { MiscCommand } from "../Objects/Misc/MiscFuntions";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export class BotMiscCommandChain implements CommandChain {
    private _misc_command : MiscCommand;
    constructor(
        @inject(TYPES.Misc_Command) miscCommand : MiscCommand
    ){
        this._misc_command = miscCommand;
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

