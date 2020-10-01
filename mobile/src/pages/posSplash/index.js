import React , {useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
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


export default function PosSplash() {

  

  

  useEffect(() => {
    
  }, []);
     
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        UserName
      </Text>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Noticias</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={styles.title}>Notas </Text>
          </View>
          <View>
            <Text style={styles.title}>Presenças</Text>
          </View>
        </View>
        <View>
          <Text style={styles.title}>Atividades</Text>
        </View>
      </View>
      
      <StatusBar style="light" />
    </View>
  );
}

