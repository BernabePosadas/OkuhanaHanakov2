const fetch = require("node-fetch");
const querystring = require("querystring");
const ErrorChecker = require("./ErrorChecker");

exports.queryYoutube = async function (args) {
    const query = querystring.stringify({
        key: process.env.YTKey,
        part: "snippet",
        q: args,
        type: "video"
    })
    return await SearchAndGenerateURL(query);
}
async function SearchAndGenerateURL(query) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${query}`).then(ErrorChecker.checkError).then(response => response.json());
    return `https://www.youtube.com/watch?v=${response.items[0].id.videoId}`;
}