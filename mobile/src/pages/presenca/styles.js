import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

///// temas
const themeDark = {
  background:'#12303D' ,
  color_card: '#344C57',
  modal_color: '#53788A'
}
const themeLight = {
  color_card: 'red',
  background:'#13131A',
  modal_color: '#292E8A'
}
const theme = themeDark

export default StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Constants.statusBarHeight+5
    },
  subContainer: {
      flex: 1,
      paddingTop: 10,
      width: '100%',
      alignItems: 'center'
    },
  title:{
      fontWeight: 'bold',
      color: '#FFF',
      fontSize: 32,
    },
  
  usersList:{
    width: '90%',
  },
  notasList:{
    width: '100%',
  },
  cardContainer:{
    // height: 80,
    // width: '100%',
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  cardDetailContainer:{
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: "space-between",
    width: '100%'
  },
  card:{
    backgroundColor: theme.color_card,
    height: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width:'100%'
  },
  
  
  userNameTitle:{
    // fontWeight: 'bold',
    color: '#FFF',
    fontSize: 28,
  },
  
  cardContainerBottom:{
    backgroundColor: theme.color_card,
    flex: 1,
    height: 100,
    margin: 5,
    width: '100%',
  },
  detalhes:{
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#436370',
    borderRadius: 5,
    marginTop: 5,
    paddingVertical: 10,
    alignItems: 'center'
  },
  
  
});