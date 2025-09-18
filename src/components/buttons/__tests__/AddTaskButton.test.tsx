import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTaskButton from '../AddTaskButton';
import type { TaskStatus } from '@/types';

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

describe('AddTaskButton Component', () => {
  const mockOnClick = jest.fn();
  const defaultProps = {
    status: 'todo' as TaskStatus,
    onClick: mockOnClick,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render button with correct attributes', () => {
      render(<AddTaskButton {...defaultProps} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveAttribute('aria-label', 'Add task');
      expect(button).toHaveAttribute('title', 'Add task');
    });

    it('should render plus icon', () => {
      const { container } = render(<AddTaskButton {...defaultProps} />);

      const icon = container.querySelector('img');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('src', '/static/icons/Plus.svg');
      expect(icon).toHaveAttribute('width', '20');
      expect(icon).toHaveAttribute('height', '20');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Styling', () => {
    it('should have correct button classes', () => {
      render(<AddTaskButton {...defaultProps} />);

      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'inline-flex',
        'h-10',
        'w-10',
        'items-center',
        'justify-center',
        'rounded-full',
        'border',
        'border-slate-300',
        'cursor-pointer',
        'hover:bg-slate-50',
        'transition-colors'
      );
    });

    it('should have correct icon classes', () => {
      const { container } = render(<AddTaskButton {...defaultProps} />);

      const icon = container.querySelector('img');
      expect(icon).toHaveClass('h-5', 'w-5');
    });
  });

  describe('Interactions', () => {
    it('should call onClick when button is clicked', () => {
      render(<AddTaskButton {...defaultProps} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should call onClick multiple times when clicked multiple times', () => {
      render(<AddTaskButton {...defaultProps} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('Props', () => {
    it('should accept different status values', () => {
      const statuses: TaskStatus[] = ['todo', 'in_progress', 'completed'];

      statuses.forEach(status => {
        const { unmount } = render(
          <AddTaskButton status={status} onClick={mockOnClick} />
        );

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        unmount();
      });
    });

    it('should work with different onClick functions', () => {
      const firstOnClick = jest.fn();
      const secondOnClick = jest.fn();

      const { rerender } = render(
        <AddTaskButton status="todo" onClick={firstOnClick} />
      );

      let button = screen.getByRole('button');
      fireEvent.click(button);
      expect(firstOnClick).toHaveBeenCalledTimes(1);

      rerender(<AddTaskButton status="todo" onClick={secondOnClick} />);
      button = screen.getByRole('button');
      fireEvent.click(button);
      expect(secondOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('should be accessible', () => {
      render(<AddTaskButton {...defaultProps} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Add task');
    });

    it('should have proper button role', () => {
      render(<AddTaskButton {...defaultProps} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });
});
