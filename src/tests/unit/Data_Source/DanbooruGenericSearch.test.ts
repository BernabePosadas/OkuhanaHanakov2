require('dotenv').config();
import { Danbooru } from "../../../Objects/Data_Source/Danbooru";
import { expect } from "chai";

describe("DanbooruWebService Test", () => {
    let DanbooruWebService : Danbooru;

    beforeEach(() => {
        DanbooruWebService = new Danbooru();
    });

    describe("execute HTTP request to danbooru to fetch data of non existing tag : wew", () => {
        it("should return \'No Data\'", async () => {
            // Arrange 
            let search = "wew";

            // Act 
            let result = await DanbooruWebService.fetchRandomImageGeneric(search, "danbooru");

            // Assert
            expect(result.danbooru_link).to.equal("no data");

        });
        
    });
});