import * as React from 'react';;
import "../../global.css";
import { View, Text, ScrollView } from 'react-native';
export default function AboutScreen() {

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} automaticallyAdjustKeyboardInsets={true} className="bg-black">
      <View className="flex-1 items-center justify-center">
        <View className="w-4/5 items-center">
            <Text className='text-white text-xl'>This application was developed by Chaitanya Modi, Hibah Ihsan Muhammad, and Subham 
                Jalan for the CTLC team. It is being used to collect data for training models for evaluating non-verbal communication.
                
            </Text>
            <Text className='text-white text-xl mt-10'>
                Thank You for taking part in this study.
            </Text>
        </View>
        </View>
    </ScrollView>
  );
}
