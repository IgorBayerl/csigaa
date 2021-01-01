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
  import { AntDesign } from '@expo/vector-icons';

  export default function StatusIndicator(props){
    
    const status = props.status
    

    switch (status) {
        case -1:
            return (
                <View>
                    <AntDesign name="closecircleo" size={30} color="white" />
                </View>
            )
            break;
        case 0:
            return (
                <View>
                    <ActivityIndicator size="large" color="#FFF" />
                </View>
            )
            break;
        case 1:
            return (
                <View>
                    <AntDesign name="checkcircleo" size={30} color="white" />
                </View>
            )
            break;
    
        default:
            return (
                <View>
                    <Text>????????</Text>
                </View>
            )
    }
    
    return (
        <View>
            <Text>{props.status}</Text>
        </View>
    )
}