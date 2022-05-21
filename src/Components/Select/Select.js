import * as React from 'react';
import {Picker} from '@react-native-picker/picker';

export default function Select({onChange, value, items}) {
  React.useEffect(() => {
    console.log(value);
  }, []);

  return (
    <Picker
      testID="picker-currency"
      selectedValue={value}
      onValueChange={(itemValue, itemIndex) => onChange(itemValue)}>
      {items.map((item, index) => {
        return (
          <Picker.Item label={item.label} value={item.value} key={index} />
        );
      })}
    </Picker>
  );
}
