
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';

export default function HistoryScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} automaticallyAdjustKeyboardInsets={true} className="bg-black">

      <View className="flex-1 items-center justify-center">
        <Text className="text-white">Works</Text>

      </View>
    </ScrollView>
  );
}
