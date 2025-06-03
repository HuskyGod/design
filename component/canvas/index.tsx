//import liraries
import React, { useCallback, useState } from 'react';
import style from './style';
import { Canvas } from '@shopify/react-native-skia';
import CanvasBackgound from './background';
import { LayoutChangeEvent } from 'react-native';
import { useContextBridge } from 'its-fine';

// create a component
const CanvasScreen = () => {
    const ContextBridge = useContextBridge();
    const sizeNumber = 25;
    const [size, setSize] = useState({ x: 0, y: 0, width: 0, height: 0 })
    const onLayout = useCallback((e: LayoutChangeEvent) => {
        setSize(e.nativeEvent.layout)
    }, []);
    return (
        <Canvas style={style.container} onLayout={onLayout}>
            <ContextBridge>
                <CanvasBackgound width={size.width} height={size.height} size={sizeNumber} />
            </ContextBridge>
        </Canvas>
    );
};

//make this component available to the app
export default CanvasScreen;
