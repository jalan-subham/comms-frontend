import * as React from 'react';
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import "../../global.css";
import Checkbox from 'expo-checkbox';
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
    <View contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} automaticallyAdjustKeyboardInsets={true} className="bg-black">
            {/* <Text className="text-white text-3xl2 top-24 left-24">Input your details to continue.</Text> */}

      <View className="flex-1 items-center justify-center">
      {/* <Text className="text-md text-white"></Text> */}
        <View className="w-1/3">
          <Picker
  selectedValue={selectedLanguage}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedLanguage(itemValue)
  }>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>

    
        </View>
      </View>
    </View>
  );
}
