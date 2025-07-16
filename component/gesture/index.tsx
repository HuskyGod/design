//import liraries
import React, { useRef, useState } from 'react';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './style';
import { Provider } from './context';
import { CanvasOption } from '../../hook/canvas';
import { getBoundNumber } from '../../hook/util';

// create a component
const GestureView: React.FC<{ children: React.ReactNode, option: CanvasOption }> = ({ children, option }) => {
    const [translationX, setTranslationX] = useState(0);
    const [translationY, setTranslationY] = useState(0);
    const [translationOffsetX, setTranslationOffsetX] = useState(0);
    const [translationOffsetY, setTranslationOffsetY] = useState(0);
    const panGesture = Gesture.Pan().minDistance(1);
    const isObject = useRef(false);

    panGesture.onBegin((e) => {
        const check = option.checkBound(e);
        isObject.current = check;
    }).onUpdate((e) => {
        if (isObject.current) {
            return setTimeout(() => {
                option.setActiveLocation({ x: e.translationX, y: e.translationY });
            }, 50);
        }
        setTranslationX((-e.translationX));
        setTranslationY((-e.translationY));
    }).onEnd(() => {
        if (isObject.current) {
            // option.cleanInitLocation();
        }
        setTranslationOffsetX((state => (state + (translationX))));
        setTranslationOffsetY((state => (state + (translationY))));
        // setTranslationOffsetX((state => state + (translationX)));
        // setTranslationOffsetY((state => state + (translationY)));
        setTranslationX(0);
        setTranslationY(0);
    }).runOnJS(true);
    return (
        <Provider value={{ translationX: getBoundNumber(translationOffsetX + translationX), translationY: getBoundNumber(translationOffsetY + translationY) }}>
            <GestureHandlerRootView style={styles.container}>
                <GestureDetector gesture={panGesture}>
                    {children}
                </GestureDetector>
            </GestureHandlerRootView>
        </Provider>
    );
};

//make this component available to the app
export default GestureView;
