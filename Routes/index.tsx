import React,{useContext}from 'react'
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { View, ActivityIndicator } from "react-native"; 
import { AuthContext } from '../src/pages/context/Authcontext';

function Routes(){
    const {isAuthenticated, loading} = useContext(AuthContext);
    
    if(loading){
        return(
            <View style={{
                flex:1,
                backgroundColor:'center',
                justifyContent:'center',
                alignItems:'center'
            }}>
            <ActivityIndicator size={68} color="#FFF"/>
            </View>
        )
    }
    return(
        isAuthenticated ? <AppRoutes/>:<AuthRoutes/>
    )
}
export default Routes;