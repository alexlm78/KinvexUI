import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // The app should render either the loading spinner or the login page
    // Since authentication is loading initially, we check for the loading indicator
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
