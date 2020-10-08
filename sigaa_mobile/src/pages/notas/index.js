import React , {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  Text, 
  View, 
  FlatList
} from 'react-native';
import { useRoute } from '@react-navigation/native'
import styles from './styles'

import{ RectButton } from 'react-native-gesture-handler'

export default function Notas() {

  const route = useRoute()

  const notas = route.params.notas

  const [arrayNotas , setArrayNotas] = useState(notas)

  const [update , setUpdate] = useState([])

  useEffect(() => {
    // console.log(notas)
  }, []);
     
  function expandOrContractList(item){
    const idItem = item.id
    let tempArrayNotas = arrayNotas
    tempArrayNotas[idItem ].selected = !arrayNotas[idItem].selected
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
              <RectButton
                style={styles.card}
                onPress={ () => expandOrContractList(item) }
              >
                <Text style={styles.userNameTitle}>
                  {item.name}
                </Text>
              </RectButton>
              {item.selected ? 
                <View style={styles.detalhes}>
                {/* <Text style={styles.userNameTitle}>
                  Media : {item.notas.media}
                </Text> */}
                  {item.notas.notas == [] ? 
                    <View style={styles.cardDetailContainer}>
                      <Text style={styles.userNameTitle}>
                        {`Media: ${item.notas.media}`}
                      </Text>
                      <Text style={styles.userNameTitle}>
                        {item.notas.situacao}
                      </Text>
                    </View>
                  :
                    <View>
                      <Text style={styles.textWarning}>
                        Nenhuma nota cadastrada
                      </Text>
                    </View>
                  }
                  
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


