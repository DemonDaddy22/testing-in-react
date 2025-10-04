import { fireEvent, render, screen } from '@testing-library/react';
import Counter from '../components/Counter';

describe(Counter, () => {
  it('Initial value of the header is 0', () => {
    render(<Counter />);
    const header = screen.getByRole('heading', { level: 1 });
    expect(header.textContent).toBe('0');
  });

  it('Pressing increment button increments the count value', () => {
    render(<Counter />);
    const header = screen.getByRole('heading', { level: 1 });
    const incrementBtn = screen.getByText(/increment/i);

    const value = Number(header.textContent);
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    expect(header.textContent).toBe(`${value + 2}`);
  });

  it('Pressing decrement button decrements the count value', () => {
    render(<Counter />);
    const header = screen.getByRole('heading', { level: 1 });
    const decrementBtn = screen.getByText(/decrement/i);

    const value = Number(header.textContent);
    fireEvent.click(decrementBtn);
    expect(header.textContent).toBe(`${value - 1}`);
  });
});
