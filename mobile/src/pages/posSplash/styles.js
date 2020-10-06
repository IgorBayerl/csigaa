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
      alignItems: 'center',
      paddingHorizontal: 10
    },
  title:{
      fontWeight: 'bold',
      color: '#FFF',
      fontSize: 32,
    },
  button:{
      backgroundColor: '#de2424',
      width: 100,
      height: 100,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
  usersList:{
    width: '90%',
  },
  cardContainer:{
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
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
  modalContainer:{
    // backgroundColor: 'blue',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addCardModal:{
    backgroundColor: theme.modal_color,
    width: '70%',
    height: '30%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userNameTitle:{
    // fontWeight: 'bold',
    color: '#FFF',
    fontSize: 28,
  },
  cardContainerTop:{
    backgroundColor: theme.color_card,
    // flex: 1,
    height: 140,
    margin: 10,
    borderRadius: 5,
    width: '100%',
  },
  cardContainerBottom:{
    backgroundColor: theme.color_card,
    flex: 1,
    height: 100,
    margin: 10,
    borderRadius: 5,
    width: '100%',
  },
  cardContainerSmall:{
    backgroundColor: theme.color_card,
    // flex: 1,
    width: '49%',
    // margin: 10,
    borderRadius: 5,
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  floatingButton:{
    position: 'absolute',
    backgroundColor: '#40A9D6',
    height: 80,
    width: 80,
    borderRadius: 40,
    right: 30,
    bottom: 50,
    alignItems: 'center',
    justifyContent: 'center',

  },
  atividadesContainer:{
    // backgroundColor: '#de2424',
    flex: 1,
    // paddingHorizontal: 5
  },
  atividadesList:{
    // backgroundColor: '#de2424',
    borderRadius: 5,
    paddingHorizontal: 10
  },
  atividadesItemContainer:{
    // backgroundColor: '#de2424',
    flexDirection: 'row', 
    // justifyContent: 'space-between',
    height: 50,
    marginVertical: 5,
    alignItems: 'center'
  },
  atividadesItem_nomeAtividade: {
    fontWeight: "bold",
    // backgroundColor: '#de2424',
    width: '65%'
  },
  contentText:{
    color: 'white',
    fontSize: 15
  },
  atividadesItem_abreviacaoMateria:{
    // backgroundColor: 'blue',
    width: '10%'
  },
  atividadesItem_estado:{
    
    // backgroundColor: '#de2424',
    width: '10%'
  },
  atividadesItem_datadeentrega:{
    
    // backgroundColor: 'blue',
    width: '15%'
  }
  
});