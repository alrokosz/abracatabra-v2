import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/ui/App';
import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// @ts-ignore
global.chrome = {
  // @ts-ignore
  runtime: {
    // @ts-ignore
    sendMessage: () =>
      Promise.resolve({
        isOn: true,
        ignoredDomains: [],
        savedTabs: [],
        idleTabTime: 24
      })
  }
};

// Radix primatives uses resizeObserver so need to mock it here for test to pass
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  unobserve: jest.fn()
}));

test('App is in the document', async () => {
  render(<App />);
  const header = await waitFor(() => screen.findByText(/ABRACA/i));
  expect(header).toBeInTheDocument();
});
