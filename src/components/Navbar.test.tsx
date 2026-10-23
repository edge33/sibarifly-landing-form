import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, expect, it, vi } from 'vitest';
import AuthContext from '../authContext/AuthContext';
import Navbar from './Navbar';

afterEach(() => {
  document.documentElement.classList.remove('dark');
  localStorage.clear();
});

it('keeps theme icons and persisted theme in sync across menu updates', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <MemoryRouter>
      <AuthContext.Provider
        value={{
          authenticated: false,
          setAuthenticated: vi.fn(),
          authenticate: vi.fn(),
          logout: vi.fn(),
        }}
      >
        <Navbar />
      </AuthContext.Provider>
    </MemoryRouter>,
  );
  const themeToggle = screen.getByRole('button', {
    name: 'Toggle color theme',
  });
  await user.click(themeToggle);
  expect(document.documentElement.classList.contains('dark')).toBe(true);
  expect(localStorage.getItem('color-theme')).toBe('dark');
  expect(
    container
      .querySelector('#theme-toggle-dark-icon')
      ?.classList.contains('hidden'),
  ).toBe(true);
  expect(
    container
      .querySelector('#theme-toggle-light-icon')
      ?.classList.contains('hidden'),
  ).toBe(false);

  const menuToggle = screen.getByRole('button', { name: 'Open main menu' });
  await user.click(menuToggle);
  expect(menuToggle.getAttribute('aria-expanded')).toBe('true');
  await user.click(themeToggle);
  expect(document.documentElement.classList.contains('dark')).toBe(false);
  expect(localStorage.getItem('color-theme')).toBe('light');
  expect(
    container
      .querySelector('#theme-toggle-dark-icon')
      ?.classList.contains('hidden'),
  ).toBe(false);
});
