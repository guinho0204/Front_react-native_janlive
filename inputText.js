import { TextInput, View,StyleSheet} from "react-native";

import Estilo from "./Estilo";

export default function MyInput(props){
    return(
       <View>
          <TextInput style={Estilo.text}/>
       </View>     
 
    );

}
