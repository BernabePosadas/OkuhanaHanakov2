import { injectable, inject } from "inversify";
import { TYPES } from "../../types";
import fetch from "node-fetch";
import querystring from "querystring";
import { DanbooruPost } from "../../Models/Interfaces/DanbooruPost";
import { checkError } from "./../HTTPErrorChecker";

@injectable()
export class Danbooru {
    public _aunth_header : string;
    constructor(
        @inject(TYPES.Danbooru_Username) username: string,
        @inject(TYPES.Danbooru_Key) api_key: string
    ) {
       this._aunth_header = username + ":" + api_key;
    }

    public async fetchRandomImage(candidate: string, search_from: string): Promise<DanbooruPost> {
        const query: string = querystring.stringify({
            tags: candidate + " 1girl",
            limit: "1",
            page: "1",
            random: "true"
        });
        return this.beginSearch(search_from, query);
    }
    public async fetchRandomImageGeneric(tag_list: string, search_from: string): Promise<DanbooruPost> {
        const query: string = querystring.stringify({
            tags: tag_list,
            limit: "1",
            page: "1",
            random: "true"
        });
        return this.beginSearch(search_from, query);
    }
    private async beginSearch(search_from: string, query : string) : Promise<DanbooruPost>{
        switch (search_from) {
            case "danbooru":
                var image: DanbooruPost = { danbooru_link : await this.requestGETPostsDanbooru(query, Buffer.from(this._aunth_header).toString('base64')) };
                return image;
            default:
                var image: DanbooruPost = { danbooru_link : await this.requestGETPostsSafebooru(query, Buffer.from(this._aunth_header).toString('base64')) };
                return image;
        }
    }
    private async requestGETPostsDanbooru(query: string, header: string): Promise<string> {
        const response = await fetch(`https://danbooru.donmai.us/posts.json?${query}`, { headers: { Authorization: "Basic " + header } }).then(checkError).then((response) => response.json());
        if (Object.keys(response).length) {
            return `https://danbooru.donmai.us/posts/${response[0].id}`;
        } 
        return "no data";
    }

    private async requestGETPostsSafebooru(query: string, header: string): Promise<string> {
        const response = await fetch(`https://safebooru.donmai.us/posts.json?${query}`, { headers: { Authorization: "Basic " + header } }).then(checkError).then((response) => response.json());
        if (Object.keys(response).length) {
            return `https://safebooru.donmai.us/posts/${response[0].id}`;
        } 
        return "no data";

    }
}