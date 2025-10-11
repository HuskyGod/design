//import liraries
import { Button, Flex, Modal, WingBlank } from '@ant-design/react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
    const [hexStr, setHexStr] = useState('');

    const onComplete: ColorPickerProps['onCompleteJS'] = ({ hex }) => {
        setHexStr(hex);
    };

    const onConfig = useCallback(() => {
        onFinish(hexStr);
        modal.onClose();
    }, [hexStr, onFinish, modal]);

    useEffect(() => {
        setHexStr(value!);
    }, [value]);

    return (
       <Modal
        title="颜色选择"
        transparent
        // modalType={'portal'}
        onClose={modal.onClose}
        maskClosable
        visible={modal.open}
        closable
    >
        <View>
            <View style={{ padding: 20 }}>
                <ColorPicker style={{ width: '100%' }} value={value} onCompleteJS={onComplete}>
                    <Panel3 />
                    <OpacitySlider style={{ marginTop: 20, borderRadius: 20 }} />
                </ColorPicker>
            </View>
            <Flex>
                <Flex.Item>
                    <Button onPressIn={modal.onClose}>取消</Button>
                </Flex.Item>
                <Flex.Item style={{ paddingLeft: 4 }}>
                    <Button onPressIn={onConfig} type="primary">确认</Button>
                </Flex.Item>
            </Flex>
        </View>
    </Modal>
    );
};

//make this component available to the app
export default ColorBox;
