import react,{useState, useEffect} from 'react'
import {View ,Text,TouchableOpacity} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import App from '../../../Live/Live';
import { FAB } from 'react-native-elements/dist/buttons/FAB';
import { Image } from 'react-native';
import styled from '@emotion/styled';
import styles from './style'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { api } from '../../services/api';
import { presets } from '../../../babel.config';
import { color } from 'react-native-elements/dist/helpers';
import PagePresente from '../Page_presentes';



export default function Home(){

    const navigation = useNavigation();
     
    const [data, setData] = useState([])

    console.log(data)


    useEffect(async () =>{
      
       const resposne =  await api.get('/MostrarUser')
      setData(resposne.data) 
    
    },[]);

    function Navegacao(){
        navigation.navigate('Live')
    }
    return(
        <View>            
            <View style={styles.topo}>
                <View style={{borderWidth:1,
                            borderColor:'black',
                            width:70,
                            height:70,
                            alignItems:"center",
                            justifyContent:"center",
                            borderRadius:10,
                            paddingBottom:10
                            }}><Icon name="videocam" color={'black'} size={50}/>
                                <Text>Jan Live</Text></View>
                                <TouchableOpacity onPress={Navegacao} style={{width:100,height:50,backgroundColor:'red', alignItems:'center', justifyContent:'center', borderRadius:20}}><Text>Abrir Live </Text></TouchableOpacity>
            </View>
               
               <View style={{flexDirection:'row'}}>
               <TextInput style={styles.txt}/>
                  <Icon name='search'/>
                    <TouchableOpacity style={styles.btnSearch}>
                        <Icon name='search' color={"whaite"} size={18}/>
                    </TouchableOpacity>
                    </View> 
                        <FlatList 
                           data={data}
                           keyExtractor={(item, index)=>data}
                           horizontal
                           renderItem={({item})=> {return(<Text>{item.Nome}</Text>)} }
                           />
        </View>
        
        
    )

}