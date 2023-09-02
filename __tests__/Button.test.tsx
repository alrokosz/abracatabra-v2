import { render, screen } from '@testing-library/react';
import Button from '../src/ui/components/Button';
import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

const props = { className: 'test-classname', onClick: jest.fn() };

test('Button exists', () => {
  render(<Button {...props} />);
  const btn = screen.getByRole('button');
  expect(btn).toBeInTheDocument();
});

test('Button adds classname from props if present', () => {
  render(<Button {...props} />);
  const btn = screen.getByRole('button');
  expect(btn).toHaveClass('test-classname');
});

test('Button calls onClick props if present', async () => {
  render(<Button {...props} />);
  const btn = screen.getByRole('button');
  await userEvent.click(btn);
  expect(props.onClick).toHaveBeenCalled();
});
