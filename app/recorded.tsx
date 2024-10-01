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
  // let {name, uid, record} =  useLocalSearchParams<{name: string; uid: string, record: string}>();
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);  
  const questionPointer = global.questionPointer;
  const record = global.videoURLs[questionPointer];
  const isLast = global.questions.length - 1 === questionPointer;
  const userData = global.userData;

  const uploadCompleteAlert = () =>
    Alert.alert('Upload Complete', 'The videos have been uploaded. The report will be sent to your email once processing is complete. ', [
      {text: 'OK', onPress: () => {
        setModalVisible(false);
        router.replace("/");
      }},
    ]);
  
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

function confirmVideo() {
  if (isLast) {
    startUploading();
  } else {
    global.questionPointer++;
    global.videoURLs[questionPointer] = record;
    router.push(`/record`);
  }
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
const S3_BUCKET = "comms-prod-1"; // Replace with your bucket name
const REGION = "ap-south-1"; // Replace with your region
const DB_TABLE_NAME = "comms-prod-1"; // Replace with your DynamoDB table name

AWS.config.update({
  accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS,
  secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET,
  region: REGION,
});

  async function writeToDynamoDB(data) {
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

    // const fileName = getCurrentDateTime() + ".mov";
    const timestamp = parseInt((new Date().getTime() / 1000).toFixed(0));

    const s3 = new S3({
      params: {
        Bucket: S3_BUCKET,
      },
      region: REGION,
      });


    try {
      // console.log(global.videoURLs);
      for (let i = 0; i < global.videoURLs.length; i++) {
        var file = await uriToArrayBuffer(global.videoURLs[i]);
        var params = {
          Bucket: S3_BUCKET,
          Key: timestamp + "/" + i + ".mov",
          Body: file,
        };

      const upload = await s3.putObject(params).promise();
      console.log(upload);
      }

      setUploading(false);
      writeToDynamoDB({
        id: timestamp, // remove the file extension
        email: userData.email, // user's email
        age: userData.age, // user's
        gender: userData.gender,
        languageHome: userData.languageHome,
        languagePrimary: userData.languagePrimary,
        region: userData.region,
        context: global.context,
        emailed: false,
        // video_folder: `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${timestamp}/`, // URI of the video folder
        processed: {}
      });
      uploadCompleteAlert();
     
      // router.replace("/report/" + timestamp + "_" + fileName.slice(0, -4));
      
    } catch (e) {
      console.log(e);
      alert("Error uploading files. Please try again.");
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
      <MyButton title="Confirm" className="bg-green px-3 mt-4 mx-3" onPress={confirmVideo}></MyButton>
    </View>
      

    </View>
  );
}