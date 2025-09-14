import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSkeleton from '../LoadingSkeleton';

describe('LoadingSkeleton Component', () => {
  describe('Rendering', () => {
    it('should render statCard variant', () => {
      const { container } = render(<LoadingSkeleton variant="statCard" />);

      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass(
        'bg-slate-200',
        'rounded-2xl',
        'p-6',
        'animate-pulse',
        'h-32'
      );
    });

    it('should render projectCard variant', () => {
      const { container } = render(<LoadingSkeleton variant="projectCard" />);

      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass(
        'bg-slate-200',
        'rounded-2xl',
        'p-6',
        'animate-pulse',
        'h-48'
      );
    });

    it('should render recentProject variant', () => {
      const { container } = render(<LoadingSkeleton variant="recentProject" />);

      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass(
        'bg-slate-200',
        'rounded-xl',
        'p-4',
        'animate-pulse',
        'h-24'
      );
    });

    it('should render emptyState variant', () => {
      const { container } = render(<LoadingSkeleton variant="emptyState" />);

      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass(
        'bg-slate-200',
        'rounded-2xl',
        'p-16',
        'animate-pulse',
        'h-64'
      );
    });

    it('should render board variant', () => {
      const { container } = render(<LoadingSkeleton variant="board" />);

      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass(
        'bg-slate-200',
        'rounded-2xl',
        'p-8',
        'animate-pulse',
        'h-64'
      );
    });

    it('should render default variant for unknown type', () => {
      const { container } = render(
        <LoadingSkeleton variant={'unknown' as any} />
      );

      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass(
        'bg-slate-200',
        'rounded',
        'animate-pulse',
        'h-16'
      );
    });
  });

  describe('Accessibility', () => {
    it('should be accessible', () => {
      const { container } = render(<LoadingSkeleton variant="statCard" />);

      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('should accept variant prop', () => {
      const { container, rerender } = render(
        <LoadingSkeleton variant="statCard" />
      );

      let skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass('h-32');

      rerender(<LoadingSkeleton variant="projectCard" />);
      skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass('h-48');
    });
  });
});
