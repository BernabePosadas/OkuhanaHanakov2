import {Client, Message} from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";

@injectable()
export class Hanako {
    private _client : Client;
    private readonly _token : string;
    
    constructor(
        @inject(TYPES.Client) client : Client,
        @inject(TYPES.Token) token : string,
    ){
        this._client = client;
        this._token = token;
    }
    public start() : Promise<string>{
        //Hanako's Task List
        this.lisenToMessage();
        
        //Readies herself and log to discord.
        return this._client.login(this._token);
    }
    private lisenToMessage(){
        this._client.on("message", async(msg : Message )=> {
               
        });
    }
    public setActivity(activity_type : string, activity : string){

    }
}