import { render, screen } from '@testing-library/react';
import App from '../src/ui/App';
import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// TODO: need to fihure out how to mock chrome

// test('App is in the document', async () => {
//   render(<App />);
//   const header = screen.getByText('ABRACA');
//   expect(header).toBeInTheDocument();
// });
