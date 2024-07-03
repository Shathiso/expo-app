import * as React from 'react';
import { render, screen, fireEvent, userEvent } from '@testing-library/react-native';
import Login from '../../app/(auth)/login';

jest.useFakeTimers();

test(`Login page functions correctly`, async () => {

  const user = userEvent.setup();

  render(<Login />);
  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');
  const submitBtn = screen.getByText('Login');

  await user.type(emailInput, 't@gmail.com');
  await user.type(passwordInput, 'wazwagwa1');
  await user.press(submitBtn);

  expect(await screen.findByText('Welcome Back')).toBeOnTheScreen();

});
