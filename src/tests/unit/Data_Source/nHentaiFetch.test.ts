import { nHentai } from "./../../../Objects/Data_Source/nHentai";
import { expect } from "chai";

describe("nHentaiWebService Test", () => {
    let nHentaiWebService : nHentai;

    beforeEach(() => {
        nHentaiWebService = new nHentai();
    });

    describe("execute HTTP request to nhentai to fetch data of doujin ID : 177013", () => {
        it("should fetch data of [ShindoLA] METAMORPHOSIS (Complete) [English]", async () => {
            // Arrange 
            let code = "177013";

            // Act 
            let result = await nHentaiWebService.fetchDoujin(code);

            // Assert
            expect(result.id).to.equal(177013);
            expect(result.title.english).to.equal("[ShindoLA] METAMORPHOSIS (Complete) [English]");

        });
        
    });
});