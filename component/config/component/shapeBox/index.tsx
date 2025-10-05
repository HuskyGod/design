//import liraries
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { useModal } from '../../../../hook/modal';
import ModalBox from '../../../ModalBox/index';
import { CanvasOption, CanvasType } from '../../../../hook/canvas';
import styles from './style';
import Svg, { Circle, Rect } from 'react-native-svg';
import { Flex } from '@ant-design/react-native';
// create a component
interface ColorProp {
    modal: ReturnType<typeof useModal>,
    option: CanvasOption,
    onSelect: (type?: CanvasType['type']) => void
}


const ShapeBox: React.FC<ColorProp> = ({ modal, onSelect }) => {

    const [shapeList, setShapeList] = useState<{ name: string, svg: React.ReactNode, label: string }[]>([]);

    const [shape, setShape] = useState<{ name: CanvasType['type'], svg: React.ReactNode, label: string } | null>(null);

    const onFinish = useCallback(() => {
        onSelect(shape?.name);
        modal.onClose();
    }, [modal, onSelect, shape]);

    const onInit = async () => {
        setShapeList([
            { name: 'rect', svg: await <Rect width={100} height={100} fill={'#666'} />, label: '矩形' },
            { name: 'circle', svg: await <Circle cx={50} cy={50} r={50} fill={'#666'} />, label: '圆形' },
        ]);
    };

    useEffect(() => {
        onInit();
    }, []);

    return (
        <ModalBox
            modal={modal}
            visible={modal.open}
            onFinish={onFinish}
        >
            {/* 颜色 */}
            <View style={styles.titleBox}><Text style={styles.title}>基本形状</Text></View>
            <Flex wrap="wrap" justify="between">
                {shapeList.map(item => (
                    <TouchableOpacity key={item.name} onPress={() => setShape(item)}>
                        <Flex style={{ ...styles.titleBox, width: 100 }} direction="column" align="center">
                            <Svg style={styles.svg}>
                                {item.svg}
                            </Svg>
                            <Text>{item.label}</Text>
                        </Flex>
                    </TouchableOpacity>
                ))}
            </Flex>
        </ModalBox>
    );
};

//make this component available to the app
export default ShapeBox;
