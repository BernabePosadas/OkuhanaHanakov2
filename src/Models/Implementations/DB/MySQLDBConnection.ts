import { injectable } from "inversify";
import mysql from "mysql2";

@injectable()
export class MySQLDBConnection implements IDBConnection {
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
        this.connection.query(
            query,
            data,
            this.dbCallback
          );
    }
    public executeNonQuery(query : string, data : []) : void {
        this.connection.execute(
            query,
            data,
            this.dbCallback
          );
    }
    public getData() : any {
        return this.data;
    }
    private dbCallback(err: mysql.QueryError | null, result: mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket | mysql.OkPacket[] | mysql.ResultSetHeader, fields: mysql.FieldPacket[]): any{
        if(err){
            throw new Error("MSQL Error : " + err.code + " " + err.message);
        }
        this.data = result;
    } 
   
}