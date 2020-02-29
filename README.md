# Okuhana Hanako
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1b75ff93fa7e4846a80e0dd96e08492f)](https://app.codacy.com/manual/BernabePosadas/OkuhanaHanakov2?utm_source=github.com&utm_medium=referral&utm_content=BernabePosadas/OkuhanaHanakov2&utm_campaign=Badge_Grade_Dashboard)
[![Build status](https://ci.appveyor.com/api/projects/status/5rmvkqj84j6ml5xs/branch/master?svg=true)](https://ci.appveyor.com/project/BernabePosadas/okuhanahanakov2/branch/master)
[![GitHub license](https://img.shields.io/github/license/BernabePosadas/OkuhanaHanakov2)](https://github.com/BernabePosadas/OkuhanaHanakov2/blob/master/LICENSE)

A Discord Bot that i created for practicing coding in node and discord js API. 

## Bot Capabilites

1) Danbooru/Safebooru Random Image Fetcher
  Randomly sends a Danbooru post link. Currently the search tags are predefined to implement a similar to a [Gal*Gun](https://en.wikipedia.org/wiki/Gal_Gun) shooting game where the bullets are the the tags we love and cause the receiver to die(or just feel delighted with the picture).
  - Commands Associating to "Danbooru/Safebooru Random Image Fetcher"
    - `!killmark` - makes the bot send random post from danbooru to my friend [Mark](https://web.facebook.com/MinaseAoi1) from his tag pool.
    - `!killivan` -  makes the bot send random post from danbooru to my friend [Ivan](https://web.facebook.com/johnivan.demesa) from his tag pool.
    - `!killmaster` - makes the bot send random post from danbooru to me from my tag pool.
    - `!omakaseshot` - makes the bot randomly send either me, Ivan, Mark or all of us.

2) YouTube Music Player
   Similar to already developed discord music player, the bot is capable of playing YouTube audio given a link. Alternatively there is a implementation for bot to search in YT given the video title. Backbone code used for this feature is from the [blog](https://gabrieltanner.org/blog/dicord-music-bot) of Tanner Gabriel. 

 - Commands Associating to "Youtube Music Player"
    - `!play <link>` - makes the bot fetch the video data of the given link and plays it on a voice channel. Alternatively a video   title can be provided in `<link>` to make the bot make a search query to YT and plays the first result. When there is currenly playing, it will be added to queue list
    - `!skip` - skips the currently playing song and plays the next in queue
    - `!pause` - pause the currently playing song
    - `!resume` - resume the paused song
    - `!stop` - stops the player and remove all items in queue
3) Misc commands
   - `!launchnuke <code>` - will display nHentai doujin basic information when given a nHenati doujin ID(or weebs call it nuke codes)  
## What is my motivation to create this? 
  To gave myself an excercise to code and to automate fetching `abigail williams` photo to be sent to Mark. 

## What are the dependency/package used?
  - for the whole software
    - discord.js 
  - Danbooru Random Image Fetcher
    - the APIs folder specifically danbooru.js
  - YouTube Music Player
    -  the APIs folder specifically YTSearchApi.js
    - ffmpeg
    - opus(if required)
  - APIs folder
    - node-fetch 
 
## So many cringy weaboo shenanigans. Why you choose to include that mess for bot replies? 
   Why not? 

## Okuhana Hanako? whats with that name?
  Its from my happy go lucky female loli archer OC. I name it based on the bot capabilities to shoot(send links and mentioning the 
  recipient) and go on for an adventure to the Internet World(when doing a HTTP request).

## License 
 [MIT License](https://github.com/BernabePosadas/OkuhanaHanakov2/blob/master/LICENSE)  

