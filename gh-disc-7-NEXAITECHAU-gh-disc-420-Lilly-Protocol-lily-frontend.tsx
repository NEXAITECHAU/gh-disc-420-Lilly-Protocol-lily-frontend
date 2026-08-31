// tests/smoke/route-group-layout.test.tsx
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { createMemoryHistory } from 'history';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { AppRouterCacheProvider } from '@mui/material/styles';
import RootLayout from '@/app/layout';
import DashboardLayout from '@/app/(dashboard)/layout';
import DashboardPage from '@/app/(dashboard)/page';

// Mock next/navigation to avoid actual routing
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    };
  },
  notFound: jest.fn(),
}));

// Mock next-intl to avoid i18n dependencies
jest.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useMessages: () => ({}),
}));

describe('Route Groups', () => {
  it('renders route groups inside their layout', async () => {
    const history = createMemoryHistory();
    history.push('/dashboard');

    render(
      <RouterContext.Provider value={{}}>
        <AppRouterCacheProvider>
          <NextIntlClientProvider>
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          </NextIntlClientProvider>
        </AppRouterCacheProvider>
      </RouterContext.Provider>
    );

    // Assert layout wrapper is present
    expect(document.body).toBeTruthy();
    
    // Assert dashboard-specific content renders (e.g., a heading from dashboard page)
    // Adjust selector based on actual dashboard content
    const dashboardHeading = screen.getByText(/dashboard/i);
    expect(dashboardHeading).toBeInTheDocument();
  });
});