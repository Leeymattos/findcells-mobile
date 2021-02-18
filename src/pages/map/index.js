import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { useNavigation, useRoute } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'
import api from '../../services/api'


export default function Map() {
  const navigation = useNavigation()
  const route = useRoute()

  function handleNavigateBack() {
    navigation.goBack()
  }

  function handleNavigateToDetail(id) {
    navigation.navigate('detail', {cell_id: id})
  }

  const [initialPosition, setInitialPosition] = useState([0, 0])
  const [cells, setCells] = useState([])

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert('Oooops...', 'Precisamos de sua permissão para obter a localização')
      }


      const location = await Location.getCurrentPositionAsync()

      const { latitude, longitude } = location.coords

      setInitialPosition([
        latitude,
        longitude
      ])
    }
    loadPosition()
  }, [])

  useEffect(()=>{
    api.get('/list_cells', {
      params: {
        city: route.params.selectedCity,
        uf: route.params.selectedUf
      }
    }).then(Response=>{
      setCells(Response.data)
    })
  },[])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={handleNavigateBack}>
        <Icon name='arrow-left' size={24} color='#169c04' />
      </TouchableOpacity>

      <Text style={styles.title}>Bem vindo.</Text>
      <Text style={styles.description}>Econtre no mapa uma célula próxima a você.</Text>

      <View style={styles.mapContainer}>
        {initialPosition[0] !== 0 ? (<MapView
          style={styles.map}
          initialRegion={{
            latitude: initialPosition[0],
            longitude: initialPosition[1],
            latitudeDelta: 0.014,
            longitudeDelta: 0.014,
          }}
        >
          {cells.map(cell=>(
            <Marker style={styles.mapMarker}
            key={cell.id}
            coordinate={{
              latitude: cell.latitude,
              longitude: cell.longitude,
            }}
            onPress={()=>handleNavigateToDetail(cell.id)}>
            <View style={styles.mapMarkerContainer}>
              <Image style={styles.mapMarkerImage} source={{uri: cell.image_url}} />
              <Text style={styles.mapMarkerTitle}>{cell.cell_name}</Text>
            </View>

          </Marker>
          ))}
          
        </MapView>) : (<Text style={styles.loading}>O mapa está sendo carregado, aguarde!</Text>)}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight
  },

  back: {
    marginBottom: 16,
  },

  title: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 26,
    color: '#2f2e41',
    marginTop: 12
  },

  description: {
    fontFamily: 'Ubuntu_500Medium',
    marginTop: 12
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 25
  },

  map: {
    width: '100%',
    height: '80%'
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: 'red',
    flexDirection: 'column',
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 6
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Ubuntu_500Medium',
    color: 'white',
    fontSize: 13,
    lineHeight: 23,
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover'
  },

  loading:{
    fontFamily: 'Ubuntu_700Bold',
  }

})