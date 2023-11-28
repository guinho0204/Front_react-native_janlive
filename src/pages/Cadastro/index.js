import React,{useState,useContext}from "react";
import { View,Text,TouchableOpacity, TextInput, } from "react-native";
import styles from "./Style";
import { AuthContext } from "../context/Authcontext";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native";
import {launchImageLibrary} from 'react-native-image-picker'
import { Image } from "react-native";
import { api } from "../../services/api";





export default function Cadastro(){
      
   const navigation = useNavigation();

      const[numero_celular,setNumero_celular] = useState('');
      const [user,setUser] = useState('');
      const [password,setPassword] = useState('');
      const[confPassword,setConfPassword] = useState('');
      const[nome,setNome] = useState('')
      const [image_user_uri, setImage_user] = useState();
      
            
      const{singIn} = useContext(AuthContext)
       
       let options = {
          saveToPhotos:true,
          mediatype:'photo',
       };

       const imagem = async () =>{
             const result = await launchImageLibrary(options);
             setImage_user(result.assets[0].uri)
             const path = ""
             console.log(image_user_uri)   
        }

   async function Cadastrar(){
        
    try{
      var followers = "0",
       following = "0",
       nivel = "0",
       visualisacoes = "0";

       const data = new FormData();
       
        data.append('file',{uri:image_user_uri,name:'userImage.jpg',type:'image/jpg'})
        data.append('nome',nome)
        data.append('user',user)
        data.append('numero_celular',numero_celular)
        data.append('password',password)
        data.append('followers',followers)
        data.append('following', following)
        data.append('nivel',nivel)
        data.append('visualisacoes',visualisacoes)
           
      

         await api.post('/CreateUser', data)
        
         

         await singIn({numero_celular,password}) 
         
    


    }catch(err){
      console.log(err)
    }

   }

    return(
        <ScrollView>
        <View style={{alignItems:'center',
         justifyContent:'center'}}>
          
          <Text style={{color:'#F92046',
                         marginTop:20,
                         fontSize:20}}>Cadastrar com Numero-celular</Text>
          <Text style={{color:'#F92046',
                        fontSize:20 }}>E</Text>
          <Text style={{color:'#F92046',
         fontSize:20}}>E-mail</Text>
          <View style={{
                width:250,  
              alignContent:'center',
              marginTop:10,}}>
          <Text style={{color:'black'}}>Digite seu numero celular, Email e sua senha clique em cadastrar.</Text>
          </View>
          <View style={{top:20,width:100,height:100,borderRadius:200/2,backgroundColor:'#aaa8a8', alignItems:'center', justifyContent:'center'}}>
              <Icon name="person"  color={'gray'}size={40}/>
           </View>
           <TouchableOpacity onPress={imagem} style={{width:50, height:50,
                                     backgroundColor:'#91cce7',
                                     alignItems:'center',
                                     justifyContent:'center',
                                     borderRadius:200/2,
                                     left:-20,
                                     top:-20, }}></TouchableOpacity>
          <TextInput placeholder="Numero Celular" style={styles.txtNumero}  onChangeText={setNumero_celular}/>
          <TextInput placeholder="Nome" style={styles.txtEmail} onChangeText={setNome}/>
          <TextInput placeholder="User" style={styles.txtEmail} onChangeText={setUser}/>
          <TextInput placeholder="Password" style={styles.txtPassword} onChangeText={setPassword}/>
          <TextInput placeholder="Password"style={styles.txtPassword} onChangeText={setConfPassword}/>
          <TouchableOpacity onPress={Cadastrar}><Text style={{color:'black'}}>Cadastrar</Text></TouchableOpacity>
          <TouchableOpacity
             style={{marginTop:10,}}>
            <Text style={{color:'blue'}}>Cancelar</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    )
}