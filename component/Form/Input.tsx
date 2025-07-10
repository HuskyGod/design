//import liraries
import { Input, InputProps } from '@ant-design/react-native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface MyInputProps extends InputProps {
    onChangeInput?: (value: any) => void
}

// create a component
const InputBox: React.FC<MyInputProps> = (prop) => {
    const {onChangeInput} = prop;

    const onChange: InputProps['onChange'] = (e) => {
        if (onChangeInput) {
            onChangeInput(e.target?.value);
        }
    };

    return (
        <View style={styles.container}>
            <Input
                {...prop}
                onChange={onChange}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderColor: '#6666',
        borderWidth: 1.5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

//make this component available to the app
export default InputBox;
