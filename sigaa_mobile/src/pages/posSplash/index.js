import React , {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  Text, 
  View, 
  TouchableOpacity ,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from 'react-native';


import AsyncStorage from '@react-native-community/async-storage'
import { useRoute, useNavigation } from '@react-navigation/native'
import styles from './styles'

import { AntDesign,FontAwesome } from '@expo/vector-icons';
// import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../services/api'
import { FlatList } from 'react-native-gesture-handler';

import{ RectButton } from 'react-native-gesture-handler'
import { version } from 'react/cjs/react.development';
export default function PosSplash() {

  const screenWidth = Dimensions.get('window').width-20
  const screenHeight = Dimensions.get('window').height

  const route = useRoute()

  const user = route.params.userInfo
  const isNewUser = route.params.isNewUser

  const { navigate } = useNavigation()

  async function navigateToOtherpage(){
    notas = await makeArrayNotas()
    // console.log('[array de notas]: ' + notas)
    navigate('Notas',{ notas })
  }

  async function navigateToPresencas(){
    presencas = await makeArrayPresencas()
    // console.log('[array de presenca]: ' + presencas)
    navigate('Presenca',{ presencas })
  }

  const [updateList , setUpdateList] = useState([])
  const [data , setData] = useState([])
  const [atividades , setAtividades] = useState([])
  const [extraGeralData , setExtraGeralData] = useState([])
  const [isLoading , setIsLoading] = useState(true)

  useEffect(() => {
    requestUserData(user.name , user.password)
    console.log(isNewUser)
    if(isNewUser){
      alert('A primeira vez que você faz login neste serviço temos que terminar seu cadastro no nosso sistema .. Isso leva alguns instantes .. Volte daqui alguns minutinhos.')

    }
  }, []);
     
  async function loadOldData(){
    const oldData = await AsyncStorage.getItem('@SCIGAA_oldData')
    if(oldData){

      // console.log(JSON.parse(oldData.data.info).arrayMaterias)
      console.log('[ Carregando informações antigas do aluno ] ...')
      setExtraGeralData(JSON.parse(oldData.info))
      setData(JSON.parse(oldData.info).arrayMaterias)
      setAtividades(JSON.parse(oldData.info).array_atividades)
      setIsLoading(false)
    }

  }

  async function requestUserData(userName, userPassword){
    try {
      const response = await api.get(`access?userName=${userName}&userPassword=${userPassword}`)

      console.log('[ Carregando informações do aluno ] ...')
      setExtraGeralData(JSON.parse(response.data.info))
      setData(JSON.parse(response.data.info).arrayMaterias)
      setAtividades(JSON.parse(response.data.info).array_atividades)

      await AsyncStorage.setItem('@SCIGAA_acounts', JSON.stringify(response.data))
      console.log('[Salvando informações localmente]...')
      setIsLoading(false)
    } catch (error) {
      if(error){
        console.log(error)
        alert('Erro ao coletar informações do servidor.')
        loadOldData()
      }
    }
    
    
  }


  function ativarVisualizacaoAtividade(item){
    let arrayTemp = atividades

    arrayTemp.forEach(element => {
      element.activated = false
    });

    arrayTemp[item-1].activated = !arrayTemp[item-1].activated
    setAtividades(arrayTemp)
    // console.log(atividades)
    setUpdateList(!updateList)
  }

 
  async function makeArrayNotas(){
    let notas = []
    for (let i = 0; i < data.length; i++) {
      notas.push({
        notas: data[i].notas,
        selected: false,
        name: data[i].name,
        id: data[i].id
      });
    }
    console.log('[ Construindo array de notas ] ...')
    return(notas)
  }

  async function makeArrayPresencas(){
    let presencas = []
    try {
      for (let i = 0; i < data.length; i++) {
        console.log('alooo')
        presencas.push({
          presenca: data[i].presenca,
          selected: false,
          name: data[i].name,
          id: data[i].id
        });
      }
    } catch (error) {
      console.log(error)
    }
    
    console.log('[ Construindo array de presencas ] ...')
    return(presencas)
  }

  

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between', width: '90%'}}>
      <Text style={styles.title}>
        {user.name}
      </Text>

      </View>
      <View style={styles.subContainer}>
        <View style={styles.cardContainerTop}>
          {
            isLoading
            ?
            <ActivityIndicator style={styles.activityIndicatorCenter} size='large' color="#fff" />
            :
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
                <Text style={styles.title}>Informações</Text>
                <Text style={styles.contentText}>{extraGeralData.nome}</Text>
                <Text style={styles.contentText}>{extraGeralData.unidade}</Text>
                <Text style={styles.contentText}>{extraGeralData.matricula}</Text>
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
          }
          
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
          <RectButton 
            onPress={() => navigateToOtherpage()}
            style={styles.cardContainerSmall}
          >
            <Text style={styles.title}>Notas </Text>
            {/* <FontAwesome5 name="calendar-alt" size={40 } color="white" /> */}
          </RectButton>
          <RectButton 
            onPress={() => navigateToPresencas()}
            style={styles.cardContainerSmall}
          >
            <Text style={styles.title}>Presenças</Text>
            {/* <FontAwesome5 name="calendar-alt" size={40 } color="white" /> */}
          </RectButton>
        </View>
        <View style={styles.cardContainerBottom}>
          {/* <Text style={styles.title}>Atividades pendentes</Text> */}
          
          <View style={styles.atividadesContainer}>
            {
            isLoading 
            ? 
            <ActivityIndicator style={styles.activityIndicatorCenter} size='large' color="#fff" />
            :
            <FlatList
              data={atividades}
              showsVerticalScrollIndicator={false}
              style={styles.atividadesList}
              extraData={updateList}
              keyExtractor={item => String(item.index)}
              renderItem={({ item: item , index: index}) => (
                <View style={styles.atividadesItemContainerExterno}>
                  <RectButton 
                    onPress={() => ativarVisualizacaoAtividade(item.index)}
                    style={styles.atividadesItemContainer}
                  >
                    <View
                    style={[styles.atividadesLeftContainer,styles.atividadesItem_nomeAtividade]}
                    >
                      <Text style={[styles.contentText]}>
                        {item.disciplina}
                      </Text>
                      <Text 
                        numberOfLines={1} 
                        ellipsizeMode={'tail'}
                        style={[styles.contentText]}
                      >
                        {item.description}
                      </Text>
                    </View>
                    
                    <Text style={[styles.contentText,styles.atividadesItem_datadeentrega]}>
                      {item.dataDeEntrega}
                    </Text>
                    <Text style={[styles.contentText,styles.atividadesItem_estado]}>
                      <AntDesign name="checkcircle" size={23} color={item.situacao == "Expirado" ?"#999999":"white"} />
                    </Text>
                  </RectButton>
                  {/* <Text style={[styles.contentText,styles.atividadesItem_abreviacaoMateria]}>
                    C1
                  </Text> */}
                  {
                    item.activated ? 
                    <View style={styles.moreInfoContainer}>
                      <View style={styles.moreInfoBox}>
                      <View style={{flexDirection:'row',justifyContent: 'space-between', marginBottom: 5}}>
                        <Text style={{...styles.contentText, fontWeight:'bold'}}>
                          {item.situacao}
                        </Text>
                        <Text style={{...styles.contentText, fontWeight:'bold'}}>
                          {item.horaDeEntrega}
                        </Text>
                      </View>
                      <Text 
                        numberOfLines={6} 
                        ellipsizeMode={'tail'}
                        style={[styles.contentText]}
                      >
                        {item.description}
                      </Text>
                      </View>
                    </View>
                    :
                    <View/>
                  }
                  
                </View>
              )}
            />
            }
            
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

