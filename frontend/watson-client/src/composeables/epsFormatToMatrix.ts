import { allocateBooleanMatrix, getLoggerInstance } from '../utils/utils';
import {InvalidEpsException, NoQrInEpsException} from '@/utils/exceptions/EpsExceptions'
import { Logger } from '@/utils/logger'

const logger: Logger = getLoggerInstance()

export function countOccurrences(data: string, pattern: string): number {
  return (data.match(new RegExp(pattern, 'g')) || []).length;
}

export function assertPatternCount(data: string, pattern: string, allowedRange: [number, number] | number) {
  const patternsCount: number = countOccurrences(data, pattern);

  if (typeof allowedRange === 'number') {
    if (patternsCount !== allowedRange) {
      throw new TypeError(`There are ${patternsCount} instances of the pattern "${pattern}" while only ${allowedRange} are allowed`);
    }
  } else if (Array.isArray(allowedRange)) {
    if (patternsCount < allowedRange[0] || patternsCount > allowedRange[1]) {
      throw new TypeError(`There are ${patternsCount} instances
         of the pattern ${pattern} while only a number in the range ${allowedRange} is allowed`);
    }
  }
}

export function extractDrawData(data: string): string {
  logger.logFunctionStart(extractDrawData)
  const START_DELIMITER = "newpath"
  const END_DELIMITER = "closepath"
  logger.logVariableInitilization(data)
  assertPatternCount(data, START_DELIMITER, 1)
  assertPatternCount(data, END_DELIMITER, 1)
  return data.split(START_DELIMITER)[1].split(END_DELIMITER)[0]
}

//TODO: test the following methods:
type EightList = [number, number, number, number, number, number, number, number] | [];

export function parseCoordinates(data: string): EightList{
  logger.logFunctionStart(parseCoordinates)
  const regex = /\d+/g; // Regular expression to match numbers
  const matches = data.match(regex); 
  const RECTANGLE_COORDINATES_COUNT = 8 // 4 X coordinates + 4 Y coordinates
  
  console.log(`matches is ${matches} and data is ${data}`)
  console.log(`has enough coordinates ${(matches && matches.length === RECTANGLE_COORDINATES_COUNT)}`)
  if (matches && matches.length === RECTANGLE_COORDINATES_COUNT ) {
    return matches.slice(0, RECTANGLE_COORDINATES_COUNT).map(Number) as EightList;
  }


  return [] as EightList;
}

export function isCircularCoordinate(coordinates: number[]): boolean
{
  const OSCILATOR_SIGN = -1 
  let oscillatingSumXCoordinate:number = 0 // Like an oscillating series
  let oscillatingSumYCoordinate:number = 0 // Like an oscillating series

  let sign = 1

  for(let i = 0; i < coordinates.length; i += 2)
  {
    oscillatingSumXCoordinate += (sign * coordinates[i])
    oscillatingSumYCoordinate += (sign * coordinates[i + 1])
    sign *= OSCILATOR_SIGN

  }

  return oscillatingSumXCoordinate === 0 && oscillatingSumYCoordinate === 0;
}

export function extractEpsDimensions(epsContent: string): { width: number, height: number } | null {
  const boundingBoxRegex = /%%BoundingBox:\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/;
  const match = epsContent.match(boundingBoxRegex);

  if (match) {
      const lowerLeftX = parseInt(match[1], 10);
      const lowerLeftY = parseInt(match[2], 10);
      const upperRightX = parseInt(match[3], 10);
      const upperRightY = parseInt(match[4], 10);

      const width = upperRightX - lowerLeftX;
      const height = upperRightY - lowerLeftY;

      return { width, height };
  } else {
      return null;
  }
}

export function extractMatrix(dimensions: { width: number; height: number; } | null): boolean[][] {
  if (dimensions) {
    const { width, height } = dimensions;
    const matrix: boolean[][] = allocateBooleanMatrix(width, height);
    return matrix
  }
  else {
    throw new InvalidEpsException;
  }
}

export function parseEpsInstructionsToMatrix(data: string): boolean[][]{// Throws EPS exceptions
  logger.logFunctionStart(parseEpsInstructionsToMatrix)
  const dimensions: {width: number, height: number} | null = extractEpsDimensions(data)
  const matrix: boolean[][] = extractMatrix(dimensions);


  const RECTANGLE_DELIMITER: string = 'moveto'
  logger.logVariableInitilization(data)
  const cleanData: string = extractDrawData(data)
  const tokens: string[] = cleanData.split(RECTANGLE_DELIMITER)

  /* Skip the first element since it is necessarily not a rectangle
      for example "0 0" is the first element :
      0 0 moveto
      1 0 lineto
      1 1 lineto
      0 1 lineto
      0 0 lineto
      1 0 moveto
      2 0 lineto
      2 1 lineto
      1 1 lineto
      1 0 lineto
      2 0 moveto
  */

  for (let i: number = 1; i < tokens.length; i++)
  {    
    console.log("HERE")
    const coordinates: EightList = parseCoordinates(tokens[i])
    if (! isCircularCoordinate(coordinates) || coordinates.length === 0 )
    {
      throw new NoQrInEpsException()
    }
    else
    {
      matrix[coordinates[0]][coordinates[1]] = true
    }
  } 
  
  return matrix;
}


