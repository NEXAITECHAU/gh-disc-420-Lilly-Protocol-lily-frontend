// __tests__/route-groups-layout.test.tsx
import { render, screen } from '@testing-library/react';
import { AppRouter } from 'next/dist/server/app-render';
import { createAppRouter } from 'next-test-utils';

describe('Route Groups Layout', () => {
  it('renders route group content inside its layout', async () => {
    // Create a minimal app router with a route group layout and page
    const router = createAppRouter({
      appDir: {
        '(group)': {
          layout: {
            file: 'app/(group)/layout.tsx',
            content: `
              export default function Layout({ children }: { children: React.ReactNode }) {
                return (
                  <div data-testid="group-layout">
                    <h1>Group Layout</h1>
                    {children}
                  </div>
                );
              }
            `,
          },
          page: {
            file: 'app/(group)/page.tsx',
            content: `
              export default function Page() {
                return <p data-testid="group-page">Inside Route Group</p>;
              }
            `,
          },
        },
      },
    });

    // Render the route group page
    const { container } = render(<AppRouter router={router} />);
    
    // Assert layout and page content are present
    expect(screen.getByTestId('group-layout')).toBeInTheDocument();
    expect(screen.getByText('Group Layout')).toBeInTheDocument();
    expect(screen.getByTestId('group-page')).toBeInTheDocument();
    expect(screen.getByText('Inside Route Group')).toBeInTheDocument();
  });
});