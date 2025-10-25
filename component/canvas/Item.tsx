//import liraries

import { Group, Paint, Shadow } from '@shopify/react-native-skia';
import { CanvasElementType, CanvasType } from '../../hook/canvas';
import RectItem from './component/Rect';
import { FC, useContext } from 'react';
import context from '../gesture/context';
import CircleItem from './component/Circle';
import TextItem from './component/Text';

const getItemType = (option: CanvasType) => {
    const component: Record<CanvasElementType, any> = {
        'rect': RectItem,
        'circle': CircleItem,
        'text': TextItem,
    };
    return component[option.type];
};

// create a component
const ItemBox: React.FC<{ option: CanvasType }> = ({ option }) => {
    const Component = getItemType(option)!;
    return (
        <Group>
            <Component option={option}>
                <Paint color={option.border?.color} strokeWidth={option.border?.value} style="stroke" />
                {option.shadow?.dx && option.shadow?.dy ?
                    <Shadow
                        dx={option.shadow?.dx}
                        dy={option.shadow?.dy}
                        blur={option.shadow?.blue}
                        color={option.shadow?.color}
                        inner={option.shadow?.inner}
                    /> : null}
            </Component>
        </Group>
    );
};

export const ListBox: React.FC<{ list: CanvasType[] }> = ({ list }) => {
    const contextValue = useContext(context);
    return (
        <Group>
            <Group transform={[{ translateX: -contextValue.translationX }, { translateY: -contextValue.translationY }]}>
                {
                    list.map((item) => <ItemBox key={item.key} option={item} />)
                }
            </Group>
        </Group>
    );
};

//make this component available to the app
export default ItemBox;
