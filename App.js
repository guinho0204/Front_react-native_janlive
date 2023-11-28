import AreaUser from "./src/pages/Area_User"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from "@react-navigation/native";
import { Image } from 'react-native';
import App_live from "./Live/Live";
import Routes from "./Routes";
import Live from './src/pages/Area_User/Login/index'
import { AuthProvider } from "./src/pages/context/Authcontext";
import Home from "./src/pages/Home";
import Areauserauth from "./src/pages/Area_user_auth";
import Icon from 'react-native-vector-icons/MaterialIcons';



const Tab =  createBottomTabNavigator();


 export function AppJs() {
    
    return (
   
        <Tab.Navigator>
        <Tab.Screen name="Area User" component={Areauserauth} 
        options={{
          tabBarStyle:{borderRadius:20,bottom:20,width:300,left:50},
              tabBarIcon:() =>(
                   <Icon name="person" size={26} color={'black'}/>
              ),
              headerShown:false
        }}/>
        <Tab.Screen name="Home" component={Home} 
        options={{
          tabBarStyle:{borderRadius:20,bottom:20,width:300,left:50},
              tabBarIcon:({coloe}) =>(
                <Icon name="home" size={26} color={'black'}/>
              ),
              headerShown:false
        }}/>
        </Tab.Navigator>
    
    );
  }

export default function App(){
    return(
     
        <NavigationContainer>
             <AuthProvider>
              <Routes/>
        </AuthProvider>
        </NavigationContainer>
       
     
    )
}