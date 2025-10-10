# Module 4

## Mocking API Calls with Jest

### a. Why Mock APIs

- Real API calls slow tests and cause flaky results.
- Mocking ensures tests run fast and deterministically.
- You simulate different responses (success, failure, empty, etc.).

### b. Using `jest.fn()`

- Creates a simple mock function.
- You can:
  - Track calls (`mockFn.mock.calls`)
  - Define return values (`mockFn.mockReturnValue`)
  - Simulate resolved/rejected promises (`mockFn.mockResolvedValue`, `mockFn.mockRejectedValue`)

**Example:**

```jsx
const fetchData = jest.fn();

fetchData.mockResolvedValue({ name: 'Rohan' });

await expect(fetchData()).resolves.toEqual({ name: 'Rohan' });
expect(fetchData).toHaveBeenCalledTimes(1);
```

### c. Using `jest.mock()`

- Used to mock entire modules (like `axios`, `fetch`, or API utilities).
- Automatically replaces imports with Jest’s mocked versions.

**Example:**

```jsx
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import Users from './Users';

jest.mock('axios'); // mock the module

test('renders users', async () => {
  axios.get.mockResolvedValue({ data: [{ id: 1, name: 'Rohan' }] });

  render(<Users />);

  expect(await screen.findByText('Rohan')).toBeInTheDocument();
});
```

**Tip:**

If you’re using `fetch`, you can mock it globally:

```jsx
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'Mocked Data' }),
  })
);
```

## Handling Async in React Testing Library

React Testing Library (RTL) gives several utilities to handle **async updates** — e.g., API calls, timeouts, delayed renders.

### a. `findBy*`

- Waits for element to appear in the DOM.
- Combines `getBy*` + `waitFor`.

```jsx
const user = await screen.findByText(/Rohan/i);
expect(user).toBeInTheDocument();
```

Use when: waiting for data fetched asynchronously.

### b. `waitFor`

- Repeatedly executes a callback until it stops throwing.
- Useful for checking **side effects or non-visible** async updates.

```jsx
await waitFor(() => {
  expect(mockApi).toHaveBeenCalled();
  expect(screen.getByText('Success')).toBeInTheDocument();
});
```

Use when: testing state changes that don’t immediately reflect in DOM.

### c. `act()`

- Ensures React finishes all updates before assertions.
- Required when simulating events that trigger async state updates (e.g., setTimeout, promises).

```jsx
await act(async () => {
  fireEvent.click(screen.getByText('Load Users'));
});
```

Use when: manually triggering async logic.

## Testing Loading & Error States

### a. Typical component pattern

```jsx
function Users() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/users')
      .then(res => res.json())
      .then(setData)
      .catch(() => setError('Error fetching'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <ul>
      {data?.map(u => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

### b. Testing Loading

```jsx
test('shows loading state', async () => {
  fetch.mockImplementation(
    () => new Promise(() => {}) // never resolves
  );

  render(<Users />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
```

### c. Testing Success

```jsx
test('shows user data on success', async () => {
  fetch.mockResolvedValueOnce({
    json: () => Promise.resolve([{ id: 1, name: 'Rohan' }]),
  });

  render(<Users />);
  expect(await screen.findByText('Rohan')).toBeInTheDocument();
});
```

### d. Testing Error

```jsx
test('shows error message', async () => {
  fetch.mockRejectedValueOnce(new Error('Network error'));

  render(<Users />);
  expect(await screen.findByText(/error fetching/i)).toBeInTheDocument();
});
```

## Common Pitfalls

- ❌ Forgetting `await` on `findBy*` or `waitFor`.
- ❌ Not mocking `fetch` or `axios` before import.
- ❌ Missing `act()` around async updates in older React versions.
- ❌ Testing internal implementation instead of user-visible behaviour.
