// tests/smoke/route-group-layout.test.tsx
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { RouteGroupLayoutSmokeTest } from '@/app/(dashboard)/layout'; // assuming this is the route group layout

// Mock next/navigation to avoid actual navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    };
  },
  usePathname() {
    return '/dashboard';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  notFound,
}));

describe('Route Group Layout Smoke Test', () => {
  it('renders children inside the route group layout', () => {
    const messages = {};
    
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <RouteGroupLayoutSmokeTest>
          <div data-testid="mock-child">Dashboard Content</div>
        </RouteGroupLayoutSmokeTest>
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
    // Optionally assert layout-specific elements exist (e.g., sidebar, nav)
    // expect(screen.getByText('Dashboard Layout Wrapper')).toBeInTheDocument();
  });
});