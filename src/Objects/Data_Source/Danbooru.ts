import { injectable, inject } from "inversify";
import { TYPES } from "../../types";
import fetch from "node-fetch";
import querystring from "querystring";
import { DanbooruPost } from "./../../Interfaces/DanbooruPost";

//const ErrorChecker = require("./ErrorChecker");

@injectable()
export class Danbooru {
    private readonly _username: string;
    private readonly _api_key: string;
    constructor(
        @inject(TYPES.Danbooru_Username) username: string,
        @inject(TYPES.Danbooru_Key) api_key: string
    ) {
        this._username = username;
        this._api_key = api_key;
    }

    public async fetchRandomImage(candidate: string, search_from: string): Promise<DanbooruPost> {
        const AuthHeader: string = this._username + ":" + this._api_key;
        const query: string = querystring.stringify({
            tags: candidate + " 1girl",
            limit: "1",
            page: "1",
            random: "true"
        });
        switch (search_from) {
            case "Safebooru":
                var image: DanbooruPost = { danbooru_link : await this.requestGETPostsDanbooru(query, Buffer.from(AuthHeader).toString('base64')) };
                return image;
            default:
                var image: DanbooruPost = { danbooru_link : await this.requestGETPostsSafebooru(query, Buffer.from(AuthHeader).toString('base64')) };
                return image;
        }
    }

    public async requestGETPostsDanbooru(query: string, header: string): Promise<string> {
        const response = await fetch(`https://danbooru.donmai.us/posts.json?${query}`, { headers: { Authorization: "Basic " + header } }).then(ErrorChecker.checkError).then((response) => response.json());
        if (Object.keys(response).length) {
            return `https://danbooru.donmai.us/posts/${response[0].id}`;
        } else {
            return "no data";
        }
    }

    public async requestGETPostsSafebooru(query: string, header: string): Promise<string> {
        const response = await fetch(`https://safebooru.donmai.us/posts.json?${query}`, { headers: { Authorization: "Basic " + header } }).then(ErrorChecker.checkError).then((response) => response.json());
        if (Object.keys(response).length) {
            return `https://safebooru.donmai.us/posts/${response[0].id}`;
        } else {
            return "no data";
        }
    }
}