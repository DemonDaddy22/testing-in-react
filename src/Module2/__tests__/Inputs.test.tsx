import { screen, render } from '@testing-library/react';
import Inputs from '../components/Inputs';

describe(Inputs, () => {
  it('Title is rendered', () => {
    render(<Inputs />);
    const title = screen.getByText('Registration');
    expect(title).toBeInTheDocument();
  });

  it('Inputs are rendered', () => {
    render(<Inputs />);
    const inputUsername = screen.getByLabelText(/username/i);
    const inputPassword = screen.getByLabelText(/password/i);

    expect(inputUsername).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  it('Buttons are rendered', () => {
    render(<Inputs />);
    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(2);
    buttons.forEach(button => expect(button).toBeInTheDocument());
  });
});
