var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { spawn } from "child_process";
import { CommandExecuter } from "../core/exec/command.executer";
import { FileService } from "../core/files/file.service";
import { PromptService } from "../core/prompt/prompt.service";
import { FfmpegBuilder } from "./ffmpeg.builder";
import { StreamHandler } from "../core/handlers/stream.handler";
export class FfmpegExecuter extends CommandExecuter {
    constructor(logger) {
        super(logger);
        this.fileService = new FileService();
        this.promptService = new PromptService();
    }
    build({ width, path, name, height }) {
        const output = this.fileService.getFilePath(path, name, 'mp4');
        const args = (new FfmpegBuilder)
            .input(path)
            .setVideoSize(width, height)
            .output(output);
        return { command: 'ffmpeg', args, output };
    }
    processStream(stream, logger) {
        return __awaiter(this, void 0, void 0, function* () {
            const handler = yield new StreamHandler(logger);
            handler.processOutput(stream);
        });
    }
    prompt() {
        return __awaiter(this, void 0, void 0, function* () {
            const width = yield this.promptService.input('Weight', 'number');
            const height = yield this.promptService.input('Height', 'number');
            const path = yield this.promptService.input('path to file', 'input');
            const name = yield this.promptService.input('Name', 'input');
            return { width, height, path, name };
        });
    }
    spawn({ output, command, args }) {
        this.fileService.deleteFileIfExist(output);
        return spawn(command, args);
    }
}
