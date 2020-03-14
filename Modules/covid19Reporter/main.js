const { Covid19Reporter } = require("./../../APIs/covid-19-report");
const Discord = require("discord.js");
const GlobalVariables = require("./../../GlobalVariables/GlobalVariables");

exports.FetchReport = async function (message) {
    var country = message.content.substring(7).toString().trim();
    CovidReporter = new Covid19Reporter();
    if (country) {
        generateReport(await CovidReporter.searchByCountry(country), message);
    }
    else{
        generateReport(await CovidReporter.fetchAllHasConfirmedCases(), message);
    }
}

function generateReport(response, message){
    console.log(response);
    if (response.features.length > 0) {
        response.features.forEach(function (value, index) {
            var location_string = "";
            if(value.attributes.Province_State){
                location_string = `${value.attributes.Province_State}, ${value.attributes.Country_Region}`;
            }
            else{
                location_string = value.attributes.Country_Region;
            }
            var MessageBanner = new Discord.RichEmbed()
                .setColor("#FF0000")
                .setTitle(`${location_string}`)
                .addField("Status: ",  `Confirmed :${value.attributes.Confirmed}\n Deaths : ${value.attributes.Deaths}\n Recovered : ${value.attributes.Recovered}`);
            message.channel.send(MessageBanner);
        })
    }
    else{
        message.channel.send("Yay there is no confirmed cases (^_^)");
    }
}