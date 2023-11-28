import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   
    topo:{
        width:'100%',
        height:'30%',
        backgroundColor:'#F92046',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    txt:{
        width:200,
        height:40,
        backgroundColor:'gray',
        borderBottomLeftRadius:20,
        borderTopLeftRadius:20,
        padding:10,
        marginLeft:60,
        marginTop:10,
    },
    btnSearch:{
        backgroundColor:'gray',
        width:80,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        left:-20,
        marginTop:10
       
    }

    

})

export default styles