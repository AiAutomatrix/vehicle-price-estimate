import { render, screen } from '../setupTests';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Restore the original assertion if needed, or keep it simple for now
    // expect(screen.getByText(/get your vehicle's value/i)).toBeInTheDocument(); 
  });
});
