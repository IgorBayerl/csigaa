import React , {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  Text, 
  View, 
  TouchableOpacity ,
  FlatList
} from 'react-native';
import { useRoute } from '@react-navigation/native'
import styles from './styles'
import{ RectButton } from 'react-native-gesture-handler'


export default function Presenca() {

  const route = useRoute()

  const presencas = route.params.presencas

  

  const [data , setData] = useState([])
  const [arrayPresencas , setArrayPresencas] = useState(presencas)

  const [update , setUpdate] = useState([])

  useEffect(() => {
    console.log(presencas)
  }, []);
     
  function expandOrContractList(item){
    const idItem = item.id
    let tempArrayPresencas = arrayPresencas
    tempArrayPresencas[idItem ].selected = !arrayPresencas[idItem].selected
    setArrayPresencas(tempArrayPresencas)

    setUpdate(!update)
  }
  

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
              <RectButton
                style={styles.card}
                onPress={ () => expandOrContractList(item) }
              >
                <Text style={styles.userNameTitle}>
                  {item.name}
                </Text>
              </RectButton>
              {/* ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; */}
              {item.selected ? 
                <View style={styles.detalhes}>
                {/* <Text style={styles.userNameTitle}>
                  Media : {item.notas.media}
                </Text> */}
                  {item.presenca.arrayDePresencas == [] ? 
                    <View style={styles.cardDetailContainer}>
                      {/* <Text style={styles.userNameTitle}>
                        {`Media: ${item.notas.media}`}
                      </Text>
                      <Text style={styles.userNameTitle}>
                        {item.notas.situacao}
                      </Text> */}
                    </View>
                  :
                    <View>
                      <Text style={styles.textWarning}>
                        Nenhuma aula cadastrada
                      </Text>
                    </View>
                  }
                  
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
              :
                <View/>
              }

              {/* ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; */}
              
            </View>
          )}
        />
        
      </View>
      <StatusBar style="light" />
      
    </View>
  );
}


