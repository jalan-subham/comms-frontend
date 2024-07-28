import { TouchableOpacity, Text } from 'react-native';

import "../global.css"

export default function MyButton({ onPress, title, className, ...props }) {
    return (
        <TouchableOpacity className={`rounded-lg ${className}`} activeOpacity={0.8} onPress={onPress} {...props}>
            <Text className="text-white text-xl capitalize px-6 py-2">{title}</Text>
        </TouchableOpacity>
    );
}