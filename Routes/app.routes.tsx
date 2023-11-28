import React from "react";
import {createStackNavigator} from "@react-navigation/stack"
import Live from "../Live/Live";
import { AppJs } from "../App";
import Paginaprincipal from "../src/pages/Area_User";
import { AppTabs } from "../src/pages/AppTab";
import Loja from "../src/pages/Area_User/Loja";
import HistoricoLives from "../src/pages/Area_User/historico";


const Stack = createStackNavigator();

export default function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={AppTabs} options={{headerShown:false}}/>
            <Stack.Screen name="Live" component={Live} options={{headerShown:false}}/>
            <Stack.Screen name="Store" component={Loja}/>
            <Stack.Screen name="Historico" component={HistoricoLives}/>
        </Stack.Navigator>
    )
}
