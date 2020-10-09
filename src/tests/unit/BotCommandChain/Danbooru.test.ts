import { Message } from "discord.js";
import { anything, instance, mock, verify } from "ts-mockito";
import { DanbooruCommandChain } from "../../../BotCommandChain/1stChain_Danbooru";
import { Bow } from "../../../Objects/DanbooruImageRandomizer/Bow";
import { MockCommandChain } from "../../mocks/MockCommandChain";

describe("DanbooruCommandChain Unit Tests", () => {
    let sut : DanbooruCommandChain;

    let mockedBow : Bow;
    let mockedCommandChain : MockCommandChain;
    let mockedMessage : Message;

    let instanceMockedBow : Bow;
    let instanceMockedChain : MockCommandChain;
    let instanceMockedMessage : Message;

    beforeEach(() => {
        mockedBow = mock(Bow);
        mockedCommandChain = mock(MockCommandChain);
        mockedMessage = mock(Message);

        instanceMockedBow = instance(mockedBow);
        instanceMockedChain = instance(mockedCommandChain);
        instanceMockedMessage = instance(mockedMessage);

        sut = new DanbooruCommandChain(instanceMockedBow, instanceMockedChain);
    });


    describe("executeChain method", () => {
        it("When method is called with command 'killmark', Should call Bow.shootMark() once", () => {
            // Arrange
            let command = 'killmark';

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedBow.shootMark(instanceMockedMessage)).once();
        });

        it("When method is called with command 'killmaster', Should call Bow.shootBernabe() once", () => {
            // Arrange
            let command = 'killmaster';

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedBow.shootBernabe(instanceMockedMessage)).once();
        });
        
        it("When method is called with command 'killivan', Should call Bow.shootIvan() once", () => {
            // Arrange
            let command = 'killivan';

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedBow.shootIvan(instanceMockedMessage)).once();
        });
        
        it("When method is called with command 'omakaseshot', Should call Bow.omakaseShoot() once", () => {
            // Arrange
            let command = 'omakaseshot';

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedBow.omakaseShoot(instanceMockedMessage)).once();
        });

        it("When method is called with command 'ougi', Should call Bow.useOugi() once", () => {
            // Arrange
            let command = 'ougi';

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedBow.useOugi(instanceMockedMessage)).once();
        });

        it("When method is called with command 'danbooru', Should call Bow.doGenericDanbooruImageSearch() once", () => {
            // Arrange
            let command = 'danbooru';

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedBow.doGenericDanbooruImageSearch(instanceMockedMessage, anything())).once();
        });
        
        it("When method is called with command 'safebooru', Should call Bow.doGenericDanbooruImageSearch() once", () => {
            // Arrange
            let command = 'safebooru';

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedBow.doGenericDanbooruImageSearch(instanceMockedMessage, anything())).once();
        });

        it("When method is called with invalid command, Should call CommandChain.executeChain() once", () => {
            // Arrange
            let command = '';

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedCommandChain.executeChain(instanceMockedMessage, anything())).once();
        });
    });
});
