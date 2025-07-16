//import liraries
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useModal } from '../../hook/modal';
import ModalBox from '../ModalBox';
import { CanvasOption } from '../../hook/canvas';
import styles from './style';
import Svg, { Rect, SvgUri } from 'react-native-svg';
import RectSvg from '../../assest/svg/rect.svg';
import { Flex } from '@ant-design/react-native';
// create a component
interface ColorProp {
    modal: ReturnType<typeof useModal>,
    option: CanvasOption,
}

const requireRourceToString = (id: number) => {
    console.log('id', id);
    return fetch(Image.resolveAssetSource(id).uri).then((res) => {
        return res.text();
    });
};

const ShapeBox: React.FC<ColorProp> = ({ modal }) => {

    const [shapeList, setShapeList] = useState<{ name: string, svg: string, label: string }[]>([]);

    const onFinish = useCallback(() => {
        modal.onClose();
    }, [modal]);

    const onInit = async () => {
        setShapeList([
            { name: 'rect', svg: await requireRourceToString(RectSvg), label: '矩形' },
            { name: 'rect1', svg: await requireRourceToString(RectSvg), label: '矩形' },
            { name: 'rect2', svg: await requireRourceToString(RectSvg), label: '矩形' },
            { name: 'rect3', svg: await requireRourceToString(RectSvg), label: '矩形' },
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
                    <Flex style={{ ...styles.titleBox, width: 100 }} direction="column" align="center" key={item.name}>
                        {/* <SvgUri
                            width={100}
                            height={100}
                            uri={item.svg}
                        /> */}
                        <Svg style={{ width: '100%', height: 100 }}>
                            <Rect
                                width={100}
                                height={100}
                                fill={'red'}
                            />
                        </Svg>
                        <Text>{item.label}</Text>
                    </Flex>
                ))}
            </Flex>
        </ModalBox>
    );
};

//make this component available to the app
export default ShapeBox;
