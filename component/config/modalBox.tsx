//import liraries
import React from 'react';
import { View, Modal, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native';
import { modalStyle } from './style';

interface Prop {
    visible: boolean,
    onVisible: (value: boolean) => void
}

// create a component
const ModalBox: React.FC<Prop> = (prop) => {
    const { visible, onVisible} = prop;
    const width = Dimensions.get('window').width / 3;
    return (
        <Modal
            visible={visible}
        >
            <View style={modalStyle.container}>
                <View style={modalStyle.closeBox}>
                    <TouchableOpacity onPressOut={() => onVisible(false)}>
                        <Text style={modalStyle.closeText}>关闭</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={modalStyle.configListBox}>
                    <TouchableOpacity style={[{ width, height: width }, modalStyle.configItem]}></TouchableOpacity>
                </ScrollView>
            </View>
        </Modal>
    );
};

//make this component available to the app
export default ModalBox;
