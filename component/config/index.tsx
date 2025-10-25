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
import RadiusBox from './component/radiusBox';
import ShadowBox from './component/shadowBox';

interface Props {
    option: CanvasOption,
}

// create a component
const ConfigList: React.FC<Props> = ({ option }) => {
    const baseModal = useModal();
    const shapeModal = useModal();
    const borderModal = useModal();
    const radiusModal = useModal();
    const shadowModal = useModal();

    const [showActiveConfig, onShow] = useState(false);

    const onSelect = (color: string) => {
        option.setColor(color);
        baseModal.onClose();
    };

    const onCreateShape = (type?: CanvasType['type'], info?: CanvasType['extraInfo']) => {
        option.addShapeElement(type!, info);
        shapeModal.onClose();
    };

    const onHide: (fn: () => void) => void = (fn) => {
        borderModal.onClose();
        shadowModal.onClose();
        radiusModal.onClose();
        return fn();
    };

    const onlyRect = [
        <TouchableOpacity key={'3'} style={styles.box} onPressOut={() => onHide(radiusModal.onTarget)}>
            <View style={styles.iconbox}>
                <Icon style={styles.icon} name="radius-setting" />
            </View>
            <Text style={styles.text}>圆角</Text>
        </TouchableOpacity>,
    ];

    const activeConfig = [
        <TouchableOpacity key={'1'} style={styles.box} onPressOut={() => baseModal.onShow()}>
            <View style={styles.iconbox}>
                <Icon style={styles.icon} name="bars" />
            </View>
            <Text style={styles.text}>基础配置</Text>
        </TouchableOpacity>,
        <TouchableOpacity key={'2'} style={styles.box} onPressOut={() => onHide(borderModal.onTarget)}>
            <View style={styles.iconbox}>
                <Icon style={styles.icon} name="border-outer" />
            </View>
            <Text style={styles.text}>边框</Text>
        </TouchableOpacity>,
        <TouchableOpacity key={'4'} style={styles.box} onPressOut={() => onHide(shadowModal.onTarget)}>
            <View style={styles.iconbox}>
                <Icon style={styles.icon} name="border-outer" />
            </View>
            <Text style={styles.text}>阴影</Text>
        </TouchableOpacity>,
    ];

    useEffect(() => {
        onShow(!!option.activeObject);
        if (!option.activeObject) {
            baseModal.onClose();
            borderModal.onClose();
            radiusModal.onClose();
            shadowModal.onClose();
        }
    }, [option.activeObject, baseModal, borderModal, radiusModal, shadowModal]);

    return (
        <View style={styles.container}>
            <BorderBox option={option} modal={borderModal} />
            <RadiusBox option={option} modal={radiusModal} />
            <ShadowBox option={option} modal={shadowModal} />
            <ScrollView horizontal style={styles.scroll}>
                <TouchableOpacity style={styles.box} onPressOut={() => shapeModal.onShow()}>
                    <View style={styles.iconbox}>
                        <Icon style={styles.icon} name="inbox" />
                    </View>
                    <Text style={styles.text}>图形</Text>
                </TouchableOpacity>
                {showActiveConfig ? (activeConfig) : null}
                {option.activeObject?.type === 'rect' && onlyRect}
            </ScrollView>
            <BaseInfoBox option={option} onSelect={onSelect} modal={baseModal} />
            <ShapeBox option={option} modal={shapeModal} onSelect={onCreateShape} />
        </View>
    );
};

//make this component available to the app
export default ConfigList;
