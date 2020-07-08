import { Message } from "discord.js";

export interface MusicPlayItem{ 
    title :  string;
    youtube_link : string;
    thumbnail : string;
    requested_by : string | undefined;
    anounce_message : Message | undefined;
    queued : boolean;
}