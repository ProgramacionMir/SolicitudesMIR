import { StatusBar } from 'expo-status-bar';
import {ActivityIndicator,Image, Dimensions, Modal, Platform, Pressable, StyleSheet, Text, TextInput, View,FlatList, Alert, Button } from 'react-native';
import { Card } from '@rneui/themed';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useRef } from 'react';

import { useNavigation } from '@react-navigation/native';


//datepicker 
import DateTimePicker from '@react-native-community/datetimepicker';

//import {Picker} from '@react-native-picker/picker';
//import { BlurView } from '@react-native-community/blur';

const stack = createNativeStackNavigator();


// App function, this is the responssible to give the route for app Screen


  async function  getdatafromapi (url) {

    data = await fetch (url).then(res => res.json()    
    ).then((data) =>{
      return data
    });
    console.log(data);
  
  }
  
  /*  function (data){ 
      if(Response.ok){
        Response.blob().then(function(miblob) {
          var objecturl = URL.createObjectURL(miblob);
          
        });
      }
      else {
        console.log('la respuesta del la red fue ok, pero el servidor no respondio de la misma maenra');
      }
    }
  ).catch (function (err) {
    console.log('hay un problema con la peticion fetch codigo de error:' + err.message);
  }
  */


export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator>

      <stack.Screen 
          name = "Login"
          component = {Login}  
          options={{title: ""}}
        />

      <stack.Screen 
          name = "Admin"
          component = {Admin}
          options={{title: ""}}
        />


      </stack.Navigator>
    </NavigationContainer>
  );
}


// login view is the responsible to authenticate the person to khow who are trying to connect

const Login = ({navigate}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, onChangeuser] = useState('');
  const [pass, onChangepass] = useState('');


  function auth(){
    try{
        switch(user){
            case "hola": 
                switch (pass) {
                    case "hola":
                         return (
                            Alert.alert('Log succesfull', 'press ok to redirect you to the app', [
                              {text: 'OK', /* navigation.navigate('Profile', {name: 'Jane'}) */ },
                              ])
                         )
                        break;
                
                    default:
                        return(
                            Alert.alert('password dont match', "the password don't match ", [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                              ])
                        )
                        break;
                }
                break;
            default:
                return(
                    Alert.alert('Email or password not found',"user and password are not reconizable by the server"+pass +user)
                )
                break;
        }
    }
    catch (err){
        console.log("err.. 001:" + "Auth function not work correctly, chech the switch statement ")
        return (
            alert(err + " err 001:"+ "check the console to khow more abbout the error")
        )
    }
}

  return (
    <View style={stylos.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={stylos.centeredView}>
          <View style={stylos.modalView}>
          <Text style={stylos.modalTitle}>Bienvenidos</Text>
          <Text style={stylos.modalText}>inicia sesion</Text>
            <TextInput 
              style={stylos.input}
              onChangeText={onChangeuser}
              value={user}
              placeholder='Ingrese su usuario'
              placeholderTextColor= "#00000050"

            />
            <TextInput
              style = {stylos.input}
              onChangeText={ onChangepass}
              value={pass}
              textContentType='password'
              secureTextEntry={true}
              placeholder='Ingrese su contraseña'
              placeholderTextColor= "#00000050"

            />
            <Pressable
              style={[stylos.button, stylos.buttonClose]}
              onPress={() => auth()}>
              <Text style={stylos.textStyle}>iniciar secion</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[stylos.button, stylos.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={stylos.textStyle}>inicie sesion</Text>
      </Pressable>
    </View>
  );
};


// Admin Class, this class is for admin view 

class Admin extends React.Component{
  constructor(props) {
    super (props)

    this.state = {
      loadding: false,
      //nombre: [],
      solicitudes: [],
      //dia: [],
      //informacion:[],
      url: 'https://pokeapi.co/api/v2/pokemon/'
    }
  }
  componentDidMount () {
    this.getsolicitudes();
  }

  getsolicitudes = () => {
    this.setState({loadding: true})
    fetch(this.state.url).then(res =>  res.json()).then(res => {
      this.setState({
        solicitudes: res.results,
        url:res.next,
        loadding:false
      })
      .catch (err => {
        return (
          <>
           <View>
            <Text>no se pudo parsear los datos del api </Text>
            <Text>contacte con el tecnico y envie este mensaje de error</Text>
            <Text>a41-001 {err}</Text>
           </View>
          </>
        )
      })
    }).catch (err => {
        return (
          <>
           <View>
            <Text>no se pudo hacer fetch a los datos del api </Text>
            <Text>contacte con el tecnico y envie este mensaje de error</Text>
            <Text>a41-010 {err}</Text>
           </View>
          </>
        )
      })
  }

  render(){
    if(this.state.loadding){
      return(
        <View style = {LoaddingScreen.View} >
          <Text>Descargando datos de la nube espere un momento</Text>
          <ActivityIndicator size="large" color="#9D1039" hidesWhenStopped = "true" />
        </View>
      );
    }
    
    return (
      <View>
        <Text>Lista de solicitudes</Text>
        <FlatList
        data = {this.state.solicitudes}
        renderItem = {
          ({item}) => <Text>({item.name})</Text>
        }/>
      </View>
    )
  }
}

// function for the educator or service view responsible to send the request from the service or educators

function EducatorScreen ({user}){
  const [Value, onValueChange] = useState ("Selecciona un servicio")
  const [descripcion, onChangedescripcion] =useState ('');
  const [date, setdate] = useState(new Date(1598051730000));
  const [mode, setmode] = useState('date');
  const [show, setshow] = useState(false);


  const onchange = (ev, selectdDate) =>  {
    const currentDate = selectdDate;
    setshow(false);
    setdate(currentDate)
  }

  const showmode =( currentmode) => {
    if(Platform.OS === "android"){
      setshow(false0)
    }
    setmode(currentmode);
  };

  const showDatePicker = () =>{
    showmode('date');
  };

  const showTimePicker = () => {
    showmode('time')
  }


  return(
    <>   
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style = {teacher.requestecard}>
        <View style = {teacher.container}>
          <View style ={teacher.requestecardHeader}>
            <Text>solicitudes</Text>
          </View>
          <View style = {teacher.requestecardbody}>
            
          <TextInput placeholder='Que desea solicitar'></TextInput>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            onChange={onchange}
            style={styles.windowsPicker}
            placeholderText="select date"
          />
          <TextInput placeholder='Que desea solicitar'></TextInput>
          <TextInput placeholder='Que desea solicitar'></TextInput>            
          </View>
          <View style = {teacher.requestecardButtoncontainer}>
            <Pressable>
              <Text>Enviar</Text>
            </Pressable>
            <Pressable><Text> Tiene problemas con la plataforma?</Text></Pressable>
          </View>
        </View>
      </View>
    </View>
    </>
  );
}

// stylesheet code 

const teacher = StyleSheet.create({

  requestecardHeader: {
    alignItems: 'center'
  },
  requestecardbody: {
    alignItems: 'center'
  },
  requestecardButtoncontainer:{
    alignItems: 'center'
  } 

});

const Admvielist = StyleSheet.create({
  View: {
    
  },
  centeredView: {

  },

})

const stylos = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cyan'
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 70,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#ED339AF9',
    fontFamily: "Times New Roman"

  },
  buttonClose: {
    marginTop:15,
    backgroundColor: '#21F325',
    fontFamily: "Times New Roman"

  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: "Times New Roman"

  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'italic',
    fontFamily: "Times New Roman"

  },
  modalTitle: {
    marginBottom: 30,
    marginTop: -30,
    textAlign: 'center',
    fontSize: 30,
    textShadowOffset:{
      width: 0,
      height: 2
    },
    textShadowColor: '#00000050',
    textShadowRadius: 2,
    fontFamily: "Times New Roman"
  },
  input:{
    marginBottom:10,
    borderRadius: 10,
    color: 'black',
    fontSize: 20,
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const LoaddingScreen = StyleSheet.create(
  {
    View : {
      Color: '#9D1039',
      textAlign: 'center',
      fontWeight: 20
    }
  }
);


// dump code that i think i wil use in the future (reference or idk)

/*

  void function verify(User, Pass ){
    if(User == "chris"){
      return !modalVisible
    }
    else{
      return Alert("no se encuentra el usuario")
    }

  }

const deviceWidth =Dimensions.get("windows").width;
const deviceheigth = Platform.OS === "ios" ? 
Dimensions.get("window").height: 
require("react-native-extra-dimensions-android")
.get("REAL_WINDOWS_HEIGTH");

*/