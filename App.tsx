//import liraries
import React from 'react';
import { View } from 'react-native';
import { useCanvas } from './hook/canvas';
import ConfigList from './component/config';

// create a component
const MyComponent = () => {
    const { element, option } = useCanvas();
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            {element}
            <ConfigList option={option} />
        </View>
    );
};

//make this component available to the app
export default MyComponent;
