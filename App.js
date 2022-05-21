import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabBar from './src/Navigators/BottonTabsNavigator/CustomBottonTabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <TabBar />
    </NavigationContainer>
  );
}
