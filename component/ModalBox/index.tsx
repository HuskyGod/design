//import liraries
import { Flex, Text, Modal, ModalProps, View, Button } from '@ant-design/react-native';
import React, { useEffect, useState } from 'react';
import style from './styles';
import ButtomBox from '../Form/buttom';
import { useModal } from '../../hook/modal';
import { ScrollView } from 'react-native';
import FlexItem from '@ant-design/react-native/lib/flex/FlexItem';

interface MyModalProps extends ModalProps {
    modal: ReturnType<typeof useModal>,
}

// create a component
const MyComponent: React.FC<MyModalProps> = (props) => {
    const { children, modal } = props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(modal.open);
    }, [modal.open]);

    return (
        <Modal
            modalType="modal"
            transparent={false}
            animationType="slide-up"
            {...props}
            visible={show}
        >
            <Flex direction="column" style={style.container}>
                <ScrollView style={{ flex: 1 }}>
                    <View >
                        {/* <Flex justify="end" style={style.clone}><ButtomBox onClick={modal.onClose}>关闭</ButtomBox></Flex> */}
                        {children}
                    </View>
                </ScrollView>
                <View style={style.clone}>
                    <Flex>
                        <FlexItem>
                            <Button type="primary">确认</Button>
                        </FlexItem>
                        <FlexItem style={{ marginLeft: 20 }}>
                            <Button onPress={modal.onClose}>关闭</Button>
                        </FlexItem>
                    </Flex>
                </View>
            </Flex>
        </Modal>
    );
};

//make this component available to the app
export default MyComponent;
