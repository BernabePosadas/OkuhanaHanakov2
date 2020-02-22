exports.checkError = function(response){
    var queryStringLocation = response.url.indexOf("?")
    var url = response.url.substring(0, queryStringLocation)   // removes queryString.
    if (response.ok) { // res.status >= 200 && res.status < 300
        return response;
    } else {
        throw `${url} responded HTTP ${response.status} ${response.statusText} \nResponse Body : ` + response.json()
    }
}