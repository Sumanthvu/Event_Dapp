import { render, screen } from '@testing-library/react';
import App from './App';

// 1. Mock graphql-request to prevent SyntaxErrors
jest.mock('graphql-request', () => ({
  gql: jest.fn(),
  request: jest.fn(),
}));

// 2. Mock Privy to prevent ReferenceErrors (TextEncoder)
jest.mock('@privy-io/react-auth', () => ({
  PrivyProvider: ({ children }) => <div>{children}</div>,
  usePrivy: () => ({ authenticated: false, login: jest.fn(), logout: jest.fn(),ready:true }),
  useWallets: () => ({ wallets: [] }),
}));

// 3. Mock React Query to prevent "No QueryClient" errors
jest.mock('@tanstack/react-query', () => ({
  useQuery: () => ({ data: null, status: 'loading', refetch: jest.fn() }),
  QueryClient: jest.fn(),
  QueryClientProvider: ({ children }) => <div>{children}</div>,
}));

// The actual test fix
test('renders welcome message', async () => {
  render(<App />);
  const welcomeElement = await screen.findByText(/Welcome to Event DApp/i);
  expect(welcomeElement).toBeInTheDocument();
});