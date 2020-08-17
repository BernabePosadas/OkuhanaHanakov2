import fs from 'fs';
import container from "./../inversify.config";
import {TYPES} from "./../types";
import {Hanako} from "./../bot";
import {TheWeebsDiscordID} from "./../Models/Static/TheWeebsDiscordIDs";

export class SurfaceLevelExceptionHandler{
    public static handle(exception : string){
        // handle routine 
        this.writeToFile(exception);
        let bot = container.get<Hanako>(TYPES.Hanako);
        bot.sendErrorAsPrivateMessage(TheWeebsDiscordID.bernabe, "");
    }
    private static writeToFile(exception : string){
        fs.writeFile("./logs/exception_stack_trace.txt", exception, { flag: 'w' }, function(err){
            if(err){
                console.log(err.message);
            }
        });
    }
}


