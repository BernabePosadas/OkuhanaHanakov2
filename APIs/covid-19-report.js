const fetch = require("node-fetch");
const querystring = require("querystring");
const ErrorChecker = require("./ErrorChecker");

class Covid19Reporter{
    constructor(){
        this.BaseURL = "https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Z7biAeD8PAkqgmWhxG2A/FeatureServer/1/";
    }
    async searchByCountry(country){
        const query = querystring.stringify({
            f : "json",
            where : `Confirmed > 1 AND Country_Region = '${country}'`,
            returnGeometry : "false",
            spatialRel : "esriSpatialRelIntersects",
            outFields : "Province_State, Country_Region, Confirmed, Recovered, Deaths",
            orderByFields : "Recovered desc, Country_Region asc, Province_State asc",
            outSR : "102100",
            resultOffset : "0",
            resultRecordCount : "250",
            cacheHint : "false"
        });
        console.log(`${this.BaseURL}query?${query}`);
        const response = await fetch(`${this.BaseURL}query?${query}`).then(ErrorChecker.checkError).then((response) => response.json());
        return response;
    }
    async fetchAllHasConfirmedCases(){
        const query = querystring.stringify({
            f : "json",
            where : "Confirmed > 1",
            returnGeometry : "false",
            spatialRel : "esriSpatialRelIntersects",
            outFields : "Province_State, Country_Region, Confirmed, Recovered, Deaths",
            orderByFields : "Recovered desc, Country_Region asc, Province_State asc",
            outSR : "102100",
            resultOffset : "0",
            resultRecordCount : "250",
            cacheHint : "false"
        });
        const response = await fetch(`${this.BaseURL}query?${query}`).then(ErrorChecker.checkError).then((response) => response.json());
        return response;
    }
}

module.exports = {
    Covid19Reporter
}