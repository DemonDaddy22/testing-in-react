# Module 3

## `fireEvent` vs `userEvent`

**`fireEvent` (RTL built-in):**

- Simulates **DOM events** at a low level.
- Doesn’t mimic user behavior exactly.
- Example:

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

test('fires click with fireEvent', () => {
  render(<Button />);
  fireEvent.click(screen.getByRole('button'));
});
```

**`userEvent` (separate package):**

- Higher-level API that **mimics real user behavior** (typing, tabbing, pasting).
- Adds event delays, focus/blur, key sequences.
- Example:

```tsx
import userEvent from '@testing-library/user-event';

test('clicks with userEvent', async () => {
  render(<Button />);
  await userEvent.click(screen.getByRole('button'));
});
```

**Rule of Thumb:**

- Use `userEvent` when testing **real interactions**.
- Use `fireEvent` only when simulating **low-level events**.

## Simulating Interactions

### Typing

```tsx
const input = screen.getByRole('textbox');
await userEvent.type(input, 'Hello World');
expect(input).toHaveValue('Hello World');
```

### Clicking

```tsx
await userEvent.click(screen.getByText(/submit/i));
```

### Tabbing (Keyboard Navigation)

```tsx
await userEvent.tab();
expect(screen.getByRole('textbox')).toHaveFocus();
```

### Focusing/Blurring

```tsx
const input = screen.getByRole('textbox');
input.focus();
expect(input).toHaveFocus();

input.blur();
expect(input).not.toHaveFocus();
```

## Controlled vs Uncontrolled Inputs

**Controlled Input (value managed by React state):**

```tsx
function ControlledInput() {
  const [value, setValue] = React.useState('');
  return (
    <inputvalue={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Controlled"
    />
  );
}
```

**Test:**

```tsx
test('updates controlled input', async () => {
  render(<ControlledInput />);
  const input = screen.getByPlaceholderText(/controlled/i);
  await userEvent.type(input, 'React');
  expect(input).toHaveValue('React');
});
```

**Uncontrolled Input (value managed by DOM):**

```tsx
function UncontrolledInput() {
  return <input defaultValue='start' placeholder='Uncontrolled' />;
}
```

**Test:**

```tsx
test('has initial uncontrolled value', () => {
  render(<UncontrolledInput />);
  const input = screen.getByPlaceholderText(/uncontrolled/i);
  expect(input).toHaveValue('start');
});
```

Controlled inputs require **state updates** → you test React’s behaviour.

Uncontrolled inputs rely on the DOM → you test initial/default values.
