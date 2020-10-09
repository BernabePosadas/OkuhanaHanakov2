import { Message, MessageFlags } from "discord.js";
import { anything, instance, mock, verify } from "ts-mockito";
import { BotMiscCommandChain } from "../../../BotCommandChain/4thChain_Misc";
import { MiscCommand } from "../../../Objects/Misc/MiscFuntions";

describe("BotMiscCommandChain Unit Test", () => {
    let sut : BotMiscCommandChain;

    let mockedMiscCommand : MiscCommand;
    let mockedMessage : Message;

    let instanceMockedMisc : MiscCommand;
    let instanceMockedMessage : Message;

    beforeEach(() => {
        mockedMiscCommand = mock(MiscCommand);
        mockedMessage = mock(Message);

        instanceMockedMisc = instance(mockedMiscCommand);
        instanceMockedMessage = instance(mockedMessage);

        sut = new BotMiscCommandChain(instanceMockedMisc);
    });
    
    describe("executeChain method", () => {
        it("When method is called with command 'help', Should call MiscCommand.viewAvailCommands() once", () => {
            // Arrange
            let command = "help";

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedMiscCommand.viewAvailCommands(instanceMockedMessage)).once();
        });

        it("When method is called with invalid command, Should call Message.reply() once", () => {
            // Arrange
            let command = "";

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedMessage.reply(anything())).once();
        });
    });
});
