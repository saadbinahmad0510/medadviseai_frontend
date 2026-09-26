import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RegisterPage from './page';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

beforeEach(() => {
  pushMock.mockClear();
});

test('successful registration redirects to /login', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ id: 1, username: 'alice' }),
  }) as jest.Mock;

  render(<RegisterPage />);
  fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'alice' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'pass123' } });
  fireEvent.click(screen.getByRole('button', { name: /register/i }));

  await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/login'));
});

test('failed registration shows an error message', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false }) as jest.Mock;

  render(<RegisterPage />);
  fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'alice' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'pass123' } });
  fireEvent.click(screen.getByRole('button', { name: /register/i }));

  expect(await screen.findByText('Registration failed — try a different username')).toBeInTheDocument();
  expect(pushMock).not.toHaveBeenCalled();
});
