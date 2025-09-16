import { getStatusColor, getProjectColor, getStatColor } from '../colorHelpers';

describe('colorHelpers', () => {
  describe('getStatusColor', () => {
    it('should return correct color classes for active status', () => {
      expect(getStatusColor('active')).toBe('bg-emerald-100 text-emerald-600');
    });

    it('should return correct color classes for planning status', () => {
      expect(getStatusColor('planning')).toBe('bg-amber-100 text-amber-600');
    });

    it('should return correct color classes for completed status', () => {
      expect(getStatusColor('completed')).toBe('bg-slate-100 text-slate-600');
    });

    it('should return default color classes for unknown status', () => {
      expect(getStatusColor('unknown')).toBe('bg-slate-100 text-slate-600');
    });

    it('should return default color classes for empty string', () => {
      expect(getStatusColor('')).toBe('bg-slate-100 text-slate-600');
    });
  });

  describe('getProjectColor', () => {
    it('should return correct color classes for indigo', () => {
      expect(getProjectColor('indigo')).toBe('bg-indigo-100');
    });

    it('should return correct color classes for emerald', () => {
      expect(getProjectColor('emerald')).toBe('bg-emerald-100');
    });

    it('should return correct color classes for blue', () => {
      expect(getProjectColor('blue')).toBe('bg-blue-100');
    });

    it('should return correct color classes for purple', () => {
      expect(getProjectColor('purple')).toBe('bg-purple-100');
    });

    it('should return correct color classes for orange', () => {
      expect(getProjectColor('orange')).toBe('bg-orange-100');
    });

    it('should return correct color classes for teal', () => {
      expect(getProjectColor('teal')).toBe('bg-teal-100');
    });

    it('should return default color classes for unknown color', () => {
      expect(getProjectColor('unknown')).toBe('bg-slate-100');
    });

    it('should return default color classes for empty string', () => {
      expect(getProjectColor('')).toBe('bg-slate-100');
    });
  });

  describe('getStatColor', () => {
    it('should return correct color classes for indigo', () => {
      expect(getStatColor('indigo')).toBe('bg-indigo-100');
    });

    it('should return correct color classes for emerald', () => {
      expect(getStatColor('emerald')).toBe('bg-emerald-100');
    });

    it('should return correct color classes for blue', () => {
      expect(getStatColor('blue')).toBe('bg-blue-100');
    });

    it('should return correct color classes for purple', () => {
      expect(getStatColor('purple')).toBe('bg-purple-100');
    });

    it('should return correct color classes for orange', () => {
      expect(getStatColor('orange')).toBe('bg-orange-100');
    });

    it('should return correct color classes for teal', () => {
      expect(getStatColor('teal')).toBe('bg-teal-100');
    });

    it('should return default color classes for unknown color', () => {
      expect(getStatColor('unknown')).toBe('bg-slate-100');
    });

    it('should return default color classes for empty string', () => {
      expect(getStatColor('')).toBe('bg-slate-100');
    });
  });
});
