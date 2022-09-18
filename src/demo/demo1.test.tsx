import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TextField } from '@mui/material';

const inputMock = jest.fn();

const Test = () => (
  <TextField
    error={false}
    required
    onChange={inputMock}
    defaultValue={'4711'}
    // value={'42'}
    placeholder={'Enter Number'}
  />
);

test('Input', () => {
  const container = render(<Test />);
  const input = container.getByDisplayValue('4711') as HTMLInputElement;
  expect(input.defaultValue).toBe('4711');
  fireEvent.change(input, { target: { value: '42' } });
  expect(input.value).toBe('42');
  expect(inputMock.mock.calls).toHaveLength(1);
});