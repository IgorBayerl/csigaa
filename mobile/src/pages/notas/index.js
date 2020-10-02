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

  const notas = route.params.notas

  

  const [data , setData] = useState([])

  useEffect(() => {
    console.log(notas)
  }, []);
     
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Notas
      </Text>
      <View style={styles.subContainer}>
        <FlatList
          data={notas}
          style={styles.usersList}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.id)}
          renderItem={({ item: item , index: index}) => (
            <View style={styles.cardContainer}>
              <TouchableOpacity
                style={styles.card}
                onPress={ () => {} }
              >
                <Text style={styles.userNameTitle}>
                  {item.name}
                </Text>
              </TouchableOpacity>
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
            </View>
          )}
        />
        
      </View>
      <StatusBar style="light" />
      
    </View>
  );
}


