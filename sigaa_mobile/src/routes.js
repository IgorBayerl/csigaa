import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PosSplash from './pages/posSplash/index.js'
import Main from './pages/main/index.js';
import Notas from './pages/notas'
import Presenca from './pages/presenca'

const Stack = createStackNavigator();

const isLoading = false

export default function Routes() {

  if (isLoading){
    return <PosSplash/>
  }else{
    return (
      <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="PosSplash" component={PosSplash} />
          <Stack.Screen name="Notas" component={Notas} />
          <Stack.Screen name="Presenca" component={Presenca} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}