//import liraries
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import { useModal } from '../../hook/modal';
import { CanvasOption, CanvasType } from '../../hook/canvas';
import { Icon } from '@ant-design/react-native';
import BaseInfoBox from './component/baseInfoBox';
import ShapeBox from './component/shapeBox';
import BorderBox from './component/borderBox';
import ColorBox from '../colorBox';
import { useEffect, useState } from 'react';

interface Props {
    option: CanvasOption,
}

// create a component
const ConfigList: React.FC<Props> = ({ option }) => {
    const baseModal = useModal();
    const shapeModal = useModal();
    const borderModal = useModal();
    const [showActiveConfig, onShow] = useState(false);

    const onSelect = (color: string) => {
        option.setColor(color);
        baseModal.onClose();
    };

    const onCreateShape = (type?: CanvasType['type']) => {
        option.addShapeElement(type!);
        shapeModal.onClose();
    };

    const activeConfig = [
        <TouchableOpacity key={'1'} style={styles.box} onPressOut={() => baseModal.onShow()}>
            <View style={styles.iconbox}>
                <Icon style={styles.icon} name="bars" />
            </View>
            <Text style={styles.text}>基础配置</Text>
        </TouchableOpacity>,
        <TouchableOpacity key={'2'} style={styles.box} onPressOut={() => borderModal.onTarget()}>
            <View style={styles.iconbox}>
                <Icon style={styles.icon} name="border-outer" />
            </View>
            <Text style={styles.text}>边框</Text>
        </TouchableOpacity>,
    ];

    console.log(option.activeObject);

    useEffect(() => {
        onShow(!!option.activeObject);
        if (!option.activeObject) {
            baseModal.onClose();
            borderModal.onClose();
        }
    }, [option.activeObject, baseModal, borderModal]);

    return (
        <View style={styles.container}>
            <BorderBox option={option} modal={borderModal} />
            <ScrollView horizontal style={styles.scroll}>
                <TouchableOpacity style={styles.box} onPressOut={() => shapeModal.onShow()}>
                    <View style={styles.iconbox}>
                        <Icon style={styles.icon} name="inbox" />
                    </View>
                    <Text style={styles.text}>图形</Text>
                </TouchableOpacity>
                {showActiveConfig ? (activeConfig) : null}
            </ScrollView>
            <BaseInfoBox option={option} onSelect={onSelect} modal={baseModal} />
            <ShapeBox option={option} modal={shapeModal} onSelect={onCreateShape} />
        </View>
    );
};

//make this component available to the app
export default ConfigList;
