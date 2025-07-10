//import liraries
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useModal } from '../../hook/modal';
import { LiquidGlassView } from 'react-native-liquid-view';
import ModalBox from '../ModalBox';
import styles from './style';
import { Flex,  Stepper,  Switch } from '@ant-design/react-native';
import InputBox from '../Form/Input';
import { CanvasOption } from '../../hook/canvas';
import FlexItem from '@ant-design/react-native/lib/flex/FlexItem';
// create a component
interface ColorProp {
    modal: ReturnType<typeof useModal>,
    onSelect: (color: string) => void,
    option: CanvasOption,
}

const colorList = [
    'red', 'blue', 'black', 'white', 'pink', 'purple', 'yellow', 'orange',
    'green',
];

const BaseInfoBox: React.FC<ColorProp> = ({ option, modal, onSelect }) => {
    const active = option.activeObject;
    const [width, setWidth] = useState((active || {}).size?.width || 0);
    const [height, setHeight] = useState((active || {}).size?.height || 0);
    const [radiuSwich, setRadiuSwich] = useState((active || {}).round?.show || false);
    const [radiuValue, setRadiuValue] = useState((active || {}).round?.value || 0);

    // 是否可设置圆角
    const beAbleToSetRound = useMemo(() => {
        return ['rect'].includes(active?.type || '');
    }, [active]);

    useEffect(() => {
        if (modal.open) {
            setWidth((active || {}).size?.width || 0);
            setHeight((active || {}).size?.height || 0);
            setRadiuSwich((active || {}).round?.show || false);
            setRadiuValue((active || {}).round?.value || 0);
        }
    }, [modal.open, active]);

    const onFinish = useCallback(() => {
        option.setWidthAndHeight({ width, height });
        option.setRound({ show: radiuSwich, value: radiuValue });
        modal.onClose();
    }, [option, width, height, modal, radiuSwich, radiuValue]);

    return (
        <ModalBox
            modal={modal}
            visible={modal.open}
            onFinish={onFinish}
        >
            {/* 颜色 */}
            <View style={styles.titleBox}><Text style={styles.title}>颜色</Text></View>
            <View style={styles.colorBox}>
                {
                    colorList.map(color => (
                        <TouchableOpacity key={color} onPressIn={() => onSelect(color)}>
                            <LiquidGlassView
                                blurIntensity={30}
                                blurStyle="light"
                                overlayColor="rgba(134, 41, 41, 0.15)"
                                style={{ width: 100, height: 100, margin: 10 }}
                            >
                                <View style={{ backgroundColor: color, width: 100, height: 100 }} />
                            </LiquidGlassView>
                        </TouchableOpacity>
                    ))
                }
            </View>
            {/* 宽高 */}
            <Flex style={{ marginBottom: 15 }}>
                <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                    <View style={styles.titleBox}><Text style={styles.title}>宽</Text></View>
                    <View><InputBox value={`${width}`} placeholder="请输入宽度" onChangeInput={setWidth} /></View>
                </Flex.Item>
                <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                    <View style={styles.titleBox}><Text style={styles.title}>高</Text></View>
                    <View><InputBox value={`${height}`} placeholder="请输入高度" onChangeInput={setHeight} /></View>
                </Flex.Item>
          </Flex>
          {/* 圆角 */}
          {beAbleToSetRound && (
            <View style={[styles.titleBox, styles.round]} >
                <Flex align="center">
                    <View><Text style={styles.title}>圆角</Text></View>
                    <View style={{ marginLeft: 20 }}>
                        <Switch
                            checkedChildren="开启"
                            unCheckedChildren="关闭"
                            defaultChecked={radiuSwich}
                            checked={radiuSwich}
                            onChange={() => setRadiuSwich(!radiuSwich)}
                        />
                    </View>
                    {
                        radiuSwich && (
                            <FlexItem style={{ marginLeft: 20 }}>
                                <Stepper value={radiuValue} onChange={setRadiuValue} style={{ width: '50%' }} />
                            </FlexItem>
                        )
                    }
                </Flex>
            </View>
          )}
        </ModalBox>
    );
};

//make this component available to the app
export default BaseInfoBox;
