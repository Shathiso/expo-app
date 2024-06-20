import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesome } from '@expo/vector-icons';


interface DropDown{
  listData: string[],
  dropDownTitle:string,
  handleSelection: (item:string) => void
}

const DropDown = ({listData, dropDownTitle, handleSelection}: DropDown) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>{dropDownTitle}</Text>
      </View>
      <SelectDropdown
        data={listData}
        onSelect={(selectedItem, index) => {
          handleSelection(selectedItem)
        }}
        renderButton={(selectedItem, isOpen) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem) || 'Select'}
              </Text>
              <FontAwesome name={isOpen ? 'chevron-up' : 'chevron-down'} size={18} color="#000" style={styles.dropdownButtonArrowStyle} />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && {backgroundColor: '#D2D9DF'}),
              }}>
              <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 3,
    paddingBottom: 3,
    marginTop: 35
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: 16,
    paddingLeft:6
  },
  headerTxt: {
    fontSize: 16,
    paddingBottom:4,
    color: '#151E26',
  },
  dropdownButtonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});