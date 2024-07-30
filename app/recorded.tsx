import { Video } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { PixelRatio, StyleSheet, View, Button, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import MyButton from '@/components/MyButton';
import "../global.css";
import { router } from 'expo-router';
export default function VideoScreen() {
  const {name, uid, record} =  useLocalSearchParams<{name: string; uid: string, record: string}>();
  const video = useRef(null);
  const [status, setStatus] = useState({});
  
  return (
    <View className="flex-1 justify-center items-center bg-black"> 
    <Text className="text-white text-2xl mb-4">Press Confirm to process the video.</Text>
        <Video
      ref={video}

      style={{
        width: PixelRatio.getPixelSizeForLayoutSize(420),
        height: PixelRatio.getPixelSizeForLayoutSize(315),
      }}
      source={{
        uri: record,
      }}
      useNativeControls
      resizeMode="contain"
      isLooping
      onPlaybackStatusUpdate={status => setStatus(() => status)}
    />
    <View className="flex-row">
    {/* <MyButton
        title={status.isPlaying ? 'Pause' : 'Play'}
        onPress={() =>
          status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
        }
        className="bg-blue-600 px-3 mt-4 mx-3"
      /> */}
      <MyButton title="Re-Record" className="bg-blue-600 px-3 mt-4 mx-3" onPress={() => router.back()}></MyButton>
      <MyButton title="Confirm" className="bg-green px-3 mt-4 mx-3"></MyButton>
    </View>
      

    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  controlsContainer: {
    padding: 10,
  },
});