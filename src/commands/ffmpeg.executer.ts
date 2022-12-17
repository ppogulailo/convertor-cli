import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {CommandExecuter} from "../core/exec/command.executer";
import {IStream} from "../core/handlers/stream.interface";
import {FfmpegTypes, ICommandFfmpeg} from "./ffmpeg.types";
import {FileService} from "../core/files/file.service";
import {PromptService} from "../core/prompt/prompt.service";
import {FfmpegBuilder} from "./ffmpeg.builder";
import {StreamHandler} from "../core/handlers/stream.handler";

export class FfmpegExecuter extends CommandExecuter<FfmpegTypes> {
    private fileService: FileService = new FileService()
    private promptService: PromptService = new PromptService()


    constructor(logger: IStream) {
        super(logger);
    }


    protected build({width, path, name, height}: FfmpegTypes): ICommandFfmpeg {
        const output = this.fileService.getFilePath(path, name, 'mp4')
        const args = (new FfmpegBuilder)
            .input(path)
            .setVideoSize(width, height)
            .output(output)
        return {command: 'ffmpeg', args, output}
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStream): void {
        const handler = new StreamHandler(logger)
        handler.processOutput(stream)
    }

    protected async prompt(): Promise<FfmpegTypes> {
        const width = await this.promptService.input<number>('Weight', 'number')
        const height = await this.promptService.input<number>('Height', 'number')
        const path = await this.promptService.input<string>('path to file', 'input')
        const name = await this.promptService.input<string>('Name', 'input')
        return {width, height, path, name}
    }

    protected spawn({output, command, args}: ICommandFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExist(output)
        return spawn(command, args)
    }

}