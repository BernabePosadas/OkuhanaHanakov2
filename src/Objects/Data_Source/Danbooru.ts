import { injectable } from "inversify";
import fetch from "node-fetch";
import querystring from "querystring";
import { DanbooruPost } from "../../Models/Interfaces/DanbooruPost";
import { checkError } from "./../HTTPErrorChecker";

@injectable()
export class Danbooru {
    public _aunth_header : string;
    constructor(
    ) {
       this._aunth_header = process.env.USER_NAME + ":" + process.env.DANBOORU_KEY;
    }

    public async fetchRandomImage(candidate: string, search_from: string): Promise<DanbooruPost> {
        const query: string = querystring.stringify({
            tags: candidate + " 1girl",
            limit: "1",
            page: "1",
            random: "true"
        });
        return await this.beginSearch(search_from, query);
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
                var link = await this.requestGETPostsDanbooru(query, Buffer.from(this._aunth_header).toString('base64'));
                var image: DanbooruPost = { danbooru_link : link };
                return image;
            default:
                var link = await this.requestGETPostsSafebooru(query, Buffer.from(this._aunth_header).toString('base64'));
                var image: DanbooruPost = { danbooru_link : link };
                return image;
        }
    }
    private async requestGETPostsDanbooru(query: string, header: string): Promise<string> {
        const response = await fetch(`https://danbooru.donmai.us/posts.json?${query}`, { headers: { Authorization: "Basic " + header } }).then(checkError).then((response) => response.json());
        if (Object.keys(response).length) {
            if(response[0].id != undefined){
                return `https://danbooru.donmai.us/posts/${response[0].id}`;
            }
            return this.requestGETPostsDanbooru(query, header);  // rquest again when id is undefined 
        } 
        return "no data";
    }

    private async requestGETPostsSafebooru(query: string, header: string): Promise<string> {
        const response = await fetch(`https://safebooru.donmai.us/posts.json?${query}`, { headers: { Authorization: "Basic " + header } }).then(checkError).then((response) => response.json());
        if (Object.keys(response).length) {
            if(response[0].id != undefined){
                return `https://safebooru.donmai.us/posts/${response[0].id}`;
            }
            return this.requestGETPostsSafebooru(query, header);  // rquest again when id is undefined
        } 
        return "no data";
    }
}