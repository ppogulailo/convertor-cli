import {IStream} from "../../core/handlers/stream.interface";

export class ConsoleLogger implements IStream {
    private static logger: ConsoleLogger

    public static getInstance() {
        if (ConsoleLogger.logger) {
            ConsoleLogger.logger = new ConsoleLogger()
        }
        return ConsoleLogger.logger
    }

    end(): void {
        console.log('End')
    }

    error(...args: any): void {
        console.log('Error', ...args)
    }

    log(...args: any): void {
        console.log(...args)
    }

}