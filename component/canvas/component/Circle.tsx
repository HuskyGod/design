//import liraries
import { Circle } from '@shopify/react-native-skia';
import React from 'react';
import { CanvasType } from '../../../hook/canvas';

// create a component
const CircleItem: React.FC<{ option: CanvasType }> = ({ option }) => {
    const propValue = {
        cx: option.size.r,
        cy: option.size.r,
        color: option.color,
        r: option.size.r!,
    };
    return (
        <Circle
            {...propValue}
        />
    );
};

//make this component available to the app
export default CircleItem;
