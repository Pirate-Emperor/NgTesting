import {isEmpty} from './object.helper';

describe('ObjectHelper', () => {

  describe('isEmpty', () => {
    it('should return true when data is null', () => {
      expect(isEmpty(null)).toBe(true);
    });

    it('should return true when data is undefined', () => {
      expect(isEmpty(undefined)).toBe(true);
    });

    it('should return true when data is empty string', () => {
      expect(isEmpty('')).toBe(true);
    });

    it('should return true when data is string with only spaces', () => {
      expect(isEmpty(' ')).toBe(true);
    });

    it('should return true when data is empty array', () => {
      expect(isEmpty([])).toBe(true);
    });

    it('should return false when data is not null or undefined', () => {
      expect(isEmpty(1)).toBe(false);
    });

    it('should return false when data is zero', () => {
      expect(isEmpty(0)).toBe(false);
    });

    it('should return false when data is an object', () => {
      expect(isEmpty({})).toBe(false);
    });

    it('should return false when data is not empty string', () => {
      expect(isEmpty('a')).toBe(false);
    });

    it('should return false when data is not empty array', () => {
      expect(isEmpty([1])).toBe(false);
    });
  });

});
