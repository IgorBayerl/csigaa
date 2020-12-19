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
    marginVertical: 10,
    alignItems: 'center'
  },
  atividadesItemContainerExterno:{
    // backgroundColor: '#de2424',
    justifyContent: 'center',
    // height: 50,
    marginVertical: 10,
    alignItems: 'center',
    // paddingLeft: 5
  },
  atividadesItem_nomeAtividade: {
    fontWeight: "bold",
    // backgroundColor: '#de2424',
    width: '70%'
  },
  contentText:{
    color: 'white',
    fontSize: 15,
    marginLeft:5
  },
  moreInfoContainer:{
    width: '100%'
  },
  moreInfoBox:{
    width: '100%',
    // height: 90,
    backgroundColor: theme.background,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical:10
  },
  // atividadesItem_abreviacaoMateria:{
  //   // backgroundColor: 'blue',
  //   width: '10%'
  // },
  activityIndicatorCenter:{
    height:'100%',
  },
  atividadesItem_estado:{
    
    // backgroundColor: '#de2424',
    width: '10%',
    marginLeft: 5
  },
  atividadesItem_datadeentrega:{
    fontSize: 12,
    // backgroundColor: 'blue',
    width: '20%'
  }
  
});