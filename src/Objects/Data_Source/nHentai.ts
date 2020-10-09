import { injectable } from "inversify";
import fetch from "node-fetch";
import { checkError } from "../Validators/HTTPErrorChecker";

@injectable()
export class nHentai {
    public async fetchDoujin(query : string) : Promise<any>{
        const response = await fetch(`https://nhentai.net/api/gallery/${query}`).then(checkError).then((response) => response.json());
        return response;
    }
}
