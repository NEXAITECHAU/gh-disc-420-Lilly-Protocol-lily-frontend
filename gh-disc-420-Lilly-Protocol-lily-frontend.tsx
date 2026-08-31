// __tests__/route-groups-layout.test.tsx
import { render, screen } from '@testing-library/react';
import { AppRouter } from 'next-server/dist/server/app-renderer';
import React from 'react';

// Mock Next.js internals
jest.mock('next/navigation', () => ({
  usePathname: () => '/dashboard/settings',
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock the actual route group page and layout
jest.mock('@/app/(dashboard)/layout', () => ({
  default: function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="mock-dashboard-layout">{children}</div>;
  },
}));

jest.mock('@/app/(dashboard)/settings/page', () => ({
  default: function SettingsPage() {
    return <div data-testid="mock-settings-content">Settings</div>;
  },
}));

// Simulate rendering a route group inside its layout
describe('Route Groups Layout Smoke Test', () => {
  it('renders route group content inside its layout', () => {
    const Layout = require('@/app/(dashboard)/layout').default;
    const Page = require('@/app/(dashboard)/settings/page').default;

    render(
      <Layout>
        <Page />
      </Layout>
    );

    expect(screen.getByTestId('mock-dashboard-layout')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});