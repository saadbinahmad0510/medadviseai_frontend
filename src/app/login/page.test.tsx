import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginPage from './page';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

beforeEach(() => {
  pushMock.mockClear();
  localStorage.clear();
});

test('successful login stores tokens and redirects to /consultations', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ access: 'a-token', refresh: 'r-token' }),
  }) as jest.Mock;

  render(<LoginPage />);
  fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'alice' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'pass123' } });
  fireEvent.click(screen.getByRole('button', { name: /log in/i }));

  await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/consultations'));
  expect(localStorage.getItem('accessToken')).toBe('a-token');
});

test('failed login shows an error message', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false }) as jest.Mock;

  render(<LoginPage />);
  fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'alice' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrong' } });
  fireEvent.click(screen.getByRole('button', { name: /log in/i }));

  expect(await screen.findByText('Invalid username or password')).toBeInTheDocument();
  expect(pushMock).not.toHaveBeenCalled();
});
