import React , {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'
import styles from './styles'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
  sequence,
} from 'react-native-reanimated';
import { AntDesign,FontAwesome5 } from '@expo/vector-icons';
// import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../services/api'
export default function PosSplash() {

  const route = useRoute()

  const user = route.params.userInfo

  const { navigate } = useNavigation()

  async function navigateToOtherpage(){
    notas = await makeArrayNotas()
    navigate('Notas',{ notas })
  }

  async function navigateToPresencas(){
    presencas = await makeArrayPresencas()
    navigate('Presenca',{ presencas })
  }

  const [data , setData] = useState([])

  useEffect(() => {
    loadData()
  }, []);
     
  async function requestUpdate(){
    console.log(user)
    await api.post('create', {
      userName:user.name,
      userPassword:user.password
    })
  }

  function update(){
    requestUpdate()
  }

  
  async function loadData(){
    const response = await api.post('access', {
      userName:user.name,
      userPassword:user.password
    })
    // console.log(JSON.parse(response.data.info))
    console.log('[ Carregando informações do aluno ] ...')

    setData(JSON.parse(response.data.info))
  }
 
  async function makeArrayNotas(){
    let notas = []
    for (let i = 0; i < data.length; i++) {
      notas.push({
        notas: data[i].notas,
        id: data[i].id
      });
    }
    console.log('[ Construindo array de notas ] ...')
    return(notas)
  }

  async function makeArrayPresencas(){
    let presencas = []
    for (let i = 0; i < data.length; i++) {
      console.log('alooo')
      presencas.push({
        presenca: data[i].presenca,
        id: data[i].id
      });
    }
    console.log('[ Construindo array de presencas ] ...')
    return(presencas)
  }

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {user.name}
      </Text>
      <View style={styles.subContainer}>
        <View style={styles.cardContainerTop}>
          <Text style={styles.title}>Noticias</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity 
            onPress={() => navigateToOtherpage()}
            style={styles.cardContainerSmall}
          >
            <Text style={styles.title}>Notas </Text>
            <FontAwesome5 name="calendar-alt" size={80 } color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigateToPresencas()}
            style={styles.cardContainerSmall}
          >
            <Text style={styles.title}>Presenças</Text>
            <FontAwesome5 name="calendar-alt" size={80 } color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainerBottom}>
          <Text style={styles.title}>Atividades</Text>
        </View>
      </View>
      <ButtonReloadInfo onPress={update()}/>
      <StatusBar style="light" />
      
    </View>
  );
}

function ButtonReloadInfo ( onPress ){
  return(
    <TouchableOpacity 
      onPress={() => onPress}
      style={styles.floatingButton}
    >
      <AntDesign name="reload1" size={34} color="white"  />
    </TouchableOpacity>
  )
}

