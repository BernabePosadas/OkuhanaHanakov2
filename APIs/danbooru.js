const fetch = require('node-fetch');
const querystring = require('querystring');
const ErrorChecker = require('./ErrorChecker')
exports.RandomShoot = async function(candidate){
    const query = querystring.stringify({
        tags : candidate + " 1girl",
        limit : "1",
        page : "1",
        random : "true"
    })
    return await Request_GET_posts(query)
}



async function Request_GET_posts(query){
    const response = await fetch(`https://safebooru.donmai.us/posts.json?${query}`).then(ErrorChecker.checkError).then(response => response.json());
    return `https://safebooru.donmai.us/posts/${response[0].id}`;
}
