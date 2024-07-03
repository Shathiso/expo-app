import * as React from 'react';
import { render, screen, fireEvent, userEvent } from '@testing-library/react-native';
import CustomButton from '../CustomButton';

jest.useFakeTimers();

test(`Custom Button functions correctly`, async () => {

  const user = userEvent.setup();
  const buttonPressHandler = jest.fn();

  const btnIsLoading = false;

  render(<CustomButton  title="Test" isLoading={btnIsLoading} type="primary" handlePress={buttonPressHandler} />);
  const screenBtn = screen.getByText('Test');
  await user.press(screenBtn);

  expect(buttonPressHandler).toHaveBeenCalled();

  const tree = render(<CustomButton  title="Test" isLoading={btnIsLoading} type="primary" handlePress={buttonPressHandler} />).toJSON();
  expect(tree).toMatchSnapshot();

});
