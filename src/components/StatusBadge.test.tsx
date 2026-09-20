import { render, screen } from '@testing-library/react';
import StatusBadge from './StatusBadge';

test('renders the given status text', () => {
  render(<StatusBadge status="ok" />);
  expect(screen.getByText('ok')).toBeInTheDocument();
});
