import { TouchableOpacity, Text } from 'react-native';

import "../global.css"

export default function MyButton({ onPress, title, className, ...props }) {
    return (
        <TouchableOpacity className={`rounded-lg ${className}`} activeOpacity={0.8} onPress={onPress} {...props}>
            <Text className="text-white text-2xl capitalize px-3 py-2">{title}</Text>
        </TouchableOpacity>
    );
}