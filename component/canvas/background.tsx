import { Group, Line, Rect, Text, vec } from '@shopify/react-native-skia';
import React, { useContext, useMemo } from 'react';
import { createXLable, createXLine, createYLable, createYLine, LineOption } from './utils';
import context from '../gesture/context';

const color = 'lightblue';

interface Props {
    width: number,
    height: number,
    size: number
}

// create a component
const CanvasBackgound: React.FC<Props> = ({ width, height, size }) => {
    const contextValue = useContext(context);
    const widthSize = width - size;
    const heightSize = height - size;
    const xLine = useMemo<LineOption[]>(() => {
        return createXLine(size, widthSize, heightSize, contextValue.translationY);
    }, [widthSize, heightSize, size, contextValue.translationY]);

    const yLine = useMemo<LineOption[]>(() => {
        return createYLine(size, heightSize, widthSize, contextValue.translationX);
    }, [widthSize, heightSize, size, contextValue.translationX]);

    const xLable = useMemo<LineOption[]>(() => {
        return createXLable(size, heightSize, contextValue.translationY);
    }, [heightSize, size, contextValue.translationY]);

    const yLable = useMemo<LineOption[]>(() => {
        return createYLable(size, widthSize, contextValue.translationX);
    }, [widthSize, size, contextValue.translationX]);

    if (!width || !height) {return <Group />;}
    return (
        <Group>
            {/* x轴tab */}
            <Group>
                <Rect x={0} y={0} width={width} height={size} color={color} />
                <Line
                    p1={vec(0, size)}
                    p2={vec(width, size)}
                    color="blue"
                    style="stroke"
                    strokeWidth={1}
                />
            </Group>
            {/* y轴tab */}
            <Group>
                <Rect x={0} y={size} width={size} height={height} color={color} />
                <Line
                    p1={vec(size, 0)}
                    p2={vec(size, height)}
                    color="blue"
                    style="stroke"
                    strokeWidth={1}
                />
            </Group>
            {/* x轴标尺线 */}
            <Group>
                <Group transform={[{ translateY: size }, { translateX: size }]}>
                    {xLine.map((item, index) => (
                        <Line
                            key={`${index}`}
                            p1={item.p1}
                            p2={item.p2}
                            color={color}
                            style="stroke"
                            strokeWidth={1}
                        />
                    ))}
                </Group>
                <Group transform={[{ translateY: size }]}>
                    {xLable.map((item, index) => (
                        <Group key={`${index}`}>
                            <Line
                                p1={item.p1}
                                p2={item.p2}
                                color={'blue'}
                                style="stroke"
                                strokeWidth={1}
                            />
                            <Text
                                x={item.x!}
                                y={item.y!}
                                text={item.text!}
                                font={item.font!}
                            />
                        </Group>
                    ))}
                </Group>
            </Group>
            {/* y轴标尺线 */}
            <Group>
                <Group transform={[{ translateY: size }, { translateX: size }]}>
                    {yLine.map((item, index) => (
                        <Line
                            key={`${index}`}
                            p1={item.p1}
                            p2={item.p2}
                            color={color}
                            style="stroke"
                            strokeWidth={1}
                        />
                    ))}
                </Group>
                <Group transform={[{ translateX: size }]}>
                    {yLable.map((item, index) => (
                        <Group key={`${index}`}>
                            <Line
                                p1={item.p1}
                                p2={item.p2}
                                color={'blue'}
                                style="stroke"
                                strokeWidth={1}
                            />
                            <Text
                                x={item.x!}
                                y={item.y!}
                                text={item.text!}
                                font={item.font!}
                            />
                        </Group>
                    ))}
                </Group>
            </Group>
            {/* 放个正方形防止溢出显示 */}
            <Rect x={0} y={0} width={size - 1} height={size - 1} color={color} />
        </Group>
    );
};

//make this component available to the app
export default CanvasBackgound;
