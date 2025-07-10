//import liraries
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import BaseInfoBox from '../baseInfoBox';
import { useModal } from '../../hook/modal';
import { CanvasOption } from '../../hook/canvas';
import { Icon } from '@ant-design/react-native';

interface Props {
    option: CanvasOption,
}

// create a component
const ConfigList: React.FC<Props> = ({ option }) => {
    const modal = useModal();

    const onSelect = (color: string) => {
        option.setColor(color);
        modal.onClose();
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal style={styles.scroll}>
                <TouchableOpacity style={styles.box} onPressOut={() => modal.onShow()}>
                    <View style={styles.iconbox}>
                        <Icon style={styles.icon} name="bars" />
                    </View>
                    <Text style={styles.text}>基础配置</Text>
                </TouchableOpacity>
            </ScrollView>
            <BaseInfoBox option={option} onSelect={onSelect} modal={modal} />
        </View>
    );
};

//make this component available to the app
export default ConfigList;
