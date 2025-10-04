import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Module3 from '../components/Module3';

describe(Module3, () => {
  it('Pressing tab after component renders, focuses the first input', async () => {
    render(<Module3 />);
    const [input] = screen.getAllByRole('textbox');
    await userEvent.tab();
    expect(input).toHaveFocus();
  });

  it('Typing in the controlled input correctly sets the value', async () => {
    render(<Module3 />);
    const [input] = screen.getAllByRole('textbox');
    const value = 'hello world';
    await userEvent.type(input, value);
    expect(input).toHaveValue(value);
  });

  it('Uncontrolled input has a default value set', () => {
    render(<Module3 />);
    const [, input] = screen.getAllByRole('textbox');
    expect(input).toHaveValue('default');
  });

  it('Clicking the button clears the input', async () => {
    render(<Module3 />);
    const button = screen.getByRole('button');
    const [input] = screen.getAllByRole('textbox');
    await userEvent.type(input, 'hello world');
    fireEvent.click(button);
    expect(input).toHaveValue('');
  });
});
