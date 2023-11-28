import React,{useEffect} from "react";
import{View}from 'react-native'
import { useState } from "react";
import { api } from "../../services/api";
import { Image, Text } from "react-native-elements";
import { FlatList } from "react-native";
import Coffe from './../../Icones_app/coffee.png'
import { ScrollView } from "react-native-gesture-handler";


export default function PagePresente(){

    const[data , setData] = useState([])
    console.log(data)

    useEffect(async () =>{
      
        const resposne =  await api.get('/MostrarPresentes')
        setData(resposne.data) 
        console.log(resposne.data)
     
     },
     []);
    

    return(

         <View style={{height:500, backgroundColor:'#2422229a'}}>
        
                <View  style={{flexDirection:'column'}}>
                 
                    {data.map((data,index) =>{
                        return(

                           <View style={{width:70,
                            height:50, borderWidth:1,borderColor:'white',left:20, alignItems:'center',justifyContent:"center"}}>
                                
                                        <Text key={index}>
                                        {data.Nome}
                                        </Text>
                                        <Image source={{uri: `${data.Presente_imagem}`}} style={{width:40,height:40}}/>
                                
                            </View>    
                            
                        )
                    })}   
                    
          </View>
            
            
         </View>
    )
}
