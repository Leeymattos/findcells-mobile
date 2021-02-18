import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './pages/home'
import Map from './pages/map'
import Detail from './pages/detail'

const AppStack = createStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode='none' screenOptions={{
        cardStyle: {
          backgroundColor: '#f0f0f5'
        }
      }}>
        <AppStack.Screen name='home' component={Home} />
        <AppStack.Screen name='map' component={Map} />
        <AppStack.Screen name='detail' component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}