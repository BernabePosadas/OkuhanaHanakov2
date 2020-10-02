interface IDBConnection{
    executeQuery(query : string, data : []) : void;
    getData() : any;
}