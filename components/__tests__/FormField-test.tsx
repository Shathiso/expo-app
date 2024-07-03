import * as React from 'react';
import { render, screen, fireEvent, userEvent } from '@testing-library/react-native';
import FormField from '../FormField';

jest.useFakeTimers();

test(`Form field component renders correctly and the handle change fn gets triggered`, async () => {
  const handleChange = jest.fn();
  const user = userEvent.setup();

  render(<FormField label="name" placeholder="name" handleChangeText={handleChange}/>);
  const nameInput = screen.getByPlaceholderText('name');

  await user.type(nameInput, 'john');
  expect(handleChange).toHaveBeenCalled();

});
