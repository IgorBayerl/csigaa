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
    width: '100%',
  },
  cardContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 20
  },
  card:{
    backgroundColor: theme.color_card,
    height: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width:'100%',
    flexDirection: 'row',
    paddingHorizontal:30
  },
  lastCard:{
    backgroundColor: theme.color_card,
    height: 180,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    width:'100%',
    flexDirection: 'row',
    // paddingHorizontal: 40
  },
  modalContainer:{
    // backgroundColor: 'blue',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addCardModal:{
    backgroundColor: theme.modal_color,
    width: '70%',
    height: 200,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userNameTitle:{
    // fontWeight: 'bold',
    color: '#FFF',
    fontSize: 28,
  },
  modalButtonsContainer:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  modalButton:{
    // backgroundColor: '#53788A'
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput:{
    // backgroundColor:'#63808f',
    width: '100%',
    height: '40%',
    color: '#d3e0e6',
    fontWeight: "700",
    fontSize: 26
  },
  textInputContainer:{
    width: '80%',
    // backgroundColor: 'blue',
    paddingLeft: 30
  },
  okButton:{
    alignItems: 'center',
    width: '20%', 
    height: '100%', 
    justifyContent: 'center', 
    paddingRight: 20
  }
  
  
});