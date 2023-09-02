import { render, screen } from '@testing-library/react';
import Tab from '../src/ui/components/Tab';
import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Radix primatives uses resizeObserver so need to mock it here for test to pass
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  unobserve: jest.fn()
}));

const props = { tabId: 1, isPinned: false, url: 'sdfgsdfg' };

test('Tab is in the document', async () => {
  render(<Tab {...props} />);
  const tab = screen.getByText(props.url);
  expect(tab).toBeInTheDocument();
});

// test('Tab is pinned after clicking pin checkbox', async () => {
//   render(<Tab {...props} />);
//   const pin = screen.getByRole('checkbox');
//   await userEvent.click(pin);
//   expect(pin).toBeChecked();
// });
