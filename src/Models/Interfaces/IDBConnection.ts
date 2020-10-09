interface IDBConnection{
    executeQuery(query : string, data : []) : void;
    executeNonQuery(query : string, data : []) : void;
    getData() : any;
}