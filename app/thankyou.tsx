import * as React from 'react';
import "../global.css";
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function AboutScreen() {
    
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      automaticallyAdjustKeyboardInsets={true}
      className="bg-black"
    >
      <View className="flex-1 items-center justify-center">
        <View className="w-4/5 items-center">
          <Text className="text-white text-3xl text-center">
            Thank you for taking part in this study. The results will be sent
            to your email once they are processed.
          </Text>
          <TouchableOpacity
            className="bg-blue-600 rounded-lg mt-8"
            activeOpacity={0.8}
            onPress={() => router.push("/")}
          >
            <Text className="text-white text-lg capitalize px-6 py-2 text-center">
              Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
