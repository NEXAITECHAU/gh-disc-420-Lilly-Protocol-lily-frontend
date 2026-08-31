// app/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <nav>Dashboard Nav</nav>
      <main>{children}</main>
    </div>
  );
}

// app/(dashboard)/page.tsx
export default function DashboardPage() {
  return <div>Dashboard Content</div>;
}

// tests/dashboard-route-group.test.tsx
import { render, screen } from '@testing-library/react';
import { NextRouterProvider } from 'next-router-mock';
import DashboardLayout from '@/app/(dashboard)/layout';
import DashboardPage from '@/app/(dashboard)/page';

describe('Route Group Layout Smoke Test', () => {
  it('renders children inside the layout', () => {
    const { container } = render(
      <NextRouterProvider>
        <DashboardLayout>
          <DashboardPage />
        </DashboardLayout>
      </NextRouterProvider>
    );

    expect(container.querySelector('.dashboard-layout')).toBeInTheDocument();
    expect(screen.getByText('Dashboard Nav')).toBeInTheDocument();
    expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
  });
});