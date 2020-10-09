import { inject } from "inversify";
import { TYPES } from "../../types";

class nHentaiDoujinBookmarkManager{
    private DB : IDBConnection;
    constructor(@inject(TYPES.Mysql_Object) connection : IDBConnection){
        this.DB = connection;
    }
}