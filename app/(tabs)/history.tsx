
import { View, Text, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import AWS from 'aws-sdk';
import { useEffect, useState } from 'react';
import {router} from 'expo-router';

export default function HistoryScreen() {
  const [records, setRecords] = useState(null);
  const REGION = "ap-south-1";

  function getMonth(month: string) {
    switch (month) {
        case "01":
            return "January";
        case "02":
            return "February";
        case "03":
            return "March";
        case "04":
            return "April";
        case "05":
            return "May";
        case "06":
            return "June";
        case "07":
            return "July";
        case "08":
            return "August";
        case "09":
            return "September";
        case "10":
            return "October";
        case "11":
            return "November";
        case "12":
            return "December";
        default:
            return "Invalid month";
    }
}

function getDateTime(datetime: string) {
    // return string formatted date and time from  yyyy-mm-dd_hh-mm-ss format to human readable format
    const date = datetime.split("_")[0];
    const time = datetime.split("_")[1];

    const year = date.split("-")[0];
    const month = date.split("-")[1];
    const day = date.split("-")[2];

    const hour = time.split("-")[0];
    const minute = time.split("-")[1];
    const second = time.split("-")[2];

    // return in human readable format ex. 21st June 2024, 12:30:45 

    return `${day} ${getMonth(month)} ${year}, ${hour}:${minute}:${second}`;

}
  AWS.config.update({
    accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS,
    secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET,
    region: REGION,
  });


  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  // fetch last 15 histories
  useEffect(() => {
    dynamoDB.scan({
      TableName: "comms-test-v1",
      Limit: 50,
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        setRecords(data.Items);
        console.log(data.Items);
      }
    });
  }, []);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} automaticallyAdjustKeyboardInsets={true} className="bg-black">
      <View className="flex-1 items-center justify-center top-20 ">
      {records ? records.map((record, index) => (
          <TouchableOpacity key={index} className="w-11/12 bg-gray-900 rounded-lg p-4 mb-4 border-2 border-white focus:" onPress={() => router.push(`/report/${record.id}`)}>
            <Text className="text-lg  text-white mb-2"><Text className="font-bold">Name:</Text> {record.user_name}</Text>
            <Text className="text-lg text-gray-700 dark:text-gray-300 mb-2"><Text className="font-bold">Student ID:</Text> {record.user_uid}</Text>
            <Text className="text-lg text-gray-500 dark:text-gray-300 mb-2"><Text className="font-bold">Date and Time:</Text> {getDateTime(record.timestamp)}</Text>
          </TouchableOpacity>
      )) : <Text className="text-white text-lg">Loading...</Text>}
        </View>

    </ScrollView>
  );
}
