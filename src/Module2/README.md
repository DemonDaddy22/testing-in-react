# Module 2

## Rendering Components

- `render()` mounts a React component into a **virtual DOM provided by jsdom**.
- It allows you to **interact with the component just like a user would**, without needing a real browser.
- Always import `screen` from RTL for querying; it’s a **global-like utility that references the rendered DOM**.
- Example:

  ```tsx
  import { render, screen } from '@testing-library/react';
  import Button from '../Button';

  test('renders a button', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText(/click me/i)).toBeInTheDocument();
  });
  ```

**Explanation:**

- `render(<Button />)` → component is mounted in memory.
- `screen.getByText(/click me/i)` → finds text “Click me” ignoring case (`i` flag).
- `toBeInTheDocument()` → asserts that the element exists in the DOM.

### Query Methods

**React Testing Library** provides multiple ways to locate elements.

> Guiding Principle: Always query like a user would, prefer accessibility over implementation details.

### ByRole

- Finds elements by **semantic HTML roles**, e.g., buttons, headings, links, checkboxes.
- Supports filtering by accessible name or level (for headings).

```tsx
screen.getByRole('button', { name: /submit/i });
screen.getByRole('heading', { level: 1 });
```

**Why:** Helps with accessibility testing automatically.

### ByText

- Finds elements that display a specific **text content**.
- Useful for labels, headings, paragraphs.

```tsx
screen.getByText(/hello world/i);
```

### ByLabelText

- Targets **form inputs** using their `<label>` text.
- Supports `<label htmlFor="inputId">` or wrapping `<input>` inside `<label>`.

```tsx
screen.getByLabelText(/username/i);
```

### ByPlaceholderText

- Targets `<input>` elements with a **placeholder** attribute.

```tsx
screen.getByPlaceholderText(/enter email/i);
```

### ByDisplayValue

- Finds **form elements that already have a value**.
- Useful for testing controlled inputs.

```tsx
screen.getByDisplayValue('Rohan');
```

### ByTestId

- Last resort for querying elements **without accessible text or roles**.

```tsx
screen.getByTestId('custom-element');
```

> Best Practice: Prefer getByRole → getByLabelText → getByText → getByTestId.

## Assertions with Jest DOM

- `@testing-library/jest-dom` provides **semantic matchers** to assert element states clearly.

Examples and explanation:

```tsx
expect(element).toBeInTheDocument(); // element exists
expect(button).toBeDisabled(); // button is disabled
expect(input).toHaveValue('Rohan'); // input value matches
expect(link).toHaveAttribute('href', '/home'); // correct link
```

**Why:** Using semantic matchers improves **readability** and **maintainability** of tests.

## Best Practices

- **Test behaviour, not implementation details**
  - Avoid checking props or state directly; check what the user sees/interacts with.
- **Accessible queries first**
  - `getByRole`, `getByLabelText`, and `getByText` reflect real user interaction.
- **Isolate tests**
  - Each test should focus on **one functionality or behaviour** to make failures easier to debug.
- **Use descriptive test names**
  - e.g., `"renders submit button disabled until form is valid"`

## When Tests Fail

- Common RTL error: _“Unable to find an element with role …”_
- Debug tips:

```tsx
screen.debug(); // prints current DOM snapshot to console
```

- Check if element exists but is **hidden** (e.g., conditional rendering).

```tsx
screen.getByRole('button', { hidden: true });
```

- Ensure proper **case-insensitive matching**: `/text/i` regex.

> Tip: Running screen.debug() is one of the fastest ways to inspect the rendered DOM during test failures.
