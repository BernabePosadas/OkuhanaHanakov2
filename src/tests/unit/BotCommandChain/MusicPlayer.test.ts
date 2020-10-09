import { Message } from "discord.js";
import { anything, instance, mock, verify } from "ts-mockito";
import { MusicPlayerCommandChain } from "../../../BotCommandChain/3ndChain_MusicPlayer";
import { IMusicControl } from "../../../Models/Interfaces/IMusicPlayerControl";
import { MockCommandChain } from "../../mocks/MockCommandChain";

describe("MusicPlayerCommandChain Unit Tests", () => {
    let sut : MusicPlayerCommandChain;

    let mockedControl : IMusicControl;
    let mockedCommandChain : MockCommandChain;
    let mockedMessage : Message;

    let instanceMockedControl : IMusicControl;
    let instanceMockedChain : MockCommandChain;
    let instanceMockedMessage : Message;

    beforeEach(() => {
        mockedControl = mock<IMusicControl>();
        mockedCommandChain = mock(MockCommandChain);
        mockedMessage = mock(Message);

        instanceMockedControl = instance(mockedControl);
        instanceMockedChain = instance(mockedCommandChain);
        instanceMockedMessage = instance(mockedMessage);

        sut = new MusicPlayerCommandChain(instanceMockedControl, instanceMockedChain);
    });
    
    describe("executeChain method", () => {
        it("When method is called with command 'play', Should call IMusicControl.addToQueue() once", () => {
            // Arrange
            let command = "play";

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedControl.addToQueue(instanceMockedMessage)).once();
        });

        it("When method is called with command 'skip', Should call IMusicControl.handleOtherMusicCommands() once", () => {
            // Arrange
            let command = "skip";

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedControl.handleOtherMusicCommands(instanceMockedMessage, anything())).once();
        });

        it("When method is called with command 'stop', Should call IMusicControl.handleOtherMusicCommands() once", () => {
            // Arrange
            let command = "stop";

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedControl.handleOtherMusicCommands(instanceMockedMessage, anything())).once();
        });

        it("When method is called with command 'pause', Should call IMusicControl.handleOtherMusicCommands() once", () => {
            // Arrange
            let command = "pause";

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedControl.handleOtherMusicCommands(instanceMockedMessage, anything())).once();
        });

        it("When method is called with command 'resume', Should call IMusicControl.handleOtherMusicCommands() once", () => {
            // Arrange
            let command = "resume";

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedControl.handleOtherMusicCommands(instanceMockedMessage, anything())).once();
        });

        it("When method is called with command 'back', Should call IMusicControl.handleOtherMusicCommands() once", () => {
            // Arrange
            let command = "back";

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedControl.handleOtherMusicCommands(instanceMockedMessage, anything())).once();
        });

        it("When method is called with command 'togglerepeat', Should call IMusicControl.handleOtherMusicCommands() once", () => {
            // Arrange
            let command = "togglerepeat";

            // Act
            sut.executeChain(instanceMockedMessage, command);

            // Assert
            verify(mockedControl.handleOtherMusicCommands(instanceMockedMessage, anything())).once();
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