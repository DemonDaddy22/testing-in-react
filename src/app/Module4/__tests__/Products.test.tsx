import { render, screen, waitFor } from '@testing-library/react';
import Products from '../components/Products';

describe(Products, () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Loading text is rendered when data is fetching', async () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<Products />);

    const header = await screen.findByRole('heading', { level: 3 });
    expect(header.textContent).toBe('Loading...');
  });

  it('Error text is rendered when error is set', async () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise((_, rej) => rej('something went wrong')));

    render(<Products />);

    // first loading text must appear
    expect(screen.getByRole('heading', { level: 3 }).textContent).toBe('Loading...');

    // after promise is rejected, error must appear
    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 3 }).textContent).toBe('Something went wrong. Refresh the page.')
    );
  });

  it('List of product titles are rendered if data is fetched successfully', async () => {
    const products = [
      { id: 1, title: 'Candy' },
      { id: 2, title: 'Toy' },
    ];
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ products }),
    });

    render(<Products />);

    // first loading text must appear
    expect(screen.getByRole('heading', { level: 3 }).textContent).toBe('Loading...');

    // after promise is resolved, list must be rendered
    await waitFor(() => {
      const elements = screen.getAllByText(/Candy|Toy/);
      expect(elements).toHaveLength(products.length);
      elements.forEach((element, index) => {
        expect(element.textContent).toBe(products[index].title);
      });
    });
  });
});
