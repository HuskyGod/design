import { CanvasOption } from '../../../../hook/canvas';
import { useModal } from '../../../../hook/modal';
import { Text, TouchableHighlight, View } from 'react-native';
import { Flex, Stepper, StepperProps } from '@ant-design/react-native';
import styles from './style';
import ColorBox from '../../../colorBox';
import { useState } from 'react';

interface BorderBoxProp {
    modal: ReturnType<typeof useModal>,
    option: CanvasOption,
}

const BorderBox: React.FC<BorderBoxProp> = ({ modal, option }) => {
  const colorModal = useModal();
  const onFinish = (hex: string) => {
    console.log('hex', hex);
    option.setBorder({ value: option.activeObject?.border?.value || 0, color: hex });
  };

  const onChange: StepperProps['onChange'] = (value: number) => {
    console.log(option.activeObject?.border?.color);
    option.setBorder({ value, color: option.activeObject?.border?.color! });
  };

  if (!modal.open) {return null;}

  return (
    <Flex style={styles.box} align="center">
      <View><Text style={styles.title}>宽</Text></View>
      <View><Stepper value={option.activeObject?.border?.value || 0} style={styles.input} onChange={onChange} /></View>
      <View><Text style={styles.title}>颜色</Text></View>
      <TouchableHighlight onPressIn={() => colorModal.onShow()} ><View style={[styles.colorBox, { backgroundColor: option.activeObject?.border?.color }]}  /></TouchableHighlight>
      <ColorBox modal={colorModal} onFinish={onFinish} value={option.activeObject?.border?.color} />
    </Flex>
  );
};

export default BorderBox;
