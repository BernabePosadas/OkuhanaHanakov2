import fetch from "node-fetch";
import { checkError } from "./../HTTPErrorChecker";

export class nHentai {
    public async fetchDoujin(query : string) : Promise<any>{
        const response = await fetch(`https://nhentai.net/api/gallery/${query}`).then(checkError).then((response) => response.json());
        return response;
    }
}
