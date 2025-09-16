import {
  getHeaderStyle,
  calculateCounts,
  calculateProgress,
  getColorConfig,
  clamp,
} from '../taskHelpers';

describe('taskHelpers', () => {
  describe('getHeaderStyle', () => {
    it('should return completed styles for completed status', () => {
      const result = getHeaderStyle('completed');
      expect(result).toEqual({
        dot: 'bg-emerald-500',
        chip: 'bg-emerald-100 text-emerald-600',
      });
    });

    it('should return in_progress styles for in_progress status', () => {
      const result = getHeaderStyle('in_progress');
      expect(result).toEqual({
        dot: 'bg-amber-500',
        chip: 'bg-amber-100 text-amber-600',
      });
    });

    it('should return todo styles for todo status', () => {
      const result = getHeaderStyle('todo');
      expect(result).toEqual({
        dot: 'bg-indigo-600',
        chip: 'bg-indigo-100 text-indigo-600',
      });
    });
  });

  describe('calculateCounts', () => {
    it('should calculate counts for numeric ID', () => {
      const result = calculateCounts(1);
      expect(result).toHaveProperty('comments');
      expect(result).toHaveProperty('checks');
      expect(typeof result.comments).toBe('number');
      expect(typeof result.checks).toBe('number');
      expect(result.comments).toBeGreaterThan(0);
      expect(result.checks).toBeGreaterThan(0);
    });

    it('should calculate counts for string ID', () => {
      const result = calculateCounts('temp-123');
      expect(result).toHaveProperty('comments');
      expect(result).toHaveProperty('checks');
      expect(typeof result.comments).toBe('number');
      expect(typeof result.checks).toBe('number');
    });

    it('should return consistent results for same ID', () => {
      const result1 = calculateCounts(5);
      const result2 = calculateCounts(5);
      expect(result1).toEqual(result2);
    });

    it('should handle string IDs with temp- prefix', () => {
      const numericResult = calculateCounts(100);
      const stringResult = calculateCounts('temp-100');
      expect(numericResult).toEqual(stringResult);
    });
  });

  describe('calculateProgress', () => {
    it('should return 100 for completed status', () => {
      expect(calculateProgress('completed', 1)).toBe(100);
      expect(calculateProgress('completed', 'temp-123')).toBe(100);
    });

    it('should return value between 40-79 for in_progress status', () => {
      const progress = calculateProgress('in_progress', 1);
      expect(progress).toBeGreaterThanOrEqual(40);
      expect(progress).toBeLessThan(80);
    });

    it('should return value between 5-24 for todo status', () => {
      const progress = calculateProgress('todo', 1);
      expect(progress).toBeGreaterThanOrEqual(5);
      expect(progress).toBeLessThan(25);
    });

    it('should handle string IDs', () => {
      const numericProgress = calculateProgress('in_progress', 10);
      const stringProgress = calculateProgress('in_progress', 'temp-10');
      expect(numericProgress).toBe(stringProgress);
    });
  });

  describe('getColorConfig', () => {
    it('should return success variant for completed status', () => {
      const result = getColorConfig('completed');
      expect(result).toEqual({
        chipBg: 'bg-emerald-100',
        chipText: 'text-emerald-600',
        variant: 'success',
      });
    });

    it('should return warning variant for in_progress status', () => {
      const result = getColorConfig('in_progress');
      expect(result).toEqual({
        chipBg: 'bg-amber-100',
        chipText: 'text-amber-600',
        variant: 'warning',
      });
    });

    it('should return brand variant for todo status', () => {
      const result = getColorConfig('todo');
      expect(result).toEqual({
        chipBg: 'bg-indigo-100',
        chipText: 'text-indigo-600',
        variant: 'brand',
      });
    });
  });

  describe('clamp', () => {
    it('should return value when within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(7.8, 0, 10)).toBe(8); // rounded
    });

    it('should clamp to minimum when value is below range', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(-100, 5, 15)).toBe(5);
    });

    it('should clamp to maximum when value is above range', () => {
      expect(clamp(15, 0, 10)).toBe(10);
      expect(clamp(100, 5, 15)).toBe(15);
    });

    it('should round decimal values', () => {
      expect(clamp(5.7, 0, 10)).toBe(6);
      expect(clamp(5.2, 0, 10)).toBe(5);
    });

    it('should handle edge cases', () => {
      expect(clamp(0, 0, 0)).toBe(0);
      expect(clamp(5, 5, 5)).toBe(5);
    });
  });
});
