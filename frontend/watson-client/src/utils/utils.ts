import {Logger, LogLevel} from '@/utils/logger'

const loggerInstance = new Logger(LogLevel.DEBUG)

export function getLoggerInstance(): Logger
{
    return loggerInstance
}


export function allocateBooleanMatrix(width: number, height: number): boolean[][] {
    const booleanMatrix: boolean[][] = new Array(height);

    for (let i = 0; i < height; i++) {
        booleanMatrix[i] = new Array(width).fill(false);
    }

    return booleanMatrix;
}