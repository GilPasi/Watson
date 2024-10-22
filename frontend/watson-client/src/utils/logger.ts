export enum LogLevel {
  CRITICAL,
  ERROR,
  WARNING,
  INFO,
  DEBUG
}

export class Logger {
  logLevel: LogLevel;

  constructor(logLevel: LogLevel = LogLevel.INFO) {
    this.logLevel = logLevel;
  }

  logFunctionStart(runningFunction: Function) {
    if (this.logLevel === LogLevel.DEBUG) {
      console.debug(`Starts ${runningFunction.name}`);
    }
  }

  logFunctionEnd(runningFunction: Function) {
    if (this.logLevel === LogLevel.DEBUG) {
      console.debug(`Ends ${runningFunction.name}`);
    }
  }

  logVariableInitilization(...variables: any) {
    if (this.logLevel === LogLevel.DEBUG) {
        console.debug("Initializing variables")
        for (let i = 0; i < variables.length; i++)
        {
            console.log(`Variable ${i + 1}: ${variables[i]}`)
        }
    }
  }
}
