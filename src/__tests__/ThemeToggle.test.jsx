import { render, screen, fireEvent } from '../setupTests'; // Use custom render
// ThemeProvider and lightTheme imports are no longer needed here
import ThemeToggle from '../components/ThemeToggle';

describe('ThemeToggle', () => {
  it('toggles between themes', () => {
    const mockToggle = jest.fn();
    const { container } = render(
      <ThemeToggle toggleTheme={mockToggle} theme="light" />
    );

    // Note: Querying by container might be brittle. Prefer screen queries if possible.
    // However, keeping original logic for now.
    const toggle = container.querySelector('input'); 
    fireEvent.click(toggle);
    expect(mockToggle).toHaveBeenCalled();
  });

  it('reflects current theme state', () => {
    const mockToggle = jest.fn();
    const { rerender } = render(
      <ThemeToggle toggleTheme={mockToggle} theme="light" />
    );

    // Assuming the label text changes based on the theme prop
    expect(screen.getByLabelText(/dark mode/i)).toBeInTheDocument(); 

    rerender(
      <ThemeToggle toggleTheme={mockToggle} theme="dark" />
    );

    expect(screen.getByLabelText(/light mode/i)).toBeInTheDocument();
  });
});
