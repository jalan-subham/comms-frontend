import * as React from 'react';
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import "../../global.css";
import {Picker} from '@react-native-picker/picker';

export default function HomeScreen() {
  const [name, onChangeName] = React.useState('');
  const [uid, onChangeUid] = React.useState('');
  const [age, onChangeAge] = React.useState('');
  const [gender, onChangeGender] = React.useState();
  const [selectedLanguage, setSelectedLanguage] = React.useState();

  const handleNumericInput = (text) => {
    var numericValue = text.replace(/[^0-9]/g, "");
    var num = Number(numericValue);
    // if (num == 0) {
    //   numericValue = '';
    // }
    onChangeAge(numericValue);
};

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} automaticallyAdjustKeyboardInsets={true} className="bg-black">
            {/* <Text className="text-white text-3xl2 top-24 left-24">Input your details to continue.</Text> */}

      <View className="flex-1 items-center justify-center">
      {/* <Text className="text-md text-white"></Text> */}
        <View className="w-1/3">

          <View className="">
            <Text className="text-lg text-gray-500 dark:text-gray-300 mb-2">Name</Text>
            <TextInput
              onChangeText={onChangeName}
              value={name}
              placeholder="Your Name"
              className="text-lg w-full rounded-lg border border-gray-200 bg-white p-4 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            />
          </View>

          <View className="mt-3">
            <Text className="text-lg text-gray-500 dark:text-gray-300 mb-2">Age</Text>
            <TextInput
              onChangeText={handleNumericInput}
              value={age}
              keyboardType='numeric'
              placeholder="20"
              maxLength={2}
              className="text-lg w-full rounded-lg border border-gray-200 bg-white p-4 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            />
          </View>

          <View className="mt-3">
            <Text className="text-lg text-gray-500 dark:text-gray-300 mb-2">Student ID</Text>
            <TextInput
              onChangeText={onChangeUid}
              value={uid}
              placeholder="U20240000"
              className="text-lg w-full rounded-lg border border-gray-200 bg-white p-4 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            />
          </View>

          <Picker
  selectedValue={selectedLanguage}
  style={{ height: 100, width: 150 }}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedLanguage(itemValue)
  }>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>

          <View className="mt-8">
            <Link href={`/record?name=${encodeURIComponent(name)}&uid=${encodeURIComponent(uid)}`} asChild>
              <TouchableOpacity className="bg-blue-600 rounded-lg self-start" activeOpacity={0.8}>
                <Text className="text-white text-lg capitalize px-6 py-2">Continue</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
