import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import Constants from 'expo-constants'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react/cjs/react.development';
import api from '../../services/api'
import * as MailComposer from 'expo-mail-composer'


export default function Detail() {
  const navigation = useNavigation()
  const route = useRoute()

  const [cell, setcell] = useState({})

  function handleNavigateBack() {
    navigation.goBack()
  }

  useEffect(() => {
    api.get(`list_cell/${route.params.cell_id}`).then(response => {
      setcell(response.data)
    })
  }, [])

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interesse em participar da Célula',
      recipients: [cell.email]
    })
  }

  function handleWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${cell.whatsapp}&text=Olá, Tenho interesse em partipar da célula`)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={handleNavigateBack}>
          <Icon name='arrow-left' size={24} color='#169c04' />
        </TouchableOpacity>

        <Image style={styles.image} source={{uri: cell.image_url}} />


        <View style={styles.cellInformationContainer}>

          <View style={styles.contentContainer}>
            <Text style={styles.label}>Célula: </Text>
            <Text style={styles.content}>{cell.cell_name}</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.label}>Líder: </Text>
            <Text style={styles.content}>{cell.leader_name}</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.label}>Cor da Rede: </Text>
            <Text style={styles.content}>{cell.network_color}</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.label}>Horário: </Text>
            <Text style={styles.content}>{cell.schedule}</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.label}>Rua: </Text>
            <Text style={styles.content}>{cell.adress}</Text>
          </View>


        </View>

      </View>
      <View style={styles.buttonContainer}>
        <RectButton style={styles.button} onPress={handleWhatsApp}>
          <FontAwesome name='whatsapp' size={24} color='#fff' />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Icon name='mail' size={24} color='#fff' />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32
  },
  back: {
    marginBottom: 16,
  },

  cellInformationContainer:{
    paddingTop: 16
  },

  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12
  },

  label: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 18
  },

  content: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 15
  },

  buttonContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  button:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#169c04',
    height: 60,
    padding: 10,
    width: 150,
    borderRadius: 10
  },

  buttonText:{
  fontFamily: 'Ubuntu_700Bold',
  fontSize: 16,
  color: '#ffff',
  marginLeft: 7
  }

})