import fetch from "node-fetch";
import querystring from "querystring";
import { checkError } from "../HTTPErrorChecker";


export class YoutubeDataAPI{
    public async searchFirstVideo(args : string) : Promise<string>{
        const query = querystring.stringify({
            key: process.env.YTKey,
            part: "snippet",
            q: args,
            type: "video"
        });
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${query}`).then(checkError).then((response: { json: () => any; })  => response.json());
        return `https://www.youtube.com/watch?v=${response.items[0].id.videoId}`;
    }
}
