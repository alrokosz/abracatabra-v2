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

function setup(NewProps = {}) {
  const props = {
    id: 'to-la-zy-to-im-po-rt-uu-id',
    isPinned: false,
    url: 'sdfgsdfg',
    setSavedTabs: (): any => null,
    savedAt: Date.now(),
    ...NewProps
  };
  return {
    user: userEvent.setup(),
    props,
    ...render(<Tab {...props} />)
  };
}

test('Tab is in the document', async () => {
  const { props } = setup();
  const tab = screen.getByText(props.url);
  expect(tab).toBeInTheDocument();
});

// test('Tab is pinned after clicking pin checkbox', async () => {
//   render(<Tab {...props} />);
//   const pin = screen.getByRole('checkbox');
//   await userEvent.click(pin);
//   expect(pin).toBeChecked();
// });
