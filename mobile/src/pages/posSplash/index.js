import React , {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
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
import { AntDesign } from '@expo/vector-icons';
// import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../services/api'

export default function PosSplash() {

  const user = {
    name: '',
    password: ''
  }

  const [data , setData] = useState([])

  useEffect(() => {
    loadData()
  }, []);
     
  async function requestUpdate(){
    await api.post('create', {
      userName:user.name,
      userPassword:user.password
    })
  }

  
  async function loadData(){
    const response = await api.post('access', {
      userName:user.name,
      userPassword:user.password
    })
    // console.log(JSON.parse(response.data.info))
    setData(JSON.parse(response.data.info))
  }
 
  function makeArrayNotas(){
    let notas = []
    for (let i = 0; i < data.length; i++) {
      notas.push({
        notas: data[i].notas,
        id: data[i].id
      });
    }
    console.log(notas)
  }

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        UserName
      </Text>
      <View style={styles.subContainer}>
        <View style={styles.cardContainerTop}>
          <Text style={styles.title}>Noticias</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.cardContainerSmall}>
            <Text style={styles.title}>Notas </Text>
          </View>
          <View style={styles.cardContainerSmall}>
            <Text style={styles.title}>Presenças</Text>
          </View>
        </View>
        <View style={styles.cardContainerBottom}>
          <Text style={styles.title}>Atividades</Text>
        </View>
      </View>
      <ButtonReloadInfo onPress={makeArrayNotas()}/>
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

