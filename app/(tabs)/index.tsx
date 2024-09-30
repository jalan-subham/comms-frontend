import * as React from 'react';
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import "../../global.css";
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet } from 'react-native';
import {router} from 'expo-router';

export default function HomeScreen() {
  // const [name, onChangeName] = React.useState('');
  // const [uid, onChangeUid] = React.useState('');
  const [age, onChangeAge] = React.useState('');
  const [gender, onChangeGender] = React.useState('');
  const [languageHome, onChangeLanguageHome] = React.useState('');
  const [languagePrimary, onChangeLanguagePrimary] = React.useState('');
  const [region, onChangeRegion] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  var metadata = require('../../metadata.json');
  console.log(metadata);
  // context picking logic
  var questions = metadata[0].questions;
  var questionPointer = 0;

  global.questions = questions;
  global.questionPointer = questionPointer;
  global.videoURLs = [];


  
  const handleNumericInput = (text) => {
    var numericValue = text.replace(/[^0-9]/g, "");
    var num = Number(numericValue);
    // if (num == 0) {
    //   numericValue = '';
    // }
    onChangeAge(numericValue);
};

const indianStatesAndUTs = [
  // Indian States
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',

  // Union Territories (UTs)
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 
  'Lakshadweep', 'Delhi', 'Puducherry', 'Jammu and Kashmir', 'Ladakh'
];

const formHandler = () => {
  // check email format
  var emailFormat = /\S+@\S+\.\S+/;
  if (!emailFormat.test(email)) {
    alert("Please enter a valid email.");
    return;
  }
  if (email == '') {
    alert("Please enter your email.");
    return;
  }

  var userData = {
    email: email,
    age: age,
    gender: gender,
    languageHome: languageHome,
    languagePrimary: languagePrimary,
    region: region
  };  
  console.log(userData);
  global.userData = userData;

  // navigate to /record
  router.push("/record");
}

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} automaticallyAdjustKeyboardInsets={true} className="bg-black">
            {/* <Text className="text-white text-3xl2 top-24 left-24">Input your details to continue.</Text> */}

      <View className="flex-1 items-center justify-center">
      {/* <Text className="text-md text-white"></Text> */}
        <View className="w-1/3">

          {/* <View className="">
            <Text className="text-lg text-gray-500 dark:text-gray-300 mb-2">Name</Text>
            <TextInput
              onChangeText={onChangeName}
              value={name}
              placeholder="Your Name"
              className="text-lg w-full rounded-lg border border-gray-200 bg-white p-4 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            />
          </View> */}
       
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

          {/* <View className="mt-3">
            <Text className="text-lg text-gray-500 dark:text-gray-300 mb-2">Student ID</Text>
            <TextInput
              onChangeText={onChangeUid}
              value={uid}
              placeholder="U20240000"
              className="text-lg w-full rounded-lg border border-gray-200 bg-white p-4 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            />
          </View> */}
          <View className='mt-3'>
          <Text className="text-lg text-gray-500 dark:text-gray-300 mb-2">Gender</Text>


          <RNPickerSelect
          placeholder={{
            label: 'Select item...',
            color: "white",
            value: null
          }}
           style = {pickerSelectStyles}
           darkTheme={true}
      onValueChange={(value) => onChangeGender(value)}
      items={[
        { label: 'Male', value: 'M', key: 'M' },
        { label: 'Female', value: 'F', key: 'F' },
        { label: 'Other', value: 'O', key: 'O' },
        { label: 'Prefer not to say', value: 'X', key: 'X' },
      ]}
    />
    </View>
    <View className="mt-3">
            <Text className="text-lg text-gray-500 dark:text-gray-300 mb-2">Language Spoken at Home</Text>
            <TextInput
              onChangeText={onChangeLanguageHome}
              value={languageHome}
              placeholder="Hindi"
              className="text-lg w-full rounded-lg border border-gray-200 bg-white p-4 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            />
          </View>

          <View className="mt-3">
            <Text className="text-lg text-gray-500 dark:text-gray-300 mb-2">Language of Primary Education</Text>
            <TextInput
              onChangeText={onChangeLanguagePrimary}
              value={languagePrimary}
              placeholder="English"
              className="text-lg w-full rounded-lg border border-gray-200 bg-white p-4 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            />
          </View>
          <View className='mt-3'>
          <Text className="text-lg text-gray-500 dark:text-gray-300 mb-2">Region</Text>


          <RNPickerSelect
          placeholder={{
            label: 'Select item...',
            color: "white",
            value: null
          }}
           style = {pickerSelectStyles}
           darkTheme={true}
      onValueChange={(value) => onChangeRegion(value)}
      items={indianStatesAndUTs.map((state, index) => ({
        label: state,
        value: state.toLowerCase().replace(/\s+/g, ''), // Remove spaces and convert to lowercase
        key: index.toString() // Use index as key, converted to a string
      }))}
    />
    </View>
          
  
    <View className="mt-3">
            <Text className="text-lg text-gray-500 dark:text-gray-300 mb-2">Email (report will be sent here)</Text>
            <TextInput
              onChangeText={onChangeEmail}
              value={email}
              placeholder="davidoff.sharma@gmail.com"
              className="text-lg w-full rounded-lg border border-gray-200 bg-white p-4 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            />
          </View>
          <View className="mt-8">
            {/* <Link href={`/record`} asChild> */}
              <TouchableOpacity className="bg-blue-600 rounded-lg self-start" activeOpacity={0.8} onPress={formHandler}>
                <Text className="text-white text-lg capitalize px-6 py-2">Continue</Text>
              </TouchableOpacity>
            {/* </Link> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#4B5863',
    borderRadius: 6,
    backgroundColor: '#111827',
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon.

  },
placeholder: {
  color: '#374151'
}},
)