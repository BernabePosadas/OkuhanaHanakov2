import mysql from "mysql2";

class MySQLDBConnection implements IDBConnection {
    private connection : mysql.Connection;
    private data : any; 
    public constructor(){
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password : process.env.DB_PASS,
            database: 'OkuhanaHanako',
            port: 3306
          });
    }
    public executeQuery(query : string, data : []) : void {
        this.connection.execute(
            query,
            data,
            this.dbCallback
          );
    }
    getData() : any {
        return this.data;
    }
    private dbCallback(err : any, results : any){
        if(err){
            throw new Error("MSQL Error : " + err.code);
        }
        this.data = results;
    } 
}