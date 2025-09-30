# Module 1

## Topics

- Why test? Types of testing (unit, integration, e2e).
- Difference between Jest & React Testing Library.
- Setting up Jest + RTL in a React project.
- Writing your first test (`render`, `screen`, `expect`).

## Exercise Checkpoint

- Write a test that renders a simple `<Hello />` component and checks if `"Hello World"` appears on the screen.

<hr />

### Why test? Types of testing (unit, integration, e2e)

- Why Testing?
  - **Manual testing** → slow, repetitive, prone to human error.
  - **Automated testing** → ensures your app behaves as expected after changes, catches bugs early, builds confidence in refactoring.
  - Helps with **maintainability, scalability, and reliability** of React apps.
- Types of Testing
  - **Unit testing** → Tests small pieces (functions, components) in isolation.
  - **Integration testing** → Tests how components/modules work together.
  - **End-to-end (E2E) testing** → Tests the full app flow in a browser (e.g., Cypress, Playwright).

### Difference between Jest & React Testing Library

- What is Jest?
  - A **JavaScript testing framework** by Meta.
  - Provides:
    - Test runner (`test`/`it`)
    - Assertions (`expect`)
    - Mocks (`jest.fn`, `jest.mock`)
    - Snapshot testing
    - Code coverage reporting
- What is React Testing Library (RTL)?
  - A library built on top of DOM Testing Library.
  - Philosophy: **“Test the way users interact with your UI, not implementation details.”**
  - Core utilities:
    - `render()` → render your component in a virtual DOM.
    - `screen` → query the DOM.
    - Queries: `getBy*`, `findBy*`, `queryBy*`.

### Setting up Jest + RTL in a React project

Following are the steps to setup RTL and Jest in Next.js 15 which uses TS template.

**1. Install Dependencies**

Install Jest, RTL, and supporting packages:

```bash
npm install --save-dev jest jest-environment-jsdom \
  @testing-library/react @testing-library/jest-dom \
  @testing-library/user-event \
  ts-jest @types/jest
```

- `jest` → test runner
- `jest-environment-jsdom` → simulates the browser environment
- `@testing-library/react`, `@testing-library/user-event` → RTL utilities
- `@testing-library/jest-dom` → custom matchers (`toBeInTheDocument`, etc.)
- `ts-jest` + `@types/jest` → TypeScript support

<br />

**2. Configure Jest**

Create a **`jest.config.ts`** in your project root:

```tsx
import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  moduleNameMapper: {
    // Handle CSS imports (if you use CSS modules or global CSS)
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',

    // Handle path aliases from tsconfig.json
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};

export default config;
```

<br />

**3. Setup Jest DOM**

Create a file **`jest.setup.ts`** in root:

```tsx
import '@testing-library/jest-dom';
```

This gives you nice matchers like `.toBeInTheDocument()`.

<br />

**4. Update `package.json` Scripts**

Add a test script:

```json
"scripts": {
  "test": "jest --watch"
}
```

Or if you also want coverage:

```json
"test:coverage": "jest --coverage"
```

<br />

This might not work for TSX and JSX files as Jest doesn’t understand them out of the box. The recommended approach here would be to add a transformer.

### Add a transformer for TSX/JSX

### Use **Babel + Jest**

1. Install deps:

   ```bash
   npm install --save-dev babel-jest @babel/preset-env @babel/preset-react @babel/preset-typescript
   ```

2. Create a **`babel.config.js`** in your root:

   ```jsx
   module.exports = {
     presets: [
       ['@babel/preset-env', { targets: { node: 'current' } }],
       ['@babel/preset-react', { runtime: 'automatic' }],
       '@babel/preset-typescript',
     ],
   };
   ```

3. Update **`jest.config.ts`**:

   ```tsx
   import type { Config } from 'jest';

   const config: Config = {
     testEnvironment: 'jsdom',
     transform: {
       '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
     },
     moduleNameMapper: {
       '^@/(.*)$': '<rootDir>/src/$1',
       '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
     },
     setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
     testPathIgnorePatterns: ['/node_modules/', '/.next/'],
   };

   export default config;
   ```

Now Jest will correctly parse JSX/TSX.
