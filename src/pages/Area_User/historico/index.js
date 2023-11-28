import React,{useEffect,useContext,useState} from "react";
import { View,FlatList } from "react-native";
import { Text } from "react-native-elements";


export default function HistoricoLives(){

    useEffect(async () => {
            const response = await api.get('/')
    },[])
    return(
        <View>
            <Text>Page Historico Lives</Text>
        </View>
    )
}