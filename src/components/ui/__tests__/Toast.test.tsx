import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toast } from '../Toast';

describe('Toast Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render success toast', () => {
      render(
        <Toast
          message="Task created successfully!"
          type="success"
          onClose={mockOnClose}
        />
      );

      expect(
        screen.getByText('Task created successfully!')
      ).toBeInTheDocument();
      expect(screen.getByText('×')).toBeInTheDocument();
    });

    it('should render error toast', () => {
      render(
        <Toast
          message="Failed to create task"
          type="error"
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Failed to create task')).toBeInTheDocument();
      expect(screen.getByText('×')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should apply success styling', () => {
      const { container } = render(
        <Toast message="Success message" type="success" onClose={mockOnClose} />
      );

      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass('bg-green-500', 'text-white');
    });

    it('should apply error styling', () => {
      const { container } = render(
        <Toast message="Error message" type="error" onClose={mockOnClose} />
      );

      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass('bg-red-500', 'text-white');
    });

    it('should have correct positioning classes', () => {
      const { container } = render(
        <Toast message="Test message" type="success" onClose={mockOnClose} />
      );

      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass('fixed', 'top-4', 'right-4', 'z-50');
    });
  });

  describe('Interactions', () => {
    it('should call onClose when close button is clicked', () => {
      render(
        <Toast message="Test message" type="success" onClose={mockOnClose} />
      );

      const closeButton = screen.getByText('×');
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when close button is clicked multiple times', () => {
      render(
        <Toast message="Test message" type="error" onClose={mockOnClose} />
      );

      const closeButton = screen.getByText('×');
      fireEvent.click(closeButton);
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(2);
    });
  });

  describe('Accessibility', () => {
    it('should be accessible', () => {
      render(
        <Toast
          message="Accessible message"
          type="success"
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText('Accessible message')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should have proper button role for close button', () => {
      render(
        <Toast message="Test message" type="success" onClose={mockOnClose} />
      );

      const closeButton = screen.getByRole('button');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveClass('cursor-pointer');
    });
  });

  describe('Props', () => {
    it('should display the correct message', () => {
      const message = 'Custom message for testing';
      render(<Toast message={message} type="success" onClose={mockOnClose} />);

      expect(screen.getByText(message)).toBeInTheDocument();
    });

    it('should handle different message types', () => {
      const { rerender } = render(
        <Toast message="First message" type="success" onClose={mockOnClose} />
      );

      expect(screen.getByText('First message')).toBeInTheDocument();

      rerender(
        <Toast message="Second message" type="error" onClose={mockOnClose} />
      );

      expect(screen.getByText('Second message')).toBeInTheDocument();
    });
  });
});
