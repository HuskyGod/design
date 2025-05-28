//import liraries
import React from 'react';
import style from './style';
import { Canvas, Circle, Group } from '@shopify/react-native-skia';

// create a component
const CanvasScreen = () => {
    const width = 256;
    const r = width * 0.33;
    return (
        <Canvas style={style.container}>
            <Group blendMode="multiply">
                <Circle cx={r} cy={r} r={r} color="cyan" />
                <Circle cx={width - r} cy={r} r={r} color="magenta" />
                <Circle cx={width / 2} cy={width - r} r={r} color="yellow" />
            </Group>
        </Canvas>
    );
};

//make this component available to the app
export default CanvasScreen;
