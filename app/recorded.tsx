import { Video } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { PixelRatio, StyleSheet, View, Button, Text, Modal, Alert, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import MyButton from '@/components/MyButton';
import "../global.css";
import { router } from 'expo-router';
import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import * as FileSystem from 'expo-file-system';



export default function VideoScreen() {
  let {name, uid, record} =  useLocalSearchParams<{name: string; uid: string, record: string}>();
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);  

  // lowercase
  if (name) {
    name = name.toLowerCase();
  }
  if (uid) {
    uid = uid.toLowerCase();
  }
  
function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(now.getDate()).padStart(2, '0');
  
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

async function uriToArrayBuffer(uri: string | undefined) {
  try {
    // Read the file as a base64 string
    const base64String = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convert the base64 string to binary string
    const binaryString = atob(base64String);

    // Create an ArrayBuffer and a Uint8Array to store the binary data
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    // Populate the ArrayBuffer with the binary data
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer; // Return the ArrayBuffer
  } catch (error) {
    console.error('Error converting URI to ArrayBuffer:', error);
    throw error;
  }
}
const S3_BUCKET = "comms-test-v1"; // Replace with your bucket name
const REGION = "ap-south-1"; // Replace with your region
const DB_TABLE_NAME = "comms-test-v1"; // Replace with your DynamoDB table name

AWS.config.update({
  accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS,
  secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET,
  region: REGION,
});

  async function writeToDynamoDB(data: {
      id: string; // remove the file extension
      user_uid: string | undefined; // user's UID (plaksha)
      user_name: string | undefined; // user's name as given
      timestamp: string; // timestamp of the entry
      video_uri: string; // URI of the video file
      processed: {};
    }) {
    const params = {
      TableName: DB_TABLE_NAME,
      Item: data
    };
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    try {
      await dynamoDB.put(params).promise();
      console.log('Data written successfully:', data);
    } catch (error) {
      console.error('Error writing data to DynamoDB:', error);
      throw error;
    }
  }

  const uploadFile = async () => {
    setUploading(true);

    const fileName = getCurrentDateTime() + ".mov";
    const file = await uriToArrayBuffer(record);

    const s3 = new S3({
      params: {
        Bucket: S3_BUCKET,
      },
      region: REGION,
      });

    const params = {
      Bucket: S3_BUCKET,
      Key: uid + "/" + fileName,
      Body: file,
    };

    try {
      const upload = await s3.putObject(params).promise();
      console.log(upload);
      setUploading(false);
      writeToDynamoDB({
        id: uid + "_" + fileName.slice(0, -4), // remove the file extension
        user_uid: uid, // user's UID (plaksha)
        user_name: name, // user's name as given
        timestamp: fileName.slice(0, -4), // timestamp of the entry
        video_uri: `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${uid}/${fileName}`, // URI of the video file
        processed: {}
      });
      alert("File uploaded successfully.");
      setModalVisible(false);
      router.replace("/report/" + uid + "_" + fileName.slice(0, -4));
      
    } catch (e) {
      console.log(e);
      alert("Error uploading file. Please try again.");
      setModalVisible(false);
    }
      

  };
  function startUploading() {
    setModalVisible(true);
    uploadFile();
  }
  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View className="flex-1 justify-center items-center mt-22">
          <View className="bg-gray-800 m-20 rounded-xl p-10 align-center shadow-lg">
            <Text className="text-white text-xl">Uploading Video...</Text>
          </View>
        </View>
        </Modal> 
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
      <MyButton title="Confirm" className="bg-green px-3 mt-4 mx-3" onPress={startUploading}></MyButton>
    </View>
      

    </View>
  );
}