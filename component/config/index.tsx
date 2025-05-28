//import liraries
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import ModalBox from './modalBox';
import { useState } from 'react';

// create a component
const ConfigList = () => {
    const [visible, setVisible] = useState(false);
    
    const onVisible = (value: boolean) => {
        setVisible(value);
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal style={styles.scroll}>
                <TouchableOpacity style={styles.box} onPressOut={() => onVisible(true)}>
                    <View style={styles.icon} />
                    <Text style={styles.text}>111</Text>
                </TouchableOpacity>
            </ScrollView>
            <ModalBox visible={visible} onVisible={onVisible} />
        </View>
    );
};

//make this component available to the app
export default ConfigList;
