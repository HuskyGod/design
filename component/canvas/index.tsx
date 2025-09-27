//import liraries
import React, { useCallback, useState } from 'react';
import style from './style';
import { Canvas, Group } from '@shopify/react-native-skia';
import CanvasBackgound from './background';
import { LayoutChangeEvent } from 'react-native';
import { CanvasType } from '../../hook/canvas';
import { useContextBridge } from 'its-fine';
import { ListBox } from './Item';
import BoundActive from './boundActive';
import { ruleSize } from '../../hook/util';
import { View } from '@ant-design/react-native';

interface Prop {
    list: CanvasType[],
    active: null | CanvasType
}

// create a component
const CanvasScreen: React.FC<Prop> = ({ list, active }) => {
    const ContextBridge = useContextBridge();
    const sizeNumber = ruleSize;
    const [size, setSize] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const onLayout = useCallback((e: LayoutChangeEvent) => {
        setSize(e.nativeEvent.layout);
    }, []);
    return (
        <View style={style.container} onLayout={onLayout}>
            <Canvas style={[style.canvas, { zIndex: 1 }]}>
                <ContextBridge>
                    <CanvasBackgound width={size.width} height={size.height} size={sizeNumber} />
                </ContextBridge>
            </Canvas>
            <Canvas style={[style.canvas, { zIndex: 10, top: ruleSize, left: ruleSize}]}>
                <ContextBridge>
                    <ListBox list={list} />
                    { active ? (
                        <BoundActive active={active} />
                    ) : null }
                </ContextBridge>
            </Canvas>
        </View>
    );
};

//make this component available to the app
export default CanvasScreen;
