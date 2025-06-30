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
    console.log('active', active);
    return (
        <Canvas style={style.container} onLayout={onLayout}>
            <ContextBridge>
                <CanvasBackgound width={size.width} height={size.height} size={sizeNumber} />
                <Group transform={[{ translateX: sizeNumber }, { translateY: sizeNumber }]}>
                    <ListBox list={list} />
                    { active ? (
                        <BoundActive active={active} />
                    ) : null }
                </Group>
            </ContextBridge>
        </Canvas>
    );
};

//make this component available to the app
export default CanvasScreen;
