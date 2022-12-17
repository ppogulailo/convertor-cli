export class ConsoleLogger {
    static getInstance() {
        if (ConsoleLogger.logger) {
            ConsoleLogger.logger = new ConsoleLogger();
        }
        return ConsoleLogger.logger;
    }
    end() {
        console.log('End');
    }
    error(...args) {
        console.log('Error', ...args);
    }
    log(...args) {
        console.log(...args);
    }
}
