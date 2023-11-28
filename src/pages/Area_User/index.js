import React,{useEffect,useState} from "react";
import { Text,View,Image} from "react-native";
import Icon_user from '../../icons/IconUser.png'
import styles from './style'
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { api } from "../../services/api";
import foto from "../../images/b8e36b1cb93f518755c83ce5694e4b60-fundofigma.jpeg"



export default function Paginaprincipal(){
    const navigation = useNavigation();
      
    const[data,setData] = useState([]);
    
    
   useEffect(async () =>{
        const response = await api.get('/MostrarUser')
        setData(response.data)
        console.log(response.data)
        console.log(data[0].Image_user)
         

    },[]);

    
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
            </View>
            <View style={{
                        width:150,
                        height:150,
                        backgroundColor:'gray',
                        borderRadius:200/2,
                        marginLeft:20,
                        marginTop:'-10%',
                        alignItems:"center",
                        shadowColor: "black",
                        shadowOffset: {
                            width: 0,
                            height: 7,
                        },
                        
                        shadowOpacity: 0.41,
                        shadowRadius: 9.11,
                        elevation: 14,
                     justifyContent:'center',
                     display:'flex'}}>
                        <Image style={{ width:150,
                        height:150, borderRadius:200/2,
                        }} source={require("../../images/b8e36b1cb93f518755c83ce5694e4b60-fundofigma.jpeg")}/>
              </View>
              {data.map((data,index) =>{
                     return(
                      <Text style={{color:'black',left:200, top:-50}}>{data.Nome}</Text>
                     )
                 })}

              <View style={styles.ViewArea}>
                    <View style={styles.Vmoedas}>
                            <Text>Moedas</Text>
                            <Text>0</Text>
                    </View>
                    <View style={styles.Vmoedas}>
                            <Text>Seguidores</Text>
                            <Text>{data[0]?.Followers}</Text>
                    </View>
                   
                                
                    <View style={styles.Vmoedas}>
                            <Text>Seguindo</Text>
                            <Text>{data[0]?.Following}</Text>
                    </View>
              </View> 
            <SafeAreaView style={styles.AreaOptions}>
               <ScrollView style={{marginBottom:10,marginTop:10}}>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Store')}>
                          <Icon name="store" color="black" size={28}/>
                        <Text style={{color:'black',}}>Loja</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                         <Icon name="currency-exchange" color='black' size={28}/>
                         <Text style={{color:'black',left:5}}>Troca de moedas</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.btn}>
                     <Icon name="show-chart" color={'black'} size={28}/>
                        <Text style={{color:'black',left:5}}>Redimento</Text>
                    </TouchableOpacity>  
                       <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('Historico')}>
                       <Icon name="work-history" color={'black'} size={28}/>
                        <Text style={{color:'black',left:5}}>histórico</Text>
                    </TouchableOpacity>
                           <TouchableOpacity style={styles.btn}>
                            <Icon name="logout"  color={'black'} size={28}/>
                            <Text style={{color:'black',left:5}}>LogOut</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                       <Icon name="login" color={'black'} size={28} />
                        <Text style={{color:'black',left:5}}>Login</Text>
                    </TouchableOpacity>
                              
               </ScrollView>
                
            </SafeAreaView>
           
     </View>
    )
}