import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PosSplash from './pages/posSplash/index.js'
import Main from './pages/main/index.js';


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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}