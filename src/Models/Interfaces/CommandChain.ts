import { Message } from "discord.js";

export interface CommandChain { 
    executeChain : (msg : Message, command : string) => void
}