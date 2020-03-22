const fetch = require("node-fetch");
const querystring = require("querystring");
const ErrorChecker = require("./ErrorChecker");
exports.fetchRandomImage_Arrows = async function(candidate){
    const query = querystring.stringify({
        tags : candidate + " 1girl",
        limit : "1",
        page : "1",
        random : "true"
    });
    return await Request_GET_posts_danbooru(query);
}

exports.fetchRandomImage = async function(searchQuery, searchFrom)
{
    const query = querystring.stringify({
        tags : searchQuery,
        limit : "1",
        page : "1",
        random : "true"
    });
    switch(searchFrom){
        case "Safebooru" : 
            return await Request_GET_posts_Safebooru(query);
        default: 
            return await Request_GET_posts_danbooru(query);
    }
}

async function Request_GET_posts_danbooru(query){
    const response = await fetch(`https://danbooru.donmai.us/posts.json?${query}`).then(ErrorChecker.checkError).then((response) => response.json());
    if(Object.keys(response).length){
        return `https://danbooru.donmai.us/posts/${response[0].id}`;
    }
    else{
        return "no data";
    }
}

async function Request_GET_posts_Safebooru(query){
    const response = await fetch(`https://safebooru.donmai.us/posts.json?${query}`).then(ErrorChecker.checkError).then((response) => response.json());
    if(Object.keys(response).length){
        return `https://safebooru.donmai.us/posts/${response[0].id}`;
    }
    else{
        return "no data";
    }
}
