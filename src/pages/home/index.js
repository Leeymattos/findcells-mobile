import React from 'react';
import { Text, View, StyleSheet, Image, Alert } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react/cjs/react.development'
import axios from 'axios';
import RNPickerSelect from "react-native-picker-select"



export default function Home() {

  const navigation = useNavigation()

  const [ufs, setUfs] = useState([])
  const [citys, setCityes] = useState([])

  const [selectedUf, setSelectedUf] = useState('0')
  const [selectedCity, setSelectedCity] = useState('0')

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla)

      setUfs(ufInitials)
    })
  }, [])

  useEffect(() => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(Response => {
      const cityNames = Response.data.map(city => city.nome)

      setCityes(cityNames)
    })
  }, [selectedUf])


  function handleNavigationToMap() {
    if (selectedUf && selectedCity == 0) {
      Alert.alert(
        'Alerta!',
        'Você precisa informar seu estado e sua cidade para continuar!',
      )
    } else {
      navigation.navigate('map', { selectedUf: selectedUf, selectedCity: selectedCity })
    }

  }

  const listUfs =
    ufs.map(uf => (
      { label: uf, value: uf }
    ))

  const listCitys =
    citys.map(city => (
      { label: city, value: city }
    ))

  const selectuf = () => {
    return (
      <RNPickerSelect
        onValueChange={(value) => { setSelectedUf(value) }}
        items={listUfs}
        placeholder={{
          label: 'Selecione um Estado',
          value: '0'
        }}
      >

        <View style={styles.placeholderSelected}>
          {selectedUf == 0 ? (
            <Text style={styles.selectText}>Selecione um Estado</Text>
          ) : (
              <Text style={styles.selectText}>{selectedUf}</Text>
            )}
        </View>



      </RNPickerSelect>
    )
  }


  const selectcity = () => {
    return (
      <RNPickerSelect
        onValueChange={(value) => { setSelectedCity(value) }}
        items={listCitys}
        placeholder={{
          label: 'Selecione uma Cidade',
          value: '0'
        }}


      >
        <View style={styles.placeholderSelected}>
          {selectedCity == 0 ? (
            <Text style={styles.selectText}>Selecione uma Cidade</Text>
          ) : (
              <Text style={styles.selectText}>{selectedCity}</Text>
            )}
        </View>


      </RNPickerSelect>
    )
  }

  return (
    <View style={styles.container}>

      <View style={styles.main}>
        <Image style={styles.image} source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Esse é seu sistema de pesquisa de células</Text>
        <Text style={styles.description}>Logo abaixo, nos informe seu estado e sua
           cidade para nos ajudar a pesquisar célula mais próxima a você!</Text>
      </View>

      <View style={styles.selectContainer}>
        <View style={styles.select}>
          {selectuf()}

        </View>

        <View style={styles.select}>
          {selectcity()}
        </View>


        <RectButton style={styles.button} onPress={handleNavigationToMap} rippleColor='#f0f0f5' >

          <View style={styles.buttonIcon}>
            <Text>
              <Icon name='arrow-right' size={24} color='#ffff' />
            </Text>
          </View>

          <Text style={styles.buttonText}>Entrar</Text>

        </RectButton>


      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32

  },

  main: {
    flex: 1,
    justifyContent: 'center'
  },

  image: {
    marginBottom: 32
  },

  title: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 26,
    color: '#2f2e41',
  },

  description: {
    fontFamily: 'Roboto_500Medium',
    marginTop: 16,
    width: '60%',

    color: '#8d8e90'
  },

  selectContainer: {

  },
  select: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    height: 50,
    marginHorizontal: 10,

  },

  placeholderSelected: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    backgroundColor: '#169c04',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 8,
    alignItems: 'center'
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 8
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 16,
  },

  selectText:{
    fontFamily: 'Ubuntu_500Medium',
    color: '#8d8e90'
  }







})

