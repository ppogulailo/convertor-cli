import {PromptService} from "./core/prompt/prompt.service";
import {FfmpegExecuter} from "./commands/ffmpeg.executer";
import {ConsoleLogger} from "./out/consol-logger/console-logger";


export class App{
   async run(){
     await new FfmpegExecuter(ConsoleLogger.getInstance()).execute();
    }
}
const app = new App()
app.run()