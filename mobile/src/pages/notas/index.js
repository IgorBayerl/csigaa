import React , {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  Text, 
  View, 
  TouchableOpacity ,
  FlatList
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
import { AntDesign } from '@expo/vector-icons';
// import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../services/api'

export default function Notas() {

  const route = useRoute()

  // const notas = route.params.notas

  let notas = [
    
    {
      id: 1,
      name: 'calculo',
      selected: true,
      notas:{
        media: 7.5,
        notas: [
          {
            name: 'P1',
            nota: 8 
          },
          {
            name: 'T1',
            nota: 7 
          }
        ]
      }
    },
    {
      id: 2,
      name: 'engenharia de software',
      selected: false,
      notas:{
        media: 8.5,
        notas: [
          {
            name: 'P1',
            nota: 8 
          },
          {
            name: 'T1',
            nota: 9 
          }
        ]
      }
      
    }
  ]

  const [arrayNotas , setArrayNotas] = useState(notas)

  const [update , setUpdate] = useState([])

  useEffect(() => {
    console.log(notas)
  }, []);
     
  function expandOrContractList(item){
    console.log('alooooo ' + item.name)
    const idItem = item.id
    let tempArrayNotas = arrayNotas
    tempArrayNotas[idItem -1].selected = !arrayNotas[idItem -1].selected
    setArrayNotas(tempArrayNotas)

    setUpdate(!update)
  }



  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Notas
      </Text>
      <View style={styles.subContainer}>
        <FlatList
          data={arrayNotas}
          style={styles.usersList}
          extraData={update}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.id)}
          renderItem={({ item: item , index: index}) => (
            <View style={styles.cardContainer}>
              <TouchableOpacity
                style={styles.card}
                onPress={ () => expandOrContractList(item) }
              >
                <Text style={styles.userNameTitle}>
                  {item.name}
                </Text>
              </TouchableOpacity>
              {item.selected ? 
                <View style={styles.detalhes}>
                {/* <Text style={styles.userNameTitle}>
                  Media : {item.notas.media}
                </Text> */}
                  <View style={styles.cardDetailContainer}>
                    <Text style={styles.userNameTitle}>
                      {`Media: ${item.notas.media}`}
                    </Text>
                    <Text style={styles.userNameTitle}>
                      {item.notas.situacao}
                    </Text>
                  </View>
                  <FlatList
                    data={item.notas.notas}
                    style={styles.notasList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => String(item.name)}
                    renderItem={({ item: item , index: index}) => (
                      <View style={styles.cardDetailContainer }>
                        <Text style={styles.userNameTitle}>
                          {item.name}
                        </Text>
                        <Text style={styles.userNameTitle}>
                          {item.nota} 
                        </Text>
                      </View>
                    )}
                  />
                </View>
              :
                <View/>
              }
              
            </View>
          )}
        />
        
      </View>
      <StatusBar style="light" />
      
    </View>
  );
}


