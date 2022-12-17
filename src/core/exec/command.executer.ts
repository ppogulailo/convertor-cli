import {IStream} from "../handlers/stream.interface";
import {ChildProcessWithoutNullStreams} from "child_process";
import {ICommandExec} from "./command.types";


export abstract class CommandExecuter<Input> {
    constructor(private logger: IStream) {
    }


    public async execute() {
        const input = await this.prompt()
        const command= this.build(input)
        const stream= this.spawn(command)
        this.processStream(stream,this.logger)
    }

    protected abstract prompt(): Promise<Input>

    protected abstract build(input:Input):ICommandExec

    protected abstract spawn(command:any): ChildProcessWithoutNullStreams

    protected abstract processStream(stream:ChildProcessWithoutNullStreams,logger:IStream): void
}