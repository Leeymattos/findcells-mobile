import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './src/routes'
import AppLoading from 'expo-app-loading'
import {Ubuntu_700Bold, Ubuntu_500Medium, Ubuntu_400Regular, useFonts} from '@expo-google-fonts/ubuntu'
import {Roboto_500Medium, Roboto_400Regular} from '@expo-google-fonts/roboto'

export default function App() {

  let[fontsLoaded] = useFonts({
    Ubuntu_700Bold,
    Ubuntu_500Medium,
    Ubuntu_400Regular,
    Roboto_500Medium,
    Roboto_400Regular
  })
  
  if(!fontsLoaded){
    return <AppLoading/>
  }



  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
      <Routes />
    </>

  )

}
