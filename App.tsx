//import liraries
import React from 'react';
import { View } from 'react-native';
import { useCanvas } from './hook/canvas';
import ConfigList from './component/config';
import GestureView from './component/gesture';
import { FiberProvider } from 'its-fine';

// create a component
const MyComponent = () => {
    const { element, option } = useCanvas();

    return (
        <FiberProvider>
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 1 }}>
                    <GestureView option={option}>
                        <View style={{ flex: 1, flexDirection: 'column', width: '100%' }}>
                            {element}
                        </View>
                    </GestureView>
                </View>
                <ConfigList option={option} />
            </View>
        </FiberProvider>
    );
};

//make this component available to the app
export default MyComponent;
