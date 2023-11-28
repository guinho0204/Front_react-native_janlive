import React ,{ useContext }from "react";
import { Text,TextInput,View, TouchableOpacity} from "react-native"
import style from "./Estilo"
import { Button } from "react-native-elements";
import { AuthContext } from "../../context/Authcontext";


export default function Loja(){

    const{ComprarMoedas} = useContext(AuthContext);

    async function Calcular(){
       
    /*Lgoritimo comprar moedas */
      var valor_moedas  = 100;
   
      await ComprarMoedas(valor_moedas)
    }

    return(
        <View style={style.centralize}>
             <View style={style.containerlitst}> 
               <TouchableOpacity onPress={Calcular}>
                  <Text>Comprar 100 moedas</Text>
               </TouchableOpacity>
             </View>
            
             <Calular/>
        </View>
    )
}