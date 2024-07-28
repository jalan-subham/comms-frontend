import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import "../global.css";
import * as React from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import MyButton from '@/components/MyButton';
import { useRef } from 'react';

export default function RecordScreen() {
    const {name, uid} =  useLocalSearchParams<{name: string; uid: string}>();
    const [facing, setFacing] = useState<CameraType>('front');
    const [permission, requestPermission] = useCameraPermissions();
    const [recording, setRecording] = useState('off');
    const [timeLeft, setTimeLeft] = useState(3);


    useEffect(() => {
      if (permission?.granted) {
        // Camera permissions are granted.
        return;
      }
      requestPermission();
    }
    , [permission]);
    

    const timerRef = useRef(null);

  useEffect(() => {
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

  const startRecording = () => {
    setTimeLeft(3);
    setRecording('wait');
  };


    
    if (!permission) {
      // Camera permissions are still loading.
      return <View />;
    }
    if (!permission.granted) {
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
    function endRecording() {
      setRecording('off');
      console.log("Recording ended");
    }

    return (
      <View className="flex-1 justify-center items-center bg-black">
  <Text className="text-white text-2xl mb-4">
    Record your self-introduction. Press Start to begin.
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
    />
    {/* </View> */}
  </View>
  {recording == 'wait' && (  
  <View className="w-4/5 h-4/5  absolute justify-center items-center">
        <Text className="text-white">{timeLeft}</Text>
  </View>)}

  <View className="flex-row align-center">
      {recording === 'start' ? (
        <MyButton className="bg-red-600 px-3 mt-4 mx-3" title="Stop" onPress={endRecording}/>
      ) : (
        <MyButton className="bg-blue-600 px-3 mt-4 mx-3" title="Start" onPress={startRecording}/>

      )
      
      }
      <MyButton className="bg-blue-600 px-3 mt-4 mx-3" title="Flip Camera" onPress={toggleCameraFacing}/>

  </View>
  
</View>
    );
  }