import * as React from 'react';
import { Image, StyleSheet, Platform, ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import "../../global.css";


export default function HomeScreen() {
  const [name, onChangeName] = React.useState('Name');
  const [uid, onChangeUid] = React.useState('UID');

  React.useEffect(() => {
    console.log(name);
    console.log(uid);
  }, [name, uid]);q
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} automaticallyAdjustKeyboardInsets={true} className="bg-black" >
      <View className="flex-1 items-center justify-center">
      
        <View className="w-1/3"> 
          <View>
           <Text className="block text-lg text-gray-500 dark:text-gray-300 mb-2">Name</Text>
          <TextInput onChangeText={onChangeName} className="pt-2 block text-lg w-full h-16 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-4 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
          </View>

          <View className="mt-3">
            <Text className="block text-lg text-gray-500 dark:text-gray-300 mb-2">Student ID</Text>
            <TextInput onChangeText={onChangeUid} className="pt-2 block text-lg w-full h-16 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-4 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
          </View>
          <View className="mt-8 items-center">
            <TouchableOpacity className="px-1 py-2 bg-primary rounded-lg self-start" activeOpacity={0.8}>
              <Text className="text-light text-lg capitalize px-2 py-0.5">Conitnue</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}


