export class FfmpegBuilder {
    constructor() {
        this.options = new Map();
        this.options.set('-c:v', 'libx264');
    }
    input(inputPath) {
        this.inputPath = inputPath;
        return this;
    }
    setVideoSize(width, height) {
        this.options.set('-s', `${width}x${height}`);
        return this;
    }
    output(outputPath) {
        this.outputPath = outputPath;
        if (!this.outputPath) {
            throw new Error('No any optput');
        }
        const args = ['-i', this.outputPath];
        this.options.forEach((value, key, map) => {
            args.push(key);
            args.push(value);
        });
        args.push(outputPath);
        return args;
    }
}
