import { StyleSheet } from 'react-native';

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
      paddingTop: 22
    },
  subContainer: {
      flex: 1,
      paddingTop: 10,
      width: '100%'
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
    height: 100,
    margin: 5,
    width: '100%',
  },
  cardContainerBottom:{
    backgroundColor: theme.color_card,
    flex: 1,
    height: 100,
    margin: 5,
    width: '100%',
  },
  cardContainerSmall:{
    backgroundColor: theme.color_card,
    flex: 1,
    margin: 5,
    height: 150
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

  }
  
});