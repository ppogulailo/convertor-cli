export class StreamHandler {
    constructor(outHandler) {
        this.outHandler = outHandler;
    }
    processOutput(stream) {
        stream.stdout.on('data', (data) => {
            this.outHandler.log(data.toString());
        });
        stream.stderr.on('data', (data) => {
            this.outHandler.error(data.toString());
        });
        stream.on('close', () => {
            this.outHandler.end();
        });
    }
}
