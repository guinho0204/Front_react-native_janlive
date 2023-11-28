import React,{useState,createContext,ReactNode,useEffect} from "react";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tokens } from "react-native-paper/lib/typescript/styles/themes/v3/tokens";
type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    singIn: (credentials:SingInProps) =>Promise<void>
    CreateUser:(credentials:CreateUserProps) =>Promise<void>
    loadingAuth:boolean;
    loading:boolean;
}

type UserProps = {
    image_user:string;
    nome:string;
    user:string;
    numero_celular:string;
    password:string;
    followers:string;
    following:string;
    nivel:string;
    visualisacoes:string;
    token:string;
    
}
type SingInProps ={
    numero_celular:string;
    password:string;
}
type AuthProviderProps ={
    children:ReactNode
}
type MoedasProps = {
    valor_moedas:string;
}
type CreateUserProps = {
    image_user:string;
    nome:string;
    user:string;
    numero_celular:string;
    password:string;
    followers:string;
    following:string;
    nivel:string;
    visualisacoes:string;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}:AuthProviderProps){
    const [user,setUser] = useState<UserProps>({
        image_user:'',
        nome:'',
        user:'',
        numero_celular:'',
        password:'',
        followers:'',
        following:'',
        nivel:'',
        visualisacoes:'',
        token:'',
    })
      const [loadingAuth, setLoadingAuth] = useState(false);
      const[loading,setLoading] =  useState(true);
      const isAuthenticated = !!user.nome;

       useEffect(() =>{
            async function getUser(){
                 const userinfo  =  await AsyncStorage.getItem('@Jan_live');
                 let hasUser:  UserProps = JSON.parse(userinfo || '{}')
                 

                 if(Object.keys(hasUser).length > 0){
                    api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`
                 }

                setUser({
                    image_user: hasUser.image_user,
                    nome:hasUser.nome,
                    user:hasUser.user,
                    numero_celular:hasUser.numero_celular,
                    password:hasUser.password,
                    followers:hasUser.followers,
                    following:hasUser.following,
                    nivel:hasUser.nivel,
                    visualisacoes:hasUser.visualisacoes,
                    token:hasUser.token
                    
                })
                console.log(hasUser.token)
                setLoading(false)

            }
            getUser();
       },[])
       async function Mostrar_present({}){
            
       }
      async function singIn({numero_celular, password}:SingInProps) {
        setLoadingAuth(true);
         try{
          const response = await api.post('/Login',{
            numero_celular ,
            password
          })   
          console.log(response.data)
          const { image_user,
            nome,
            user,
            followers,
            following,
            nivel,
            visualisacoes,
            token,} = response.data;

             const data = {
                ...response.data
             } 
              await AsyncStorage.setItem('@Jan_live', JSON.stringify(data))
             api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setUser({
            image_user,
            password,
            numero_celular,    
            nome,
            user,
            followers,
            following,
            nivel,
            visualisacoes,
            token
            })
             
        
            setLoadingAuth(false)

         }catch(err){
            console.log('erro ao acessar',err)
         }

      }
      async function CreateUser({ image_user,nome,user,numero_celular,password,followers,following,nivel,visualisacoes}: CreateUserProps){
        const createuser = await api.post('/CreateUser',{
            image_user,
            nome,
            user,
            numero_celular,
            password,
            followers,
            following,
            nivel,
            visualisacoes
        })
        console.log(createuser.data)
      }
      
      
    return(
        <AuthContext.Provider value={{user,isAuthenticated,singIn,CreateUser,loading,loadingAuth}}>
        {children}
        </AuthContext.Provider>
    )
}