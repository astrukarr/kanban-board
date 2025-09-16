import React from 'react';
import { render, screen } from '@testing-library/react';
import ExportButton from '../ExportButton';

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

describe('ExportButton Component', () => {
  describe('Rendering', () => {
    it('should render button with correct attributes', () => {
      render(<ExportButton />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should render export text', () => {
      render(<ExportButton />);

      const text = screen.getByText('Export Data');
      expect(text).toBeInTheDocument();
    });

    it('should render export icon', () => {
      render(<ExportButton />);

      const icon = screen.getByAltText('Export Data');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('src', '/static/icons/ExportData.svg');
      expect(icon).toHaveAttribute('width', '20');
      expect(icon).toHaveAttribute('height', '20');
    });
  });

  describe('Styling', () => {
    it('should have correct button classes', () => {
      render(<ExportButton />);

      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'inline-flex',
        'h-12',
        'min-h-12',
        'items-center',
        'gap-2',
        'rounded-full',
        'bg-indigo-600',
        'px-5',
        'text-white',
        'font-semibold',
        'cursor-pointer'
      );
    });

    it('should have correct icon classes', () => {
      render(<ExportButton />);

      const icon = screen.getByAltText('Export Data');
      expect(icon).toHaveClass('h-5', 'w-5');
    });

    it('should have aria-hidden on icon', () => {
      render(<ExportButton />);

      const icon = screen.getByAltText('Export Data');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Structure', () => {
    it('should render text before icon', () => {
      render(<ExportButton />);

      const button = screen.getByRole('button');
      const children = Array.from(button.children);

      expect(children).toHaveLength(2);
      expect(children[0]).toHaveTextContent('Export Data'); // Text first
      expect(children[1]).toHaveAttribute('alt', 'Export Data'); // Icon second
    });
  });

  describe('Accessibility', () => {
    it('should be accessible', () => {
      render(<ExportButton />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should have proper button role', () => {
      render(<ExportButton />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should have aria-hidden on decorative icon', () => {
      render(<ExportButton />);

      const icon = screen.getByAltText('Export Data');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Content', () => {
    it('should display correct text', () => {
      render(<ExportButton />);

      expect(screen.getByText('Export Data')).toBeInTheDocument();
    });

    it('should use correct icon source', () => {
      render(<ExportButton />);

      const icon = screen.getByAltText('Export Data');
      expect(icon).toHaveAttribute('src', '/static/icons/ExportData.svg');
    });
  });
});
