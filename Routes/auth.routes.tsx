import React from "react";
import {createStackNavigator} from "@react-navigation/stack"
import Login from '../src/pages/Area_User/Login/index'
import Home from "../src/pages/Home";
import App from "../Live/Live";
import Cadastro from "../src/pages/Cadastro";
import { AppJs } from "../App";
import { Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';

import {View} from 'react-native'

const Stack = createStackNavigator();

export default function AuthRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Jan Live" component={AppJs} options={{headerShown:false}}/>
            <Stack.Screen name='Cadastro' component={Cadastro}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
            
        </Stack.Navigator>
    )
}
