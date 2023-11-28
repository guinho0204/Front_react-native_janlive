import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./../../Routes";
import { AuthProvider } from "./context/Authcontext";
import Home from "./Home/index";
import Paginaprincipal from "./Area_User";
import Icon from 'react-native-vector-icons/MaterialIcons';




const Tab =  createBottomTabNavigator();
 export function AppTabs() {
    return (
   
        <Tab.Navigator>
        <Tab.Screen name="Area User" component={Paginaprincipal} 
        options={{
          tabBarStyle:{borderRadius:20,bottom:20,width:300,left:50},
              tabBarIcon:({coloe}) =>(
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
           <Tab.Screen name="Chat" component={Home} 
        options={{
          tabBarStyle:{borderRadius:20,bottom:20,width:300,left:50},
              tabBarIcon:({coloe}) =>(
                <Icon name="wechat" size={26} color={'black'}/>
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