import { Message } from "discord.js";
import { anything, instance, mock, verify } from "ts-mockito";
import { nHentaiCommandChain } from "../../../BotCommandChain/2ndChain_nHentai";
import { nHentaiDoujin } from "../../../Objects/nHentaiDoujin/nHentaiDoujin";
import { MockCommandChain } from "../../mocks/MockCommandChain";

describe("nHentaiCommandChain Unit Tests", () => {
    let sut : nHentaiCommandChain;
    let instanceMockedDoujin : nHentaiDoujin;
    let instanceMockedCommandChain : MockCommandChain;
    let instanceMockedMessage : Message;

    let mockedNHentaiDoujin : nHentaiDoujin;
    let mockedMessage : Message;
    let mockedCommandChain : MockCommandChain;

    beforeEach(() => {
        mockedNHentaiDoujin = mock(nHentaiDoujin);
        mockedMessage = mock(Message);
        mockedCommandChain = mock(MockCommandChain);

        instanceMockedDoujin = instance(mockedNHentaiDoujin);
        instanceMockedCommandChain = instance(mockedCommandChain);
        instanceMockedMessage = instance(mockedMessage);
        
        sut = new nHentaiCommandChain(instanceMockedDoujin, instanceMockedCommandChain);
    });

    describe("executeChain method", () => {
        it("When method is called with command 'launchnuke', Should call nHentaiDoujin.searchAndServeDoujin() once", () => {
            // Arrange
            let command = "launchnuke";

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedNHentaiDoujin.searchAndServeDoujin(instanceMockedMessage, anything())).once();
        });
        
        it("When method is called with command 'doujintags', Should call nHentaiDoujin.searchAndServeDoujin() once", () => {
            // Arrange
            let command = "doujintags";

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedNHentaiDoujin.searchAndServeDoujin(instanceMockedMessage, anything())).once();
        });

        it("When method is called with invalid command, Should call CommandChain.executeChain() once", () => {
            // Arrange
            let command = "";

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedCommandChain.executeChain(instanceMockedMessage, anything())).once();
        });
    });
});
