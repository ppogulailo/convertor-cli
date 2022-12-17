

export interface IStream {
    log(...args: any): void

    error(...args: any): void

    end(): void
}