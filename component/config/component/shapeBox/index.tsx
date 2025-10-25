//import liraries
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useModal } from '../../../../hook/modal';
import ModalBox from '../../../ModalBox/index';
import { CanvasOption, CanvasType } from '../../../../hook/canvas';
import styles from './style';
import Svg, { Circle, Text as SvgText, Rect } from 'react-native-svg';
import { Flex } from '@ant-design/react-native';
import InputBox from '../../../Form/Input';
import { extraInfoType } from '../../../../hook/util';
// create a component
interface ColorProp {
    modal: ReturnType<typeof useModal>,
    option: CanvasOption,
    onSelect: (type?: CanvasType['type'], info?: extraInfoType) => void
}


const ShapeBox: React.FC<ColorProp> = ({ modal, onSelect }) => {

    const [shapeList, setShapeList] = useState<{ name: CanvasType['type'], svg: React.ReactNode, label: string }[]>([]);
    const [input, setInput] = useState('');

    const [shape, setShape] = useState<{ name: CanvasType['type'], svg: React.ReactNode, label: string } | null>(null);

    const onFinish = useCallback(() => {
        onSelect(shape?.name, { text: input });
        modal.onClose();
    }, [modal, onSelect, input, shape]);

    const onInit = async () => {
        setShapeList([
            { name: 'rect', svg: <Rect width={100} height={100} fill={'#666'} />, label: '矩形' },
            { name: 'circle', svg: <Circle cx={50} cy={50} r={50} fill={'#666'} />, label: '圆形' },
            { name: 'text', svg: <SvgText x={50} y={55} textAnchor="middle" fontWeight="bold" fill="#666" fontSize="25">TextFont</SvgText>, label: '文本' },
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
            {/* 基本形状 */}
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
            {shape?.name === 'text' && (
                <>
                    <View style={styles.titleBox}><Text style={styles.title}>文本</Text></View>
                    <InputBox value={input} placeholder="请输入文案" onChangeInput={(value) => setInput(value)} />
                </>
            )}
        </ModalBox>
    );
};

//make this component available to the app
export default ShapeBox;
