import { StatusBar } from 'expo-status-bar';
import {ActivityIndicator,Image, Dimensions, Modal, Platform, Pressable, StyleSheet, Text, TextInput, View,FlatList, Alert, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useRef } from 'react';

//email
import emailjs from '@emailjs/browser'

//datepicker 
import DateTimePicker from '@react-native-community/datetimepicker';
import { template } from '@babel/core';

//import {Picker} from '@react-native-picker/picker';
//import { BlurView } from '@react-native-community/blur';

const HomeScreen = ({navigation  }) => {
  const [modalVisible, setModalVisible] = useState(false);
 const [user, onChangeuser] = useState('');
 const [pass, onChangepass] = useState('');
 
 function Auth(){
   try{
       switch(user){
           case "Adm": 
               switch (pass) {
                   case "adm":
                        return (
                           Alert.alert('Log succesfull', 'press ok to redirect you to the app', [
                             {text: 'OK', onPress :() => navigation.navigate('Admin')},
                             ])
                        )
                       break;
               
                   default:
                       return(
                           Alert.alert('password dont match', "the password don't match ", [
                               {text: 'OK', onPress:() => navigation.navigate('Details')},
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
           Alert.alert(err + " err 001:"+ "check the console to khow more about the error")
       )
   }
}


 return (
   <View style={stylos.centeredView}>
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
             onPress={() => Auth()}>
             <Text style={stylos.textStyle}>iniciar secion</Text>
           </Pressable>
         </View>
       </View>
   </View>
 );
}

function ServiceScreen() {
const [Value, onValueChange] = useState ("Selecciona un servicio")
 const [descripcion, onChangedescripcion] =useState ('');
 const [date, setdate] = useState(new Date(1598051730000));
 const [mode, setmode] = useState('date');
 const [show, setshow] = useState(false);

 const emailcontent = useRef();

 const sendEmail = (e) => {
  e.preventDefault();

  emailjs.sendForm('service_d936nws', 'template_4giacxs', emailcontent.current, 'Kst069UH2IrEbXZJ_')
  .then((result) => {
    console.log(result.text);
  },
  (err) => {
    console.log(error.text);
  });
}
 

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

 var nombre = 'jose'


 return(
   <>   
   <View style={teacher.mainview}>
     <View style = {teacher.requestecard}>
       <View style = {teacher.container}>
         <View style ={teacher.requestecardHeader}>
           <Text style = {teacher.title}>solicitudes</Text>
         </View>
         <View style = {teacher.requestecardbody}>
           
         <TextInput style = {teacher.textbox}placeholder='Que desea solicitar'></TextInput>
         <Text> Para cuando desea lo solicitado</Text>
         <TextInput style = {teacher.textbox} placeholder='motivos de la solicitud'></TextInput>
         <Text style = {teacher.text}>{nombre}</Text>            
         </View>
         <View style = {teacher.requestecardButtoncontainer}>
           <Pressable style = {teacher.submitbtn}>
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


class Admin extends React.Component{
  sucess(){
    const TemplateParams ={
      Name: 'hola',
      Msg: ' saludos queremos informarle que su solicitud fue aprovada'
    }

    emailjs.send('service_d936nws', 'template_4giacxs', TemplateParams, 'Kst069UH2IrEbXZJ_')
    .then((result) => {
      console.log(result.text);
    },
    (err) => {
      console.log(error.text);
    });
  }

  declined(){
    const TemplateParams ={
      Name: 'hola',
      Msg: ' saludos queremos informarle que su solicitud fue rechazada'
    }

    emailjs.send('service_d936nws', 'template_4giacxs', TemplateParams, 'Kst069UH2IrEbXZJ_')
    .then((result) => {
      console.log(result.text);
    },
    (err) => {
      console.log(error.text);
    });
  }


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
     <View style ={Admvielist.centeredView}>
       <Text>Lista de solicitudes</Text>
       <FlatList style ={Admvielist.list}
       data = {this.state.solicitudes}
       renderItem = {
         ({item}) => <>
         <View style = {Admvielist.card}>
           <View>
             <Text style={Admvielist.listext}>nombre: Luz divina</Text>
             <Text style={Admvielist.listext}>Solicitud: {item.name}</Text>
             <Text style={Admvielist.listext}>fecha: {item.name}</Text>
           </View>
           <View>
             <Pressable style ={Admvielist.btnsuceed} onPress={() => this.sucess()}><Text>aprovar</Text></Pressable>
             <Pressable style ={Admvielist.btncancel} onPress={() => this.declined()}><Text>Rechazar</Text></Pressable>
           </View>          
         </View>
         </>
       }/>
     </View>
   )
 }
}


const Stack = createNativeStackNavigator();

function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName="Home">
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="Solicitudes" component={ServiceScreen} />
       <Stack.Screen name="Admin" component={Admin} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

const stylos = StyleSheet.create({
 centeredView: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
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
   textAlign: 'center',
   color: 'black',
   fontSize: 20,
   marginBottom:10,
 }
});


const teacher = StyleSheet.create({
 mainview:{
   flex: 1, 
   alignItems: 'center', 
   justifyContent: 'center',
   backgroundColor: 'cyan'
 },

 requestecard:{
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

 requestecardHeader: {
   alignItems: 'center',
   
 },
 title:{
   marginTop:10,

   fontSize: 20,
   fontFamily: "Times New Roman",
   marginBottom:20
 },

 text:{
   fontSize: 20,
   fontFamily: "Times New Roman",
   marginBottom:20
 },

 requestecardbody: {
   alignItems: 'center',
   marginBottom:10,

 },

 textbox:{
   marginBottom:10,
   borderRadius: 10,
   textAlign: 'center',
   color: 'black',
   fontSize: 20,
   marginBottom:10,
 },
 
 requestecardButtoncontainer:{
   alignItems: 'center'
 },
 submitbtn:{
   backgroundColor: '#09bb11'
 },

});

const Admvielist = StyleSheet.create({
 View: {

 },
 centeredView: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },
 card:{
   marginBottom: 10,
   shadowColor: '#000',
   borderRadius: 20,
   
   shadowOffset: {
     width: 0,
     height: 0.10,
   },

   shadowOpacity: 0.25,
   shadowRadius: 5,
   elevation: 4,
   backgroundColor: 'white',
 },

 list:{
   borderRadius: 10,
   marginTop: 10

 },

 listext:{
   fontFamily: 'Times New Roman',
   fontSize: 26,
   textAlign: 'center',
 },
 btnsuceed:{
   textAlign: 'center',
   marginTop: 10,
   borderRadius: 20,
   padding: 10,
   elevation: 2,
   backgroundColor: 'green'
 },
 btncancel:{
   textAlign: 'center',
   marginTop: 10,
   borderRadius: 20,
   padding: 10,
   elevation: 2,
   backgroundColor: 'red'
 },
})

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


export default App;
