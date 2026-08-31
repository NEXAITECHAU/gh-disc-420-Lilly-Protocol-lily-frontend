// Example test file: src/routes/__tests__/RouteGroupsLayout.test.tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../AppRoutes'; // Adjust path as needed

describe('Route Groups Layout', () => {
  it('renders route groups inside their layout', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard/settings']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Assert layout elements are present (e.g., sidebar, header, etc.)
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Dashboard Settings')).toBeInTheDocument();
  });
});