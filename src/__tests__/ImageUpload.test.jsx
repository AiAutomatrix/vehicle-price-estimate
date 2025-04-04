import { render, screen } from '../setupTests'; // Use custom render
import userEvent from '@testing-library/user-event';
// ThemeProvider and lightTheme imports are no longer needed here
import ImageUpload from '../components/ImageUpload';

describe('ImageUpload', () => {
  it('renders upload interface', () => {
    render(
      <ImageUpload onImageUpload={jest.fn()} />
    );
    expect(screen.getByText(/upload vehicle photo/i)).toBeInTheDocument();
  });

  it('triggers file selection', async () => {
    const mockUpload = jest.fn();
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const user = userEvent.setup();

    render(
      <ImageUpload onImageUpload={mockUpload} />
    );

    const input = screen.getByLabelText(/upload vehicle photo/i);
    await user.upload(input, file);

    expect(mockUpload).toHaveBeenCalledWith(file);
  });
});
