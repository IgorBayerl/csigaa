import React , {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text,
   View , 
   TouchableOpacity,
   FlatList,
   Alert,
   Modal,
   TextInput 
  } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
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
import { useNavigation } from '@react-navigation/native';
import { bounce } from 'react-native/Libraries/Animated/src/Easing';
import { AntDesign } from '@expo/vector-icons';

// let Modal;

// if (Platform.OS !== 'web') {
//   Modal = require('react-native').Modal;
// } else {
//   Modal = require('./WebModal').default;
// }


export default function Main() {

  const [modalVisible, setModalVisible] = useState(false);
  const { navigate } = useNavigation()

  function navigateToOtherpage(){
      navigate('PosSplash')
  }

  useEffect(() => {
      
  }, []);
     
    

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          CSIGAA
        </Text>
      </View>
      <FlatList
        data={[1,2]}
        style={styles.usersList}
        keyExtractor={item => String(item)}
        ListFooterComponent={()=>(
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={[styles.card, {opacity: 0.7}]}
              onPress={ () => setModalVisible(!modalVisible) }
            >
              <AntDesign name="pluscircleo" size={35} color="white" />
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item: item }) => (
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={ () => navigateToOtherpage() }
            >
              <Text style={styles.userNameTitle}>
                igor_bayerl
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.addCardModal}>
            <Text >Faça login no sigaa</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Usuario'}
              placeholderTextColor={'#adc2cc'}
              color
            />
            <TextInput
              style={styles.textInput}
              placeholder={'Senha'}
              placeholderTextColor={'#adc2cc'}
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={styles.modalButton}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={styles.modalButton}
              >
                <Text style={styles.textStyle}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <StatusBar style="light" />
    </View>
  );
}