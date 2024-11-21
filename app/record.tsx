import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import "../global.css";
import * as React from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import MyButton from '@/components/MyButton';
import { useRef } from 'react';
import { router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';


export default function RecordScreen() {
    // const {name, uid} =  useLocalSearchParams<{name: string; uid: string}>();
    const [facing, setFacing] = useState<CameraType>('front');
    const [permission, requestPermission] = useCameraPermissions();
    const [recording, setRecording] = useState('off');
    const [timeLeft, setTimeLeft] = useState(3);
    const [record, setRecord] = useState(null);
    const [camera, setCamera] = useState(null);

    const questions = global.questions;
    const questionPointer = global.questionPointer;
    const currQuestion = questions[questionPointer];
    const totalQuestions = questions.length;
    const pickDocument = async () => {
      let result = await DocumentPicker.getDocumentAsync({ type: ['video/mp4', 'video/quicktime', 'video/x-m4v', 'video/x-mov'] , copyToCacheDirectory: true }).then(response => {
          if (response.canceled == false) {    
            // console.log(response.assets);      
            let { uri } = response.assets[0];
            console.log(uri);
            router.push(`/recorded?name=${encodeURIComponent(name)}&uid=${encodeURIComponent(uid)}&record=${encodeURIComponent(uri)}`);
          } 
        });
  }
    
    useEffect(() => {
      requestPermission();
    }, []); 
    const stopVideoRecording = async () => {
      camera.stopRecording();
      setRecording('off');
      console.log("Recording ended");


    }

    useEffect(() => {
      if (record) {
        global.videoURLs[questionPointer] = record;
      router.push(`/recorded`);
      console.log(record);
      }
    },
    [record]
    );

    
    useEffect(() => { // start recording
      (async () => {
        if (recording === 'start') {
          console.log("Recording started");
          const localRecord = await camera.recordAsync();
          setRecord(localRecord.uri);
          console.log(record);
          
        }
      })();
    } , [recording]);

    const timerRef = useRef(null);

  useEffect(() => { // start recording
    if (recording === 'wait') {
      timerRef.current = setTimeout(() => {
        if (timeLeft <= 1) {
          clearTimeout(timerRef.current);
          setRecording('start');
        } else {
          setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
        }
      }, 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, recording]);

  const startRecordingTimer = () => {
    setTimeLeft(3);
    setRecording('wait');
  };
 
    
    if (!permission) {
      // Camera permissions are still loading.
      return (
        <View className="flex-1 justify-center">
          <Text className="text-white text-lg">Loading...</Text>
        </View>
      );
    }
    else if (!permission.granted) {
      // Camera permissions are not granted yet.
      return (
        <View className="flex-1 justify-center">
          <Text className="text-white text-lg">We need your permission to show the camera</Text>
        </View>
      );
    }

    function toggleCameraFacing() {
      setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    if (permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
  <Text className="text-white text-4xl font-bold mb-4">
    Prompt {questionPointer+1}/{totalQuestions}: {currQuestion}
  </Text>
  <View className="w-4/5 h-4/5 border-2 border-white">
  {/* <View className="absolute h-300 items-center justify-center bg-blue">
    <Text className="text-white"> Hi</Text>
  </View> */}
  {/* <View> */}
    <CameraView
      style={{
        height: '300',
        flex: 1
      }}
      facing={facing}
      ref = {ref => setCamera(ref)}
      mode = 'video'
    />
    {/* </View> */}
  </View>
  { recording == 'wait' && (  
  <View className="w-4/5 h-4/5  absolute justify-center items-center">
        <Text className="text-white text-8xl">{timeLeft}</Text>
  </View>)}

  <View className="flex-row align-center">
      {recording === 'start' ? (
        <MyButton className="bg-red-600 px-3 mt-4 mx-3" title="Stop" onPress={stopVideoRecording}/>
      ) : (
        <MyButton className="bg-blue-600 px-3 mt-4 mx-3" title="Start" onPress={startRecordingTimer}/>

      )
      
      }
      {/* <MyButton className="bg-blue-600 px-3 mt-4 mx-3" title="Flip Camera" onPress={toggleCameraFacing}/> */}
      {/* <MyButton className="bg-blue-600 px-3 mt-4 mx-3" title="Upload Video" onPress={pickDocument}/> */}

  </View>
  
</View>
    );
  }
}