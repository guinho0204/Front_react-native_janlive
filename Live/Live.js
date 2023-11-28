import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
  Clipboard,
  KeyboardAvoidingView,
  Image,
  
} from "react-native";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  MediaStream,
  RTCView,
  Constants,
} from "@videosdk.live/react-native-sdk";
import { createMeeting, authToken } from "./api";
import Video from "react-native-video";
import { usePubSub } from "@videosdk.live/react-native-sdk";
import Estilo from '../Estilo';
import  {FAB, Input}  from 'react-native-elements';
import filmadora_fab from '../src/icons/filmadora_bar.png'
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import PresenteIcon from './../src/icons/presenteIcon.png'
import Cafepng from './../src/icons/cerveja_png.png'


function ChatView() {
  // destructure publish method from usePubSub hook
  const { publish, messages } = usePubSub("CHAT");

  // State to store the user typed message
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    // Sending the Message using the publish method
    publish(message, { persist: true });
    // Clearing the message input
    setMessage("");
  };
  

  return (
    <View>
      <View>
      
        <View style={{
           flexDirection:'row',
           borderWidth:2,
           borderColor:'black',
           width:250,
           height:500,
           marginTop:270
        }}>  
        {messages.map((message) => {
        return (
          <Text style={{ fontSize: 12, color:'black' }}>
            {
            message.senderName} says {message.message}
          </Text>
        );
      })}
      <KeyboardAvoidingView behavior={'height'} >
         <TextInput placeholder="Mensager" value={message} style={{backgroundColor:'white', width:150,height:35,borderBottomLeftRadius:20,borderTopLeftRadius:20,top:450,paddingLeft:20,color:'black'}}/>
          <TouchableOpacity onPress={()=>{handleSendMessage();}} style={{width:50,height:35, top:415,left:150,borderBottomRightRadius:20,borderTopRightRadius:20,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
            <Icon name="send" color={'black'} size={28}/>
          </TouchableOpacity>
      </KeyboardAvoidingView>
      </View>
      </View>
    </View>
  );
}
// Responsible for either schedule new meeting or to join existing meeting as a host or as a viewer.
 function JoinScreen({ getMeetingAndToken, setMode }) {
  const [meetingVal, setMeetingVal] = useState("");
  const navigation = useNavigation();
 

  const JoinButton = ({ value, onPress,}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#1178F8",
          padding: 12,
          marginVertical: 8,
          borderRadius: 6,
        }}
        onPress={onPress}
      >
        <Text style={{ color: "white", alignSelf: "center", fontSize: 18 }}>
          {value}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <FAB title={''} icon={<Image source={filmadora_fab}/>}style={{marginTop:445}}
       onPress={() => {
        getMeetingAndToken();
       }}
      />
       
     
    </View>
  );
}
// Responsible for managing participant video stream
function ParticipantView({ participantId }) {
  const { webcamStream, webcamOn } = useParticipant(participantId);
  return webcamOn && webcamStream ? (
    <RTCView
      streamURL={new MediaStream([webcamStream.track]).toURL()}
      objectFit={"cover"}
      style={{
        height:800,
        marginVertical: 8,
        marginHorizontal: 8,
        
      }}
    >
      </RTCView>
  ) : (
    <View
      style={{
        backgroundColor: "grey",
        height: 700,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
        marginHorizontal: 8,
      }}
    >
      <Text style={{ fontSize: 16 }}>NO MEDIA</Text>
    
    </View>
  );
}

// Responsible for managing meeting controls such as toggle mic / webcam and leave
function Controls() {
  const { meetingId, leave } = useMeeting();
  const { toggleWebcam, toggleMic, startHls, stopHls, hlsState } = useMeeting(
    {}
  );

  const _handleHLS = async () => {
    if (!hlsState || hlsState === "HLS_STOPPED") {
      startHls({
        layout: {
          type: "GRID",
          priority: "PIN",
          gridSize: 4,
        },
        theme: "DARK",
        orientation: "portrait",
      });
    } else if (hlsState === "HLS_STARTED" || hlsState === "HLS_PLAYABLE") {
      stopHls();
    }
  };
 

  return (
    <>
  
    <View
      style={{
        
        position:'absolute',
        padding:14,
        
      }}
    >

      {hlsState === "HLS_STARTED" ||
      hlsState === "HLS_STOPPING" ||
      hlsState === "HLS_STARTING" ||
      hlsState === "HLS_PLAYABLE" ? (
       <View style={{flexDirection:'row'}}>
        <ChatView/>
          <View style={{marginLeft:70}}>
            <View style={{ 
                       backgroundColor:'#fc5f7c96',
                        width:150,
                        height:60,
                        borderRadius:20,
                        justifyContent:"center",
                        alignItems:'center',
                        flexDirection:"row",
                        left:-320}}><Icon name="person" color={'black'} size={28}/><Text>Marcos Vinicius</Text></View>
            <TouchableOpacity onPress={()=>{leave()}} style={{marginTop:-45}}>
            <Icon name="close" color={"gray"} size={29}/>
          </TouchableOpacity>
           <View style={{marginTop:600,justifyContent:'space-evenly'}}>
            <TouchableOpacity onPress={ () =>{toggleWebcam()}}>
              <Icon name="videocam-off" color={"gray"} size={29}
              /> 
              
          <TouchableOpacity
            onPress={() => {
              toggleMic();
            }}
            buttonText={"Toggle Mic"}
            backgroundColor={"#1178F8"}
            style={{marginTop:10}}
          >
            <Icon name="mic-off" color={"gray"} size={29}/>
          </TouchableOpacity>
          </TouchableOpacity>
             <TouchableOpacity style={{marginTop:10,width:40,height:40,backgroundColor:'blue',alignItems:"center", justifyContent:"center", borderRadius: 200/2}}>
              <Image source={PresenteIcon}/>
             </TouchableOpacity>
  
          </View>

            
            </View>
      </View>
      ) : (

       <View>
          <View  style={{width:'100%',
                         height:'60%',
                         justifyContent:'space-evenly',
                         flexDirection:'row',
                         }}>
         <View style={{
                        backgroundColor:'#fc5f7c96',
                        width:150,
                        height:60,
                        borderRadius:20,
                        justifyContent:"center",
                        alignItems:'center',
                        flexDirection:"row",
                        left:-70,
                        }}>
               <Icon name="person" size={28} color={"black"}/>
               <Text> Marcos Vinicius</Text>
         </View>
         <TouchableOpacity  style={{left:50}}onPress={()=>{leave()}}>
        <Icon name="close" color={"gray"} size={29}/>
      </TouchableOpacity>
      </View>
        <View style={{borderColor:'gray',
                      borderWidth:2,
                      height:200,
                       width:200,
                        left:75,
                        top:130,
                        alignItems:"center",
                        justifyContent:"center",
                        borderRadius:20}}>
        <TouchableOpacity
          onPress={() => {
            _handleHLS();
          }}
          buttonText={`Go Live`}
          backgroundColor={"#1178F8"}
          style={Estilo.botaoTeste}
          
        ><Icon name="play-arrow" color={"gray"} size={70}/><Text style={{color:"gray"}}>Iniciar Live</Text></TouchableOpacity>
        </View>
        </View>
        
      )}

      </View>
   
    </>
  );
}

// Responsible for Speaker side view, which contains Meeting Controls(toggle mic/webcam & leave) and Participant list
function SpeakerView() {
  // Get the Participant Map and meetingId
  const { meetingId, participants } = useMeeting({});

  // For getting speaker participant, we will filter out `CONFERENCE` mode participant
  const speakers = useMemo(() => {
    const speakerParticipants = [...participants.values()].filter(
      (participant) => {
        return participant.mode == Constants.modes.CONFERENCE;
      }
    );
    return speakerParticipants;
  }, [participants]);

  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      {/* Render Header for copy meetingId and leave meeting*/}
     

      {/* Render Participant List */}
      {speakers.length > 0 ? (
        <FlatList
          data={speakers}
          renderItem={({ item }) => {
            return <ParticipantView participantId={item.id} />;
          }}
        />
      ) : null}

      {/* Render Controls */}
      <Controls />
    </SafeAreaView>
  );
}

// Responsible for Viewer side view, which contains video player for streaming HLS and managing HLS state (HLS_STARTED, HLS_STOPPING, HLS_STARTING, etc.)
function ViewerView({}) {
  const { hlsState, hlsUrls } = useMeeting();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      {hlsState == "HLS_PLAYABLE" ? (
        <>
          {/* Render Header for copy meetingId and leave meeting*/}
          <HeaderView />

          {/* Render VideoPlayer that will play `downstreamUrl`*/}
          <Video
            controls={true}
            source={{
              uri: hlsUrls.downstreamUrl,
            }}
            resizeMode={"stretch"}
            style={{
              flex: 1,
              backgroundColor: "black",
            }}
            onError={(e) => console.log("error", e)}
          />
        </>
      ) : (
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>
            HLS is not started yet or is stopped
          </Text>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

// Responsible for managing two view (Speaker & Viewer) based on provided mode (`CONFERENCE` & `VIEWER`)
   function Container() {
  const { join, changeWebcam, localParticipant } = useMeeting({
    onError: (error) => {
      console.log(error.message);
    },
  }); 
  const { meetingId, leave } = useMeeting();
   const navigation = useNavigation();
  
  return (

    <View style={{ flex: 1 }}>
      {localParticipant?.mode == Constants.modes.CONFERENCE ? (
        <SpeakerView />
      ) : localParticipant?.mode == Constants.modes.VIEWER ? (
        <ViewerView />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >

          <Text style={{ fontSize: 20, color: "white" }}>
             Clique para iniciar a live 
          </Text>
          <Button
            btnStyle={{
              marginTop: 8,
              paddingHorizontal: 22,
              padding: 12,
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 8,
            }}
            buttonText={"Iniciar"}
            onPress={() => {
              join();
              setTimeout(() => {
                changeWebcam();
              }, 300);
            }}
          />
          <Button buttonText={"voltar"} onPress={() => navigation.navigate('Home')}/>
         
         
        </View>
      )}
    </View>
  );
}





// Common Component which will also be used in Controls Component
const Button = ({ onPress, buttonText, backgroundColor, btnStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...btnStyle,
        backgroundColor: backgroundColor,
        padding: 10,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: "white", fontSize: 12 }}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

 function App() {
  const [meetingId, setMeetingId] = useState(null);

  //State to handle the mode of the participant i.e. CONFERNCE or VIEWER
  const [mode, setMode] = useState("CONFERENCE");

  //Getting MeetingId from the API we created earlier
  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  return authToken && meetingId ? (

    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "Ahmed",
        //These will be the mode of the participant CONFERENCE or VIEWER
        mode: mode,
      }}
      token={authToken}
    >
      <Container />
     
  </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} setMode={setMode} />
  );
}

export default App;
