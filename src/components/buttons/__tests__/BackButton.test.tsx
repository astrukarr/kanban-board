import React from 'react';
import { render, screen } from '@testing-library/react';
import BackButton from '../BackButton';

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    width,
    height,
    ...props
  }: React.ComponentProps<'img'>) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} {...props} />;
  };
});

describe('BackButton Component', () => {
  describe('Rendering', () => {
    it('should render back arrow icon', () => {
      const { container } = render(<BackButton />);

      const icon = container.querySelector('img');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('src', '/static/icons/ArrowRight.svg');
      expect(icon).toHaveAttribute('width', '20');
      expect(icon).toHaveAttribute('height', '20');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('should render back text', () => {
      render(<BackButton />);

      const text = screen.getByText('Back To Project');
      expect(text).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should have correct button classes', () => {
      render(<BackButton />);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('flex', 'items-center', 'gap-2', 'rounded-md');
    });

    it('should have correct icon classes', () => {
      const { container } = render(<BackButton />);

      const icon = container.querySelector('img');
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

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Back to project');
      expect(screen.getByText('Back To Project')).toBeInTheDocument();
    });

    it('should have aria-hidden on decorative icon', () => {
      const { container } = render(<BackButton />);

      const icon = container.querySelector('img');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Structure', () => {
    it('should render in correct order', () => {
      render(<BackButton />);

      const button = screen.getByRole('button');
      const children = Array.from(button.children);

      expect(children).toHaveLength(2);
      expect(children[0]).toHaveClass('rotate-180'); // Icon
      expect(children[1]).toHaveTextContent('Back To Project'); // Text
    });
  });
});
