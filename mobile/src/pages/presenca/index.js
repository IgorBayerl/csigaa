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

export default function Presenca() {

  const route = useRoute()

  const presencas = route.params.presencas

  

  const [data , setData] = useState([])

  useEffect(() => {
    console.log(presencas.presenca)
  }, []);
     
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Presenças
      </Text>
      <View style={styles.subContainer}>
        <FlatList
          data={presencas}
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
                    Presencas
                  </Text>
                  
                </View>
                <FlatList
                  data={item.presenca.arrayDePresencas}
                  style={styles.notasList}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => String(item.dia)}
                  renderItem={({ item: item , index: index}) => (
                    <View style={styles.cardDetailContainer }>
                      <Text style={styles.userNameTitle}>
                        {item.dia}
                      </Text>
                      <Text style={styles.userNameTitle}>
                        {item.situacao}
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


