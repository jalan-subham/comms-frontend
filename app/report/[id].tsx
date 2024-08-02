import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import AWS from 'aws-sdk';

import "../../global.css"
export default function ReportScreen() {
    let {id} =  useLocalSearchParams<{id: string}>();
    const [details, setDetails] = useState(null);
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

    const getDetails = async () => {
        const params = {
        TableName: "comms-test-v1",
        Key: {
            id: id,
        }};

        try {
        const data = await dynamoDB.get(params).promise();
        setDetails(data.Item);
        } catch (error) {
        alert("Error fetching data.");
        }
    }
    if (!details) {
    getDetails();
    }


    if (!details) {
        return (
            <View className="flex-1 bg-black items-center justify-center">
            <Text className="text-white text-lg">loading data for id: {id}</Text>
        </View>
        )
    }
    else {
        return (
            <View className="flex-1 bg-black w-full h-full">
            <View className="flex top-28 left-28">
                <Text className="text-white text-5xl">Performance Report</Text>
                <View className="mt-5">
                <Text className="text-white text-xl"><Text className="font-bold">Name:</Text> {details.user_name}</Text>

                    <Text className="text-white text-xl"><Text className="font-bold">User ID:</Text> {details.user_uid}</Text>
                    <Text className="text-white text-xl"><Text className="font-bold">Recording Date & Time:</Text> {getDateTime(details.timestamp)}</Text>
                    
                    <View className="mt-10">
                        {Object.keys(details.processed).length === 0 ? 
                        <Text className="text-red-500 text-bold text-xl">Your results are still processing. Check again in a few minutes.</Text>
                         : 
                         <View >
                            <Text className="text-white text-bold text-xl">Reading Score: </Text>
                         </View>
                         
                         
                         }
                         
                    </View>
                </View>
            </View>
        </View>
        )
    }
}