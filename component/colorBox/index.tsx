//import liraries
import React from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { useModal } from '../../hook/modal';
import { LiquidGlassView } from 'react-native-liquid-view';
// create a component
interface ColorProp {
    modal: ReturnType<typeof useModal>,
    onSelect: (color: string) => void
}

const colorList = [
    "red", "blue", "black", "white", "pink", "purple", "yellow", "orange",
    "green"
];

const ColorBox: React.FC<ColorProp> = ({ modal, onSelect }) => {
    return (
        <Modal
            visible={modal.open}
        >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 20, height: '100%' }}>
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
        </Modal>
    );
};

//make this component available to the app
export default ColorBox;
