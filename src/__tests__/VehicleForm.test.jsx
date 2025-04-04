import { render, screen, fireEvent } from '../setupTests'; // Use custom render
// ThemeProvider and lightTheme imports are no longer needed here
import VehicleForm from '../components/VehicleForm';

describe('VehicleForm', () => {
  it('validates required fields', () => {
    const mockSubmit = jest.fn();
    render(
      <VehicleForm onSubmit={mockSubmit} />
    );

    fireEvent.click(screen.getByText('Get Valuation'));
    expect(screen.getByText(/make is required/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('submits valid form', () => {
    const mockSubmit = jest.fn();
    render(
      <VehicleForm onSubmit={mockSubmit} />
    );

    fireEvent.change(screen.getByLabelText(/make/i), { target: { value: 'Toyota' } });
    fireEvent.change(screen.getByLabelText(/model/i), { target: { value: 'Camry' } });
    fireEvent.change(screen.getByLabelText(/year/i), { target: { value: '2020' } });
    fireEvent.change(screen.getByLabelText(/mileage/i), { target: { value: '45000' } });

    fireEvent.click(screen.getByText('Get Valuation'));
    expect(mockSubmit).toHaveBeenCalledWith({
      make: 'Toyota',
      model: 'Camry',
      year: '2020',
      mileage: '45000'
    });
  });
});
