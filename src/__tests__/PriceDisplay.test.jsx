import { render, screen } from '../setupTests'; // Use custom render
// ThemeProvider and lightTheme imports are no longer needed here
import PriceDisplay from '../components/PriceDisplay';

describe('PriceDisplay', () => {
  it('displays the price correctly', () => {
    render(
      <PriceDisplay price="$24,500" />
    );

    expect(screen.getByText('$24,500')).toBeInTheDocument();
    expect(screen.getByText('Estimated Value')).toBeInTheDocument();
  });

  it('handles different price formats', () => {
    render(
      <PriceDisplay price="€21,000" />
    );

    expect(screen.getByText('€21,000')).toBeInTheDocument();
  });
});
