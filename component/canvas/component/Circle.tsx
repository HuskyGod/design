//import liraries
import { Oval, Paint } from '@shopify/react-native-skia';
import React from 'react';
import { CanvasType } from '../../../hook/canvas';

// create a component
const CircleItem: React.FC<{ option: CanvasType }> = ({ option }) => {
    const propValue = {
        x: option.size.x,
        y: option.size.y,
        width: option.size.width,
        height: option.size.height,
        color: option.color,
        // r: option.size.r!,

    };
    return (
        <Oval
            {...propValue}
        >
            { option.border?.show ? <Paint color="blue" strokeWidth={option.border?.value} style="stroke" /> : null }
        </Oval>
    );
};

//make this component available to the app
export default CircleItem;
