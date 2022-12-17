import {IStream} from "./stream.interface";
import { ChildProcessWithoutNullStreams} from "child_process";

export class StreamHandler{
    constructor(private outHandler:IStream) {
    }
    processOutput(stream:ChildProcessWithoutNullStreams){
        stream.stdout.on('data',(data:any)=>{
            this.outHandler.log(data.toString())
        })
        stream.stderr.on('data',(data:any)=>{
            this.outHandler.error(data.toString())
        })
        stream.on('close',()=>{
            this.outHandler.end()
        })
    }
}