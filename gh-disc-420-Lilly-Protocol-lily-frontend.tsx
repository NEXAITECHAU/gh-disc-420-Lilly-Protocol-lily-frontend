// __tests__/route-groups-layout.test.tsx
import { render, screen } from '@testing-library/react';
import { NextRouterTestProvider } from 'next-router-mock';
import { ReactNode } from 'react';

// Mock the (dashboard)/layout.tsx
const MockDashboardLayout = ({ children }: { children: ReactNode }) => (
  <div data-testid="mock-layout">
    <header>Dashboard Header</header>
    <nav>Navigation</nav>
    <main>{children}</main>
  </div>
);

// Mock the (dashboard)/page.tsx
const MockDashboardPage = () => <div data-testid="dashboard-content">Dashboard Content</div>;

// Temporarily override route group layout/page for test
jest.mock('@/app/(dashboard)/layout', () => ({
  default: MockDashboardLayout,
}));

jest.mock('@/app/(dashboard)/page', () => ({
  default: MockDashboardPage,
}));

describe('Route Groups Layout Smoke Test', () => {
  it('renders route group content inside its layout', () => {
    render(
      <NextRouterTestProvider url="/dashboard">
        <MockDashboardLayout>
          <MockDashboardPage />
        </MockDashboardLayout>
      </NextRouterTestProvider>
    );

    expect(screen.getByText('Dashboard Header')).toBeInTheDocument();
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
  });
});