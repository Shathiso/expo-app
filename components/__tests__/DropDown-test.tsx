import * as React from 'react';
import { render, screen, fireEvent, userEvent } from '@testing-library/react-native';
import DropDown from '../DropDown';


test(`drop down component renders correctly`, () => {
  const handleChange = jest.fn();

  const dropDownList = ['one', 'two', 'three'];

  const tree = render(<DropDown listData={dropDownList} dropDownTitle="name" handleSelection={handleChange}/>).toJSON();

  expect(tree).toMatchSnapshot();;

});
