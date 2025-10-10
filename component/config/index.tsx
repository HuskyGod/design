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

interface Props {
    option: CanvasOption,
}

// create a component
const ConfigList: React.FC<Props> = ({ option }) => {
    const baseModal = useModal();
    const shapeModal = useModal();
    const borderModal = useModal();

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
        <TouchableOpacity key={'2'} style={styles.box} onPressOut={() => borderModal.onShow()}>
            <View style={styles.iconbox}>
                <Icon style={styles.icon} name="border-outer" />
            </View>
            <Text style={styles.text}>边框</Text>
        </TouchableOpacity>,
    ];

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
                {option.activeObject && (activeConfig)}
            </ScrollView>
            <BaseInfoBox option={option} onSelect={onSelect} modal={baseModal} />
            <ShapeBox option={option} modal={shapeModal} onSelect={onCreateShape} />
        </View>
    );
};

//make this component available to the app
export default ConfigList;
