// __tests__/route-groups-layout.test.tsx
import { render, screen } from '@testing-library/react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/appRouter';
import { Roboto } from 'next/font/google';
import { ReactNode } from 'react';

// Mock the layout and page components to test their composition
// In a real app, these would be imported from your actual route group structure
const MockLayout = ({ children }: { children: ReactNode }) => (
  <div data-testid="mock-layout">
    <header>Layout Header</header>
    <main>{children}</main>
    <footer>Layout Footer</footer>
  </div>
);

const MockPage = () => <div data-testid="mock-page">Route Group Page Content</div>;

// Test component that simulates route group layout composition
const RouteGroupWithLayout = () => {
  return (
    <AppRouterCacheProvider>
      <MockLayout>
        <MockPage />
      </MockLayout>
    </AppRouterCacheProvider>
  );
};

test('route groups render inside their layout', () => {
  render(<RouteGroupWithLayout />);
  
  // Verify layout structure is present
  expect(screen.getByTestId('mock-layout')).toBeInTheDocument();
  expect(screen.getByText('Layout Header')).toBeInTheDocument();
  expect(screen.getByText('Layout Footer')).toBeInTheDocument();
  
  // Verify page content is rendered inside the layout
  expect(screen.getByTestId('mock-page')).toBeInTheDocument();
  expect(screen.getByText('Route Group Page Content')).toBeInTheDocument();
});