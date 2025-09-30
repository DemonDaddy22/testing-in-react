import { render, screen } from '@testing-library/react';
import HelloUsername from '../components/HelloUsername';

describe(HelloUsername, () => {
  it('Render greeting without prop', () => {
    render(<HelloUsername />);
    expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
  });

  it('Render greeting with prop', () => {
    const username = 'Rohan';
    render(<HelloUsername name={username} />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(`Hello ${username}!`);
  });
});
