
export function checkError(value :Response | any){
    var queryStringLocation = value.url.indexOf("?");
    var url =value.url;
    if(queryStringLocation > 0){
        url = value.url.substring(0, queryStringLocation);   // removes queryString.
    }
    if (value.ok) { // res.status >= 200 && res.status < 300
        return value;
    } else {
        throw Error(`${url} responded HTTP ${value.status} ${value.statusText}`).stack;
    }
}