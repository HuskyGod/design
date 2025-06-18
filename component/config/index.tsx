//import liraries
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import ColorBox from '../colorBox';
import { useModal } from '../../hook/modal';
import { CanvasOption } from '../../hook/canvas';

interface Props {
    option: CanvasOption
}

// create a component
const ConfigList: React.FC<Props> = ({ option }) => {
    const modal = useModal();

    const onSelect = (color: string) => {
        option.setColor(color);
        modal.onClose();
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal style={styles.scroll}>
                <TouchableOpacity style={styles.box} onPressOut={() => modal.onShow()}>
                    <View style={styles.icon} />
                    <Text style={styles.text}>111</Text>
                </TouchableOpacity>
            </ScrollView>
            <ColorBox onSelect={onSelect} modal={modal} />
        </View>
    );
};

//make this component available to the app
export default ConfigList;
