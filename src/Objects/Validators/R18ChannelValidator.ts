import { Message } from "discord.js";
import { HanakoSpeech } from "../../Models/Static/HanakoSpeech";

export function checkIfR18(msg : Message){
    var isNSFW : any = msg.channel;
    if (isNSFW.nsfw) {
        return true;
    }
    msg.reply(HanakoSpeech.NSFW_POST_TO_NON_NSFW_SPEECH);
    return false;
}