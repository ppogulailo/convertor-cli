import {ICommandExec} from "../core/exec/command.types";

export interface FfmpegTypes{
    width:number,
    height:number,
    path:string,
    name:string
}


export interface ICommandFfmpeg extends ICommandExec{
    output:string
}