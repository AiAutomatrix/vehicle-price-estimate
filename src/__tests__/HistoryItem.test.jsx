import { render, screen } from '../setupTests'; // Use custom render
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
// ThemeProvider and lightTheme imports are no longer needed here
import HistoryItem from '../components/HistoryItem';

describe('HistoryItem', () => {
  const mockItem = {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: '2020',
    date: '2023-05-15',
    price: '$24,500',
    image: 'car-placeholder.png'
  };

  it('displays vehicle information', () => {
    render(
      <BrowserRouter> {/* Wrap with BrowserRouter */}
        <HistoryItem item={mockItem} />
      </BrowserRouter>
    );

    expect(screen.getByText('2020 Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('Valuation on 2023-05-15')).toBeInTheDocument();
    expect(screen.getByText('$24,500')).toBeInTheDocument();
  });
});
