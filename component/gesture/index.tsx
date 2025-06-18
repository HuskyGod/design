//import liraries
import React, { useState } from 'react';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './style';
import { Provider } from './context';

// create a component
const GestureView: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [translationX, setTranslationX] = useState(0);
    const [translationY, setTranslationY] = useState(0);
    const [translationOffsetX, setTranslationOffsetX] = useState(0);
    const [translationOffsetY, setTranslationOffsetY] = useState(0);
    const panGesture = Gesture.Pan().minDistance(1);

    panGesture.onUpdate((e) => {
        setTranslationX((-e.translationX));
        setTranslationY((-e.translationY));
    }).onEnd(() => {
        setTranslationOffsetX((state => (state + (translationX))));
        setTranslationOffsetY((state => (state + (translationY))));
        // setTranslationOffsetX((state => state + (translationX)));
        // setTranslationOffsetY((state => state + (translationY)));
        setTranslationX(0);
        setTranslationY(0);
    }).runOnJS(true);
    return (
        <Provider value={{ translationX: Math.max(translationOffsetX + translationX, 0), translationY: Math.max(translationOffsetY + translationY, 0) }}>
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
