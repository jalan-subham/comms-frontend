import * as React from 'react';
import "../global.css";
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Alert } from 'react-native';
export default function AboutScreen() {
  const getStarted = () =>
  {
    router.replace("/instructions");
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      automaticallyAdjustKeyboardInsets={true}
      className="bg-black"
    >
      <View className="flex-1 items-center">
        <View className="w-4/5 items-center">
          <Text className="text-white text-6xl text-left mt-40">
            Instructions
          </Text>
          <View>
          <Text className="text-white text-3xl text-left mt-20">
            1. Fill the form with your details.
            </Text>
            <Text className="text-white text-3xl text-left mt-6">
            2. You will be shown a series of prompts. Kindly record your response to each prompt.
            </Text>
            <Text className="text-white text-3xl text-left mt-6">

            3. Once you have recorded your response, you will be shown the next prompt.

            </Text>
            <Text className="text-white text-3xl text-left mt-6">
4. After all the videos have been recorded, they will be uploaded to the server.
            </Text>
            <Text className="text-white text-3xl text-left mt-6">
                5. You will receive an email with the results in a few minutes.
                </Text>
                </View>
                <View className='flex-row'>
                <TouchableOpacity
            className="bg-red-600 rounded-lg mt-24 mx-20"
            activeOpacity={0.8}
            onPress={() => router.replace("/")}
          >
            <Text className="text-white text-3xl capitalize px-10 py-4 text-center">
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-600 rounded-lg mt-24 mx-20"
            activeOpacity={0.8}
            onPress={() => router.replace("/form")}
          >
            <Text className="text-white text-3xl capitalize px-10 py-4 text-center">
              Start
            </Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* the next view should be at bottom*/} 
     
    </ScrollView>
  );
}
