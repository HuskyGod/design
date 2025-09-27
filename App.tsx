//import liraries
import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { useCanvas } from './hook/canvas';
import ConfigList from './component/config';
import GestureView from './component/gesture';
import { FiberProvider } from 'its-fine';
import { Provider } from '@ant-design/react-native';

// create a component
const MyComponent = () => {
    const { element, option } = useCanvas();

    return (
        <Provider>
            <SafeAreaView style={{ flex: 1 }}>
                <FiberProvider>
                    <View style={{ height: StatusBar.currentHeight, backgroundColor: 'lightblue', borderBottomWidth: 1, borderBottomColor: 'blue' }} />
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ flex: 1 }}>
                            <GestureView option={option}>
                                <View style={{ flex: 1, flexDirection: 'column', width: '100%' }}>
                                    {element}
                                </View>
                            </GestureView>
                        </View>
                    </View>
                </FiberProvider>
                <ConfigList option={option} />
            </SafeAreaView>
        </Provider>
    );
};

//make this component available to the app
export default MyComponent;
