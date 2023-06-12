import logstyle from '../Styles/login'

import React, { useState, useRef } from 'react';

import { View, Modal, TextInput, Pressable } from 'react-native';

// login view is the responsible to authenticate the person to khow who are trying to connect

const Login = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [user, onChangeuser] = useState('');
    const [pass, onChangepass] = useState('');

    function auth(){
        try{
            switch(onChangeuser){
                case "hola": 
                    switch (onChangepass) {
                        case "klkklk":
                             return (
                                Alert.alert('Alert Title', 'succesfull', [
                                    {
                                      text: 'Cancel',
                                      onPress: () => console.log('Cancel Pressed'),
                                      style: 'cancel',
                                    },
                                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                                  ])
                             )
                            break;
                    
                        default:
                            return(
                                Alert.alert('Alert Title', 'My Alert Msg', [
                                    {
                                      text: 'Ask me later',
                                      onPress: () => console.log('Ask me later pressed'),
                                    },
                                    {
                                      text: 'Cancel',
                                      onPress: () => console.log('Cancel Pressed'),
                                      style: 'cancel',
                                    },
                                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                                  ])
                            )
                            break;
                    }
                    break;
                default:
                    return(
                        alert("user and password are not reconizable by the server")
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
      <View style={logstyle.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={logstyle.centeredView}>
            <View style={logstyle.modalView}>
              <Text style={logstyle.modalText}>Inicie Sesion</Text>
              <TextInput 
                style={logstyle.input}
                onChangeText={onChangeuser}
                value={user}
                placeholder='ingrese su usuario'
                placeholderTextColor= "#000000"

              />
              <TextInput
                style = {logstyle.input}
                onChangeText={ onChangepass}
                value={pass}
                placeholder = "Enter Your Name" 
                placeholderTextColor = "#D50000"
              />
              <Pressable
                style={[logstyle.button, logstyle.buttonClose]}
                onPress={() => auth()}>
                <Text style={logstyle.textStyle}>iniciar secion</Text>
              </Pressable>
              <Text>Tienes algun problema con el inicio de sesion?</Text>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[logstyle.button, logstyle.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={logstyle.textStyle}>Show Modal</Text>
        </Pressable>
      </View>
    );
  };

  export default Login;
  