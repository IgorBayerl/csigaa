import React , {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text,
   View , 
   TouchableOpacity,
   FlatList,
   Alert,
   TextInput ,
   Platform,
   ActivityIndicator
  } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'
import { RectButton } from 'react-native-gesture-handler'
import styles from './styles'

import api from '../../services/api'



import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
const FormData = require('form-data');
import StatusIndicator from '../../components/statusIndicator'

export default function Main() {

  function LeftActions({item}) {
    return (
        <RectButton 
          onPress={()=> deleteUser(item)}
          style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 30, marginTop:20 }}
        >
            <Feather name="x" size={35} color="#adc2cc" />
        </RectButton>
    );
  }



  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState('disable');
  const [contas, setContas] = useState([]);
  const [isNewUser, setIsNewUser] = useState(false);

  const { navigate } = useNavigation()

  function navigateToOtherpage(userName , userPassword, isNewUser){
    const userInfo = {
      name: userName,
      password: userPassword
    }
    
    navigate('PosSplash',{ userInfo , isNewUser })
    setIsNewUser(false)
  }

  useEffect(() => {
    loadData()
  }, []);
  
    

  async function loadData(){
    const acounts = await AsyncStorage.getItem('@SCIGAA_acount')
    setContas(JSON.parse(acounts))
  }

  async function deleteUser(index){
    contas.splice(index, 1)
    setUpdate(!update)
    try {
      await AsyncStorage.setItem('@SCIGAA_acount', JSON.stringify(contas))
      console.log('removido')
    } catch (e) {
      console.log(e)
    }
  }

  async function valudatingUserLogin(userLogin, userSenha){
    console.log(`Verificando login de ${userLogin}`)
    
    let formData = new FormData();
    
    formData.append('user.login', userLogin);
    formData.append('user.senha', userSenha);

    const options = {
        method: 'POST',
        body: formData,
    }

    console.log(formData)

    const serverSigaaLoginResponse = await fetch('https://sig.ifc.edu.br/sigaa/logar.do?dispatch=logOn', options);
    const content = await serverSigaaLoginResponse.text()
    const position = content.indexOf('<a class="perfil" href="perfil.jsf">')
    
    // console.log(content.length)
    console.log(`Position = ${position}`)

    if(position != -1){
        console.log(true)
        return true
    }else{
        console.log(false)
        return false
    }
  }


  async function addButtonPressed(){

    if(userName == '' || userPassword == ''){
      alert('Preencha todos os campos com o nome de usuário e a sua senha do sigaa!')
    }else{

      let tempContas
      if (contas != null){
        tempContas = contas
      }else{
        tempContas = []
      }

      // -1 - Error
      // 0  - Loading
      // 1  - OK
      const pushOBJ = {
        userName: userName,
        userPassword: userPassword,
        status: 0
      }
      tempContas.push(pushOBJ)
      setContas(tempContas)
      setUserName('')
      setUserPassword('')
      setUpdate(!update)

      // const validated = await api.get(`verify?userName=${userName}&userPassword=${userPassword}`)
      const validated = await valudatingUserLogin( userName , userPassword )
      console.log(`alooooo`)
      if(validated == true){
        console.log(`Usuario e senha corretos!!`)
        
        let tempContas = contas
        const userIndex = tempContas.indexOf(pushOBJ)
        // console.log(userIndex)
        
        tempContas[userIndex].status = 1
        // console.log(`CONTAS == ${JSON.stringify(tempContas)}`)
        setContas(tempContas)
        setUpdate(!update)
        setLoading(!loading)

        try {
          await AsyncStorage.setItem('@SCIGAA_acount', JSON.stringify(contas))
          console.log('adicionado')
        } catch (e) {
          console.log(e)
        }

        try {
          const expoToken = await AsyncStorage.getItem('@SIGAA_expoToken');
          const response = await api.post('create_user', {
              userName:userName,
              userPassword:userPassword,
              degree:"bacharel",
              expoToken:expoToken,
              notifications: true
          })

          if(response == "Usuario ja existe"){
            setIsNewUser(false)
          }else{
            setIsNewUser(true)
          }

        } catch (error) {
          console.log(error)
        }

        
      }else{
        console.log(`Usuario e senha incorretos!!`)
        alert(`Usuario e senha incorretos!!`)
        
        let tempContas = contas
        const userIndex = tempContas.indexOf(pushOBJ)
        // console.log(`User index of = ${userIndex}`)

        tempContas[userIndex].status = -1

        // console.log(`CONTAS == ${JSON.stringify(tempContas)}`)
        setContas(tempContas)
        setUpdate(!update)
        setLoading(!loading)
        deleteUser(userIndex)

      }
      
      

    }

  }

  function sleep(ms) {return new Promise((resolve) => {setTimeout(resolve, ms)})}
  
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
            onPress={async () => await addButtonPressed() }
          >
              <Feather name="check" size={35} color="#adc2cc" />
          </TouchableOpacity>
          {/* <AntDesign name="pluscircleo" size={35} color="white" /> */}
        </View>
      </View>
      <FlatList
        data={contas}
        extraData={[update,loading]}
        style={styles.usersList}
        keyExtractor={item => String(item.userName)}
        renderItem={({ item: item , index: index}) => (
          <Swipeable
            renderLeftActions={() => <LeftActions item={index} />}
          >
            <View style={styles.cardContainer}>
              
              {item.status == 1 ?
              <RectButton
                style={styles.card}
                onPress={ () => navigateToOtherpage(item.userName , item.userPassword, isNewUser) }
              >
                <Text style={styles.userNameTitle}>
                  {item.userName}
                </Text>
              </RectButton>
              :
                item.status == -1 
                ? 
                <View style={styles.card}>
                  <Text style={{...styles.userNameTitle,color:'#de2424'}}>
                    {item.userName}
                  </Text>
                </View>

                :
               
                <View style={styles.card}>
                  {/* <Text style={styles.userNameTitle}>
                    {item.userName}
                  </Text> */}
                  <ActivityIndicator size="large" color="#FFF" />
                </View>
              }
              
              {/* <RectButton
                style={styles.card}
                onPress={ () => navigateToOtherpage(item.userName , item.userPassword) }
              >
                <Text style={styles.userNameTitle}>
                  {item.userName}
                </Text>
                <StatusIndicator status={item.status}/>
              </RectButton> */}
            </View>
          </Swipeable>
          
        )}
      />
      <StatusBar style="light" />
    </View>
  );
}

