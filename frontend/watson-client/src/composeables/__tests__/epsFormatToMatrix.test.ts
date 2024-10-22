
import { describe, it, expect } from 'vitest';
import { countOccurrences, assertPatternCount, extractDrawData } from '../epsFormatToMatrix'
import { InvalidEpsException, NoQrInEpsException } from '@/utils/exceptions/EpsExceptions'
import * as epsFormatMstrix from '../epsFormatToMatrix'; 

const { parseCoordinates,
  isCircularCoordinate,
  extractEpsDimensions,
  parseEpsInstructionsToMatrix
} = epsFormatMstrix

describe('countOccurrences', () => {
  it('should return the correct number of occurrences of a pattern', () => {
    const data = "hello world, hello universe";
    const pattern = "hello";
    expect(countOccurrences(data, pattern)).toBe(2);
  });

  it('should return 0 when the pattern is not found', () => {
    const data = "hello world";
    const pattern = "goodbye";
    expect(countOccurrences(data, pattern)).toBe(0);
  });

  it('should handle special characters in the pattern', () => {
    const data = "a.b.c.a.b.c";
    const pattern = "\\.";
    expect(countOccurrences(data, pattern)).toBe(5); // Matching periods (.)
  });
});

describe('assertPatternCount', () => {
  it('should not throw an error when pattern count matches the single allowed number', () => {
    const data = "start and start";
    const pattern = "start";
    expect(() => assertPatternCount(data, pattern, 2)).not.toThrow();
  });

  it('should throw an error when pattern count does not match the single allowed number', () => {
    const data = "start and start";
    const pattern = "start";
    expect(() => assertPatternCount(data, pattern, 1)).toThrow(TypeError);
  });

  it('should not throw an error when pattern count is within the allowed range', () => {
    const data = "start and start";
    const pattern = "start";
    expect(() => assertPatternCount(data, pattern, [1, 2])).not.toThrow();
  });

  it('should throw an error when pattern count is outside the allowed range', () => {
    const data = "start and start and start";
    const pattern = "start";
    expect(() => assertPatternCount(data, pattern, [1, 2])).toThrow(TypeError);
  });
});

describe('extractDrawData', () => {
  it('should extract the data between newpath and closepath', () => {
    const data = `
      %!PS-Adobe EPSF-3.0
      newpath
      0 0 moveto
      1 0 lineto
      1 1 lineto
      closepath
      fill
    `;
    const result = extractDrawData(data);
    const expectedData = `
      0 0 moveto
      1 0 lineto
      1 1 lineto
    `;
    expect(result.trim()).toEqual(expectedData.trim());
  });

  it('should throw an error if there is more than one newpath', () => {
    const data = `
      newpath
      0 0 moveto
      newpath
      1 0 lineto
      closepath
    `;
    expect(() => extractDrawData(data)).toThrow(TypeError);
  });

  it('should throw an error if there is more than one closepath', () => {
    const data = `
      newpath
      0 0 moveto
      closepath
      closepath
    `;
    expect(() => extractDrawData(data)).toThrow(TypeError);
  });

  it('should throw an error if there is no newpath or closepath', () => {
    const data = `
      0 0 moveto
      1 0 lineto
    `;
    expect(() => extractDrawData(data)).toThrow(TypeError);
  });
});

describe('parseCoordinates', () => {
  it('should return a valid EightList when correct number of coordinates are found', () => {
    const data = "10 20 30 40 50 60 70 80";
    const result = parseCoordinates(data);
    expect(result).toEqual([10, 20, 30, 40, 50, 60, 70, 80]);
  });

  it('should return an empty array if there are not enough coordinates', () => {
    const data = "10 20 30";
    const result = parseCoordinates(data);
    expect(result).toEqual([]);
  });

  it('should return an empty array if data is not numerical', () => {
    const data = "text instead of numbers";
    const result = parseCoordinates(data);
    expect(result).toEqual([]);
  });
});

describe('isCircularCoordinate', () => {
  it('should return true for oscillating coordinate set', () => {
    /**
     * (10,20) -- (20,20)
     *    |          |
     * (10,30) -- (20,30)
     */
    const coordinate = [10, 20, 20, 20, 20, 30, 10, 30];
    const result = isCircularCoordinate(coordinate);
    expect(result).toBe(true);
  });

  it('should return false for non-oscillating coordinate set', () => {
    const coordinate = [10, 20, 30, 40];
    const result = isCircularCoordinate(coordinate);
    expect(result).toBe(false);
  });
});

describe('extractEpsDimensions', () => {
  it('should return valid dimensions from EPS content with BoundingBox', () => {
    const epsContent = "%%BoundingBox: 0 0 200 100";
    const result = extractEpsDimensions(epsContent);
    expect(result).toEqual({ width: 200, height: 100 });
  });

  it('should return null if BoundingBox is not found', () => {
    const epsContent = "some random data";
    const result = extractEpsDimensions(epsContent);
    expect(result).toBeNull();
  });
});

describe('parseEpsInstructionsToMatrix', () => {
  // it('should return a valid boolean matrix with rectangles parsed', () => {
  //   const epsContent = `
  //     %%BoundingBox: 0 0 3 3
  //     newpath
  //     0 0 moveto
  //     1 0 lineto
  //     1 1 lineto
  //     0 1 lineto
  //     0 0 lineto
  //     2 2 moveto
  //     closepath
  //   `;
  //   const result = parseEpsInstructionsToMatrix(epsContent);
  //   expect(result).toEqual([
  //     [true, false, false],
  //     [false, false, false],
  //     [false, false, true]
  //   ]);
  // });

  it('should throw InvalidEpsException for missing dimensions', () => {
    const epsContent = `invalid data`;
    expect(() => parseEpsInstructionsToMatrix(epsContent)).toThrow(InvalidEpsException);
  });

  it('should throw NoQrInEpsException for invalid rectangles', () => {
    const epsContent = `
      %%BoundingBox: 0 0 3 3
      newpath
      0 0 moveto
      1 1 moveto
      closepath
    `;
    expect(() => parseEpsInstructionsToMatrix(epsContent)).toThrow(NoQrInEpsException);
  });
});

