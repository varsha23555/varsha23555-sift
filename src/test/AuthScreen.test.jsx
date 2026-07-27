import { render, screen, fireEvent } from '@testing-library/react';
import AuthScreen from '../components/AuthScreen';
import { SEED_USERS } from '../data/titles';

describe('AuthScreen', () => {
  it('shows a helpful error when login fails', async () => {
    const onAuthenticated = vi.fn();
    render(<AuthScreen users={SEED_USERS} onAuthenticated={onAuthenticated} />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getAllByRole('button', { name: /^log in$/i })[1]);

    expect(await screen.findByText(/invalid email or password/i)).toBeInTheDocument();
    expect(onAuthenticated).not.toHaveBeenCalled();
  });
});
