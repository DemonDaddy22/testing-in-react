import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as getRandomDataModule from '@/utils/Module4/getRandomData';
import Hello from '../components/Hello';

jest.useFakeTimers();

describe(Hello, () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Demonstrate a simple mock function', async () => {
    const mock = jest.fn();
    const data = { data: { id: 123, user: 'John Doe' } };
    mock.mockResolvedValue(data);

    await expect(mock()).resolves.toEqual(data);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('Demonstrate use of findBy* to wait for an element to appear', async () => {
    render(<Hello />);

    const node = await screen.findByRole(
      'heading',
      {
        level: 1,
        name: /Hello Rohan/i,
      },
      { timeout: 2000 } // default timeout is 1000 so there could be a race condition if element also appears around the same time
    );
    expect(node).toBeInTheDocument();
  });

  it('Demonstrate use of waitFor for checking success state', async () => {
    /*
    jest.spyOn() creates a mock (spy) for an existing function on a module or object.
    .mockResolvedValueOnce(value) tells the spy to return a Promise that resolves to value for the next call only.
    So, when the component calls the function, It will get a resolved Promise with 0.9, instead of calling the real API or original implementation.
    */
    jest.spyOn(getRandomDataModule, 'getRandomData').mockResolvedValueOnce(0.9);

    render(<Hello />);

    await waitFor(() => {
      expect(getRandomDataModule.getRandomData).toHaveBeenCalled();
      expect(screen.getByText(/success/i)).toBeInTheDocument();
    });
  });

  it('Demonstrate use of waitFor for checking error state', async () => {
    jest.spyOn(getRandomDataModule, 'getRandomData').mockRejectedValueOnce(0.2);

    render(<Hello />);

    await waitFor(() => {
      expect(getRandomDataModule.getRandomData).toHaveBeenCalled();
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('Demonstrate use of act to ensure all React updates are completed before assertions', () => {
    render(<Hello />);

    fireEvent.click(screen.getByRole('button'));

    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(screen.getByRole('heading', { level: 3 }).textContent).toBe('1');
  });
});
