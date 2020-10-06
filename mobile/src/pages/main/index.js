import React , {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text,
   View , 
   TouchableOpacity,
   FlatList,
   Alert,
   TextInput ,
   Platform,
   AsyncStorage
  } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import styles from './styles'

import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';



export default function Main() {

  function LeftActions({item}) {
    return (
        <TouchableOpacity 
          onPress={()=> deleteUser(item)}
          style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 30, marginTop:20 }}
        >
            <Feather name="x" size={35} color="#adc2cc" />
        </TouchableOpacity>
    );
  }

  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [update, setUpdate] = useState(false);

  const { navigate } = useNavigation()

  function navigateToOtherpage(userName , userPassword){
    const userInfo = {
      name: userName,
      password: userPassword
    }
    navigate('PosSplash',{ userInfo })
  }

  useEffect(() => {
    loadData()
  }, []);
  
  const [contas, setContas] = useState([]);   

  async function loadData(){
    setContas(JSON.parse(await AsyncStorage.getItem('@SCIGAA_acounts')))
  }

  async function deleteUser(index){
    contas.splice(index, 1)
    setUpdate(!update)
    try {
      await AsyncStorage.setItem('@SCIGAA_acounts', JSON.stringify(contas))
      console.log('removido')
    } catch (e) {
      console.log(e)
    }
  }


  async function addButtonPressed(){
    let tempContas
    if (contas != null){
      tempContas = contas
    }else{
      tempContas = []
    }

    if(userName != '' && userPassword != ''){
      const adicionar = {
        userName: userName,
        userPassword: userPassword
      }
      tempContas.push({
        userName: userName,
        userPassword: userPassword
      })
      setContas(tempContas)
      setUserName('')
      setUserPassword('')
      setUpdate(!update)
      try {
        await AsyncStorage.setItem('@SCIGAA_acounts', JSON.stringify(contas))
        console.log('adicionado')
      } catch (e) {
        console.log(e)
      }

    }else{
      alert('preencha o nome de usuário e a sua senha do sigaa!')
    }
  }
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          CSIGAA
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={[styles.lastCard, {opacity: 0.7}]} >
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={'Usuario'}
              placeholderTextColor={'#adc2cc'}
              onChangeText={text => setUserName(text)}
              value={userName}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'Senha'}
              placeholderTextColor={'#adc2cc'}
              onChangeText={text => setUserPassword(text)}
              value={userPassword}
            />
          </View>
          
          <TouchableOpacity
            style={styles.okButton}
            onPress={() => addButtonPressed() }
          >
              <Feather name="check" size={35} color="#adc2cc" />
          </TouchableOpacity>
          {/* <AntDesign name="pluscircleo" size={35} color="white" /> */}
        </View>
      </View>
      <FlatList
        data={contas}
        extraData={update}
        style={styles.usersList}
        keyExtractor={item => String(item.userName)}
        renderItem={({ item: item , index: index}) => (
          <Swipeable
            renderLeftActions={() => <LeftActions item={index} />}
          >
            <View style={styles.cardContainer}>
              
              <TouchableOpacity
                style={styles.card}
                onPress={ () => navigateToOtherpage(item.userName , item.userPassword) }
              >
                <Text style={styles.userNameTitle}>
                  {item.userName}
                </Text>
              </TouchableOpacity>
            </View>
          </Swipeable>
          
        )}
      />
      <StatusBar style="light" />
    </View>
  );
}