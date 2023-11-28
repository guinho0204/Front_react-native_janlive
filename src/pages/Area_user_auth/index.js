import React, { useState } from "react";
import { View,Text,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function Areauserauth(){

   const navigation = useNavigation();

   const[contage, setContagem] = useState();
   

    return(
        <View style={{justifyContent:"center",alignItems:"center",display:'flex',marginTop:100}}>
            <Text style={{color:'black',width:290,height:50,left:20,}}>Você precisa criar usuario para ver o user.</Text>
            <TouchableOpacity style={{width:150,
                                      height:50,
                                      backgroundColor:'red',
                                      alignItems:'center',
                                      justifyContent:'center',
                                      borderRadius:20}} onPress={() => navigation.navigate('Cadastro') }><Text>Criar usuario</Text></TouchableOpacity>
             <TouchableOpacity  style={{width:150,
                                      height:50,
                                      backgroundColor:'blue',
                                      alignItems:'center',
                                      justifyContent:'center',
                                      marginTop:10,
                                      borderRadius:20}} onPress={() => navigation.navigate('Login') }><Text>Fazer Login</Text></TouchableOpacity>


           <TouchableOpacity style={{width:100, height:100, backgroundColor:'gray',top:10}}>
                
            </TouchableOpacity>                           

        </View>
    )
}