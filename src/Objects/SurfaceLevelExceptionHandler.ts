import fs from 'fs';

export class SurfaceLevelExceptionHandler{
    public static writeToFile(exception_stack : string){
        fs.writeFile("./logs/exception_stack_trace.txt", exception_stack, { flag: 'w' }, function(err){
            if(err){
                console.log(err.message);
            }
        });
    }
}


