import { render, screen } from '@testing-library/react';
import Hello from '../components/Hello';

describe(Hello, () => {
  it('Renders heading with greeting', () => {
    render(<Hello />);
    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });
});
