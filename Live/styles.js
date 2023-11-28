import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    logo:{
    width:100,
    height:100,
    borderColor:'black',
    borderWidth:2,
    alignItems:'center',
    justifyContent:"center",
    borderRadius:10,

    left:80
},
topo:{
    width:'100%',
    height:'20%',
    backgroundColor:'#F92046',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    justifyContent:'space-around'
},
Image:{
    borderRadius:100,
    backgroundColor:'gray',
},
Vmoedas:{
    width:95,
    height:95,
    backgroundColor:'#E28AD9',
    borderRadius:200/2,
    top:10,
    justifyContent:"center",
    alignItems:'center',
},
ViewArea:{
  flexDirection:"row",
  justifyContent:"space-around",
},
AreaOptions:{
    width:345,
    height:310,
    backgroundColor:'gray',
    left:20,
    top:20,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10, 
},
btn:{
    width:310,
    height:56,
    backgroundColor:'#FBFBFB',
    top:5,
    borderRadius:10,
    marginTop:5,
    alignItems:'center',
    paddingLeft:10,
    flexDirection:"row"
}

})
export default styles