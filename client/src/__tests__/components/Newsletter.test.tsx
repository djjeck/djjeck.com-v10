import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Newsletter from '@/components/Newsletter';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

// Mock the dependencies
jest.mock('@/lib/queryClient', () => ({
  apiRequest: jest.fn(),
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}));

describe('Newsletter', () => {
  const mockToast = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (apiRequest as jest.Mock).mockResolvedValue({});
  });

  it('renders the newsletter component correctly', () => {
    render(<Newsletter />);
    
    // Check if the heading is rendered
    expect(screen.getByText('Stay up to date')).toBeInTheDocument();
    expect(screen.getByText('with our newsletter')).toBeInTheDocument();
    
    // Check if description is rendered
    expect(screen.getByText(/Get the latest articles, tutorials, and updates/)).toBeInTheDocument();
    
    // Check if form elements are rendered
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    render(<Newsletter />);
    
    // Fill the form
    const emailInput = screen.getByPlaceholderText('Enter your email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Subscribe' });
    fireEvent.click(submitButton);
    
    // Check if API request was called
    await waitFor(() => {
      expect(apiRequest).toHaveBeenCalledWith('POST', '/api/newsletter/subscribe', { email: 'test@example.com' });
    });
    
    // Check if success toast was shown
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Success!",
        description: "You've been successfully subscribed to our newsletter.",
        variant: "default",
      });
    });
    
    // Check if email input is cleared
    await waitFor(() => {
      expect(emailInput).toHaveValue('');
    });
  });

  it('handles API error correctly', async () => {
    // Mock API to throw an error
    (apiRequest as jest.Mock).mockRejectedValue(new Error('API error'));
    
    render(<Newsletter />);
    
    // Fill the form
    const emailInput = screen.getByPlaceholderText('Enter your email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Subscribe' });
    fireEvent.click(submitButton);
    
    // Check if error toast was shown
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Something went wrong.",
        description: "There was a problem with your subscription. Please try again.",
        variant: "destructive",
      });
    });
  });

  it('does not submit when email is empty', () => {
    render(<Newsletter />);
    
    // Submit form without entering email
    const submitButton = screen.getByRole('button', { name: 'Subscribe' });
    fireEvent.click(submitButton);
    
    // API request should not be called
    expect(apiRequest).not.toHaveBeenCalled();
  });

  it('shows loading state during submission', async () => {
    // Mock API request to delay resolution
    (apiRequest as jest.Mock).mockImplementation(() => new Promise(resolve => {
      setTimeout(() => resolve({}), 100);
    }));
    
    render(<Newsletter />);
    
    // Fill the form and submit
    const emailInput = screen.getByPlaceholderText('Enter your email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    const submitButton = screen.getByRole('button', { name: 'Subscribe' });
    fireEvent.click(submitButton);
    
    // Check loading state
    expect(screen.queryByText('Subscribe')).not.toBeInTheDocument();
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    
    // Wait for request to complete
    await waitFor(() => {
      expect(screen.getByText('Subscribe')).toBeInTheDocument();
    });
  });
});