import { Message } from "discord.js";
import { CommandChain } from "../../Models/Interfaces/CommandChain";

export class MockCommandChain implements CommandChain {
    public executeChain(msg : Message, command : string) 
    {}
}
