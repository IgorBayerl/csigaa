import React , {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  Text, 
  View, 
  TouchableOpacity ,
  Dimensions,
  ScrollView
} from 'react-native';
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
import { FlatList } from 'react-native-gesture-handler';
export default function PosSplash() {

  const screenWidth = Dimensions.get('window').width-20
  const screenHeight = Dimensions.get('window').height

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
    // const response = await api.post('access', {
    //   userName:user.name,
    //   userPassword:user.password
    // })
    // // console.log(JSON.parse(response.data.info))
    // console.log('[ Carregando informações do aluno ] ...')

    // setData(JSON.parse(response.data.info))
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
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            
          >
            <View 
              style={{
                width : screenWidth,
                paddingHorizontal: 10
              }}
            >
              <Text style={styles.title}>Nome da materia</Text>
              <Text style={styles.contentText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</Text>
            </View>
            <View 
              style={{
                width : screenWidth,
                paddingHorizontal: 10
              }}
            >
              <Text style={styles.title}>Noticias</Text>
              <Text style={styles.contentText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</Text>
            </View>
            
      

          </ScrollView>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
          <TouchableOpacity 
            onPress={() => navigateToOtherpage()}
            style={styles.cardContainerSmall}
          >
            <Text style={styles.title}>Notas </Text>
            {/* <FontAwesome5 name="calendar-alt" size={40 } color="white" /> */}
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigateToPresencas()}
            style={styles.cardContainerSmall}
          >
            <Text style={styles.title}>Presenças</Text>
            {/* <FontAwesome5 name="calendar-alt" size={40 } color="white" /> */}
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainerBottom}>
          {/* <Text style={styles.title}>Atividades pendentes</Text> */}
          
          <View style={styles.atividadesContainer}>
            <FlatList
              data={[1,2,3,4,5,6,7,8,9,10]}
              showsVerticalScrollIndicator={false}
              style={styles.atividadesList}
              keyExtractor={item => String(item)}
              renderItem={({ item: item , index: index}) => (
                <View style={styles.atividadesItemContainer}>
                  <Text style={[styles.contentText,styles.atividadesItem_abreviacaoMateria]}>
                    C1
                  </Text>
                  <Text style={[styles.contentText,styles.atividadesItem_nomeAtividade]}>
                    Atividade teste
                  </Text>
                  <Text style={[styles.contentText,styles.atividadesItem_datadeentrega]}>
                    22/10
                  </Text>
                  <Text style={[styles.contentText,styles.atividadesItem_estado]}>
                    <AntDesign name="checkcircle" size={23} color="white" />
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </View>
      {/* <ButtonReloadInfo onPress={update()}/> */}
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

