import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyState from '../EmptyState';

// Mock Next.js components
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

jest.mock('next/image', () => {
  return function MockImage({ src, alt, width, height, ...props }: any) {
    return <img src={src} alt={alt} width={width} height={height} {...props} />;
  };
});

describe('EmptyState Component', () => {
  const defaultProps = {
    title: 'No projects found',
    description: 'Create your first project to get started',
    button: {
      text: 'Create Project',
      href: '/dashboard',
    },
  };

  describe('Rendering', () => {
    it('should render title and description', () => {
      render(<EmptyState {...defaultProps} />);

      expect(screen.getByText('No projects found')).toBeInTheDocument();
      expect(
        screen.getByText('Create your first project to get started')
      ).toBeInTheDocument();
    });

    it('should render button with correct text and href', () => {
      render(<EmptyState {...defaultProps} />);

      const button = screen.getByText('Create Project');
      expect(button).toBeInTheDocument();
      expect(button.closest('a')).toHaveAttribute('href', '/dashboard');
    });

    it('should render project logo image', () => {
      render(<EmptyState {...defaultProps} />);

      const image = screen.getByAltText('No projects');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/static/icons/ProjectLogo.svg');
    });
  });

  describe('Styling', () => {
    it('should have correct container classes', () => {
      render(<EmptyState {...defaultProps} />);

      const container = screen.getByText('No projects found').closest('div');
      expect(container).toHaveClass('text-center', 'py-16');
    });

    it('should have correct image container classes', () => {
      render(<EmptyState {...defaultProps} />);

      const imageContainer = screen.getByAltText('No projects').closest('div');
      expect(imageContainer).toHaveClass(
        'w-24',
        'h-24',
        'bg-slate-100',
        'rounded-full',
        'flex',
        'items-center',
        'justify-center',
        'mx-auto',
        'mb-4'
      );
    });

    it('should have correct title classes', () => {
      render(<EmptyState {...defaultProps} />);

      const title = screen.getByText('No projects found');
      expect(title).toHaveClass(
        'text-xl',
        'font-semibold',
        'text-slate-800',
        'mb-2'
      );
    });

    it('should have correct description classes', () => {
      render(<EmptyState {...defaultProps} />);

      const description = screen.getByText(
        'Create your first project to get started'
      );
      expect(description).toHaveClass('text-slate-600', 'mb-6');
    });

    it('should have correct button classes', () => {
      render(<EmptyState {...defaultProps} />);

      const button = screen.getByText('Create Project');
      expect(button).toHaveClass(
        'px-6',
        'py-3',
        'bg-indigo-600',
        'text-white',
        'rounded-lg',
        'font-semibold',
        'hover:bg-indigo-700',
        'transition-colors'
      );
    });
  });

  describe('Props', () => {
    it('should accept custom title', () => {
      const customProps = {
        ...defaultProps,
        title: 'Custom Title',
      };

      render(<EmptyState {...customProps} />);

      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.queryByText('No projects found')).not.toBeInTheDocument();
    });

    it('should accept custom description', () => {
      const customProps = {
        ...defaultProps,
        description: 'Custom description text',
      };

      render(<EmptyState {...customProps} />);

      expect(screen.getByText('Custom description text')).toBeInTheDocument();
      expect(
        screen.queryByText('Create your first project to get started')
      ).not.toBeInTheDocument();
    });

    it('should accept custom button text and href', () => {
      const customProps = {
        ...defaultProps,
        button: {
          text: 'Custom Button',
          href: '/custom-path',
        },
      };

      render(<EmptyState {...customProps} />);

      const button = screen.getByText('Custom Button');
      expect(button).toBeInTheDocument();
      expect(button.closest('a')).toHaveAttribute('href', '/custom-path');
    });
  });

  describe('Accessibility', () => {
    it('should be accessible', () => {
      render(<EmptyState {...defaultProps} />);

      expect(screen.getByText('No projects found')).toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();
      expect(screen.getByAltText('No projects')).toBeInTheDocument();
    });

    it('should have proper heading structure', () => {
      render(<EmptyState {...defaultProps} />);

      const title = screen.getByText('No projects found');
      expect(title.tagName).toBe('H3');
    });
  });

  describe('Image Props', () => {
    it('should pass correct props to Image component', () => {
      render(<EmptyState {...defaultProps} />);

      const image = screen.getByAltText('No projects');
      expect(image).toHaveAttribute('width', '48');
      expect(image).toHaveAttribute('height', '48');
      expect(image).toHaveClass('h-12', 'w-12', 'text-slate-400');
    });
  });
});
