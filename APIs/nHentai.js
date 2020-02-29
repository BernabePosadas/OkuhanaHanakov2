const fetch = require("node-fetch");
const querystring = require("querystring");
const ErrorChecker = require("./ErrorChecker");
exports.FetchDoujin = async function(query){
    return await Request_GET_doujinInfo(query);
}
async function Request_GET_doujinInfo(query){
    const response = await fetch(`https://nhentai.net/api/gallery/${query}`).then(ErrorChecker.checkError).then((response) => response.json());
    return response;
}
