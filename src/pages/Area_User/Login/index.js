import React from "react";
import { View,TouchableOpacity,Text,TextInput } from "react-native";
import styles from './Estilo'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useState,useContext} from 'react'
import { AuthContext } from "../../context/Authcontext";



export default function Login(){
     
    const [numero_celular,setNumero] = useState('');
    const [password, setPassword] = useState('');
    const {singIn}  = useContext(AuthContext);
    
    async function handleLogin(){
       
        console.log(numero_celular);
        console.log(password);

          await singIn({numero_celular, password})

        
    }
    return(
        <View style={styles.centralize}>
            <View style={styles.logo}> 
            <Icon name="videocam" color={'black'} size={50}/>
                <Text style={{color:'black'}}>Jan Live</Text>
            </View>
            
            <Text style={{marginTop:10,color:'black'}}>Digite numero do seu celular e clique em seguinte</Text>
            <Text style={{marginLeft:'-49%',
                          marginTop:70,color:'black'}}>Numero celular</Text>
                <TextInput style={styles.txtNumero} onChangeText={setNumero}>[+55] </TextInput>
                <Text style={{marginLeft:'-59%',
                          marginTop:20,color:'black'}}>Password</Text>
                <TextInput style={styles.txtNumero} placeholder="Password" secureTextEntry={true} onChangeText={setPassword}/>
                <TouchableOpacity style={styles.btn} onPress={handleLogin}><Text>Login</Text></TouchableOpacity> 
        </View>
    )
  
}