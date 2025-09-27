//import liraries
import React, { useRef, useState } from 'react';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './style';
import { Provider } from './context';
import { CanvasOption } from '../../hook/canvas';
import { getBoundNumber } from '../../hook/util';
import { Text, View } from 'react-native';
import { Flex } from '@ant-design/react-native';

// create a component
const GestureView: React.FC<{ children: React.ReactNode, option: CanvasOption }> = ({ children, option }) => {
    const [translationX, setTranslationX] = useState(0);
    const [translationY, setTranslationY] = useState(0);
    const [translationOffsetX, setTranslationOffsetX] = useState(0);
    const [translationOffsetY, setTranslationOffsetY] = useState(0);
    const panGesture = Gesture.Pan().minDistance(1);
    const isObject = useRef(false);

    const translationXNumber = getBoundNumber(translationOffsetX + translationX);
    const translationYNumber = getBoundNumber(translationOffsetY + translationY);

    panGesture.onBegin((e) => {
        const check = option.checkBound(e, translationXNumber, translationYNumber);
        isObject.current = check;
    }).onUpdate((e) => {
        if (isObject.current) {
            // return setTimeout(() => {
            //     option.setActiveLocation({ x: e.translationX, y: e.translationY });
            // }, 50);
            return option.setActiveLocation({ x: e.translationX, y: e.translationY });
        }
        setTranslationX((-e.translationX));
        setTranslationY((-e.translationY));
    }).onEnd(() => {
        if (isObject.current) {
            // option.cleanInitLocation();
        }
        setTranslationOffsetX((state => (state + (translationX))));
        setTranslationOffsetY((state => (state + (translationY))));
        setTranslationX(0);
        setTranslationY(0);
    }).runOnJS(true);
    return (
        <Provider value={{ translationX: translationXNumber, translationY: translationYNumber }}>
            <GestureHandlerRootView style={styles.container}>
                <GestureDetector gesture={panGesture}>
                    <View style={{ height: '100%' }}>
                        {children}
                    </View>
                </GestureDetector>
            </GestureHandlerRootView>
        </Provider>
    );
};

//make this component available to the app
export default GestureView;
