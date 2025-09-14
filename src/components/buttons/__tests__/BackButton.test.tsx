import React from 'react';
import { render, screen } from '@testing-library/react';
import BackButton from '../BackButton';

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, width, height, ...props }: any) {
    return <img src={src} alt={alt} width={width} height={height} {...props} />;
  };
});

describe('BackButton Component', () => {
  describe('Rendering', () => {
    it('should render back arrow icon', () => {
      render(<BackButton />);

      const icon = screen.getByAltText('Back');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('src', '/static/icons/ArrowRight.svg');
      expect(icon).toHaveAttribute('width', '20');
      expect(icon).toHaveAttribute('height', '20');
    });

    it('should render back text', () => {
      render(<BackButton />);

      const text = screen.getByText('Back To Project');
      expect(text).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should have correct container classes', () => {
      render(<BackButton />);

      const container = screen.getByText('Back To Project').closest('div');
      expect(container).toHaveClass('flex', 'items-center', 'gap-2');
    });

    it('should have correct icon classes', () => {
      render(<BackButton />);

      const icon = screen.getByAltText('Back');
      expect(icon).toHaveClass('h-5', 'w-5', 'rotate-180');
    });

    it('should have correct text classes', () => {
      render(<BackButton />);

      const text = screen.getByText('Back To Project');
      expect(text).toHaveClass('text-sm', 'font-bold', 'text-indigo-600');
    });
  });

  describe('Accessibility', () => {
    it('should be accessible', () => {
      render(<BackButton />);

      expect(screen.getByAltText('Back')).toBeInTheDocument();
      expect(screen.getByText('Back To Project')).toBeInTheDocument();
    });

    it('should have proper alt text for icon', () => {
      render(<BackButton />);

      const icon = screen.getByAltText('Back');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Structure', () => {
    it('should render in correct order', () => {
      render(<BackButton />);

      const container = screen.getByText('Back To Project').closest('div');
      const children = Array.from(container?.children || []);

      expect(children).toHaveLength(2);
      expect(children[0]).toHaveClass('rotate-180'); // Icon
      expect(children[1]).toHaveTextContent('Back To Project'); // Text
    });
  });
});
