import fs from 'fs';

export class SurfaceLevelExceptionHandler{
    public static handle(exception : string){
        // handle routine 
        this.writeToFile(exception);
    }
    private static writeToFile(exception : string){
        fs.writeFile("./logs/exception_stack_trace.txt", exception, { flag: 'w' }, function(err){
            if(err){
                console.log(err.message);
            }
        });
    }
}


