//import liraries
import { Modal } from '@ant-design/react-native';
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useModal } from '../../hook/modal';
import ColorPicker, { ColorPickerProps, OpacitySlider, Panel1, Panel3 } from 'reanimated-color-picker';

interface Props {
    value?: string,
    modal: ReturnType<typeof useModal>,
    onFinish: (hex: string) => void,
}

// create a component
const ColorBox: React.FC<Props> = ({ modal, onFinish, value }) => {
    console.log(modal.open);
    const [hexStr, setHex] = useState('');

    const onComplete: ColorPickerProps['onComplete'] = (color) => {
        console.log('1111');
    };

    const footer = useMemo(() => [
            { text: '取消', onPress: modal.onClose },
            { text: '确认', onPress: () => onFinish(hexStr) },
    ], [hexStr, onFinish, modal]);

    console.log(hexStr);

    return (
       <Modal
        title="颜色选择"
        transparent
        // modalType={'portal'}
        onClose={modal.onClose}
        maskClosable
        visible={modal.open}
        closable
        footer={footer}
    >
        <View style={{ padding: 20 }}>
            <ColorPicker style={{ width: '100%' }} value={'red'} onComplete={onComplete}>
                <Panel1 />
                <OpacitySlider style={{ marginTop: 20, borderRadius: 20 }} />
            </ColorPicker>
        </View>
    </Modal>
    );
};

//make this component available to the app
export default ColorBox;
