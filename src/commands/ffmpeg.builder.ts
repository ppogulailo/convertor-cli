export class FfmpegBuilder {
    // @ts-ignore
    private inputPath: string
    // @ts-ignore
    private outputPath: string
    private options: Map<string, string> = new Map()

    constructor() {
        this.options.set('-c:v', 'libx264')
    }


    input(inputPath: string): this {
        this.inputPath = inputPath
        return this
    }


    setVideoSize(width: number, height: number): this {
        this.options.set('-s', `${width}x${height}`);
        return this
    }


    output(outputPath: string): string[] {
        this.outputPath = outputPath
        if (!this.outputPath) {
            throw new Error('No any optput')
        }
        const args: string[] = ['-i', this.outputPath];
        this.options.forEach((value, key, map) => {
            args.push(key)
            args.push(value)
        })
        args.push(outputPath)
        return args
    }
}